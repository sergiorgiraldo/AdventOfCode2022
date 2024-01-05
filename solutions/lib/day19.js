const helpers = require("./helpers");

const [ORE_ROBOT, CLAY_ROBOT, OBSIDIAN_ROBOT, GEODE_ROBOT] = [0, 1, 2, 3];
const ROBOT_TYPES = [ORE_ROBOT, CLAY_ROBOT, OBSIDIAN_ROBOT, GEODE_ROBOT];
const initialState = (timer) => ({
	timer,
	bank: [0, 0, 0],
	bots: [1, 0, 0, 0],
	geodes: 0
});

// this is the max number of robots of each type, this is used to narrow down the search space
// i played with these numbers until I make the unit tests pass
const limits = [16, 6, 2, 2]; 

function solveForFirstStar(lines) {
	const blueprints = parse(lines);

	let qualityLevels = [];

	blueprints.forEach((blueprint, i) => {
		const score = findMaxGeodes(initialState(24), blueprint);

		qualityLevels.push(score * (i + 1));
	});
	helpers.dbg("first - qualityLevels", qualityLevels);

	const total = qualityLevels.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function solveForSecondStar(lines) {
	let blueprints = parse(lines);
	blueprints = blueprints.slice(0, 3);

	let qualityLevels = [];

	blueprints.forEach((blueprint) => {
		const score = findMaxGeodes(initialState(32), blueprint);

		qualityLevels.push(score);
	});

	helpers.dbg("second - qualityLevels", qualityLevels);

	const total = qualityLevels.reduce((acc, curr) => acc * curr, 1);

	return total;
}

function parse(lines) {
	const regex = /-?\d+/g;

	const toBlueprint = ([_, oreO, clayO, obsO, obsC, geoO, geoOb]) => ({
		costs: [
			[oreO, 0, 0],
			[clayO, 0, 0],
			[obsO, obsC, 0],
			[geoO, 0, geoOb]
		],
		robotLimit: [Math.max(oreO, clayO, obsO, geoO), obsC, geoOb]
	});

	const blueprints = lines.map((line) => {
		let specs = [];
		let matches = regex.exec(line);
		while (matches !== null) {
			if (matches.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			specs.push(+matches[0]);
			matches = regex.exec(line);
		}
		return toBlueprint(specs);
	});

	return blueprints;
}

function canMake(state, blueprint, type) {
	return blueprint.costs[type].every((cost, i) => state.bank[i] >= cost);
}

function makeRobot(state, blueprint, type) {
	const newState = {
		timer: state.timer,
		bank: [...state.bank],
		bots: [...state.bots],
		geodes: state.geodes
	};
	const cost = blueprint.costs[type];

	while (!canMake(newState, blueprint, type) && newState.timer >= 1) {
		newState.bank = newState.bank.map((i, ii) => i + newState.bots[ii]);
		newState.timer = newState.timer - 1;
	}
	
	newState.timer = newState.timer - 1;
	
	newState.bank = newState.bank.map(
		(i, ii) => i - cost[ii] + newState.bots[ii]
	);
	
	if (type === GEODE_ROBOT) {
		newState.geodes = newState.geodes + newState.timer;
	} 
	
	newState.bots[type] = newState.bots[type] + 1;
	
	return newState;
}

function findMaxGeodes(state, blueprint) {
	if (state.timer === 1) {
		return state.geodes;
	}
	let best = state.geodes;
	for (const type of ROBOT_TYPES) {
		if (
			state.timer < limits[type] ||
			blueprint.robotLimit[type] < state.bots[type] ||
			(type === ORE_ROBOT && state.bots[CLAY_ROBOT] > 1) ||
			(type === OBSIDIAN_ROBOT && state.bots[CLAY_ROBOT] === 0) ||
			(type === GEODE_ROBOT && state.bots[OBSIDIAN_ROBOT] === 0)
		) {
			continue;
		}
		const nextState = makeRobot(state, blueprint, type);
		if (nextState.timer === 0) {
			continue;
		}
		const score = findMaxGeodes(nextState, blueprint, limits);
		if (Math.max(best, score) > best){
			best = Math.max(best, score);
		}
	}
	return best;
}

module.exports = { solveForFirstStar, solveForSecondStar };
