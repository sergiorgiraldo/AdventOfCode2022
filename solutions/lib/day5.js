const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const [towers, commands] = parse(lines);

	commands.forEach((command) => {
		const { amount, from, to } = command;

		for (let i = 0; i < amount; i++) {
			towers[to - 1].unshift(towers[from - 1].shift());
		}
	});

	let result = towers.reduce((acc, tower) => acc + tower[0], "");

	return result;
}

function solveForSecondStar(lines) {
	const [towers, commands] = parse(lines);

	commands.forEach((command) => {
		const { amount, from, to } = command;
		let aux = [];
		
		for (let i = 0; i < amount; i++) {
			aux.push(towers[from - 1].shift());
		}
		for (let i = 0; i < amount; i++) {
			towers[to - 1].unshift(aux.pop());
		}
	});

	let result = towers.reduce((acc, tower) => acc + tower[0], "");

	return result;
}

function parse(lines) {
	let aux = [];
	let towers, commands;

	lines.forEach((line) => {
		if (line === "") {
			towers = buildTowers(aux);
			aux = [];
		} else {
			aux.push(line);
		}
	});
	commands = buildCommands(aux);

	return [towers, commands];
}

function buildTowers(aux) {
	let towers = [];
	const numberOfTowers = (aux[0].length + 1) / 4;
	for (i = 0; i < aux.length - 1; i += 1) {
		for (j = 0; j < numberOfTowers; j += 1) {
			if (aux[i][j * 4 + 1] !== " ") {
				towers[j] = towers[j] || [];
				towers[j].push(aux[i][j * 4 + 1]);
			}
		}
	}

	return towers;
}

function buildCommands(aux) {
	let commands = [];

	aux.forEach((a) => {
		let lineRegex = /move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/gm;
		const matches = lineRegex.exec(a);
		const command = {
			amount: matches.groups.amount,
			from: matches.groups.from,
			to: matches.groups.to
		};
		commands.push(command);
	});
	return commands;
}

module.exports = { solveForFirstStar, solveForSecondStar };
