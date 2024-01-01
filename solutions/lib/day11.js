const helpers = require("./helpers");

function solveForFirstStar(lines) {
	return doMonkeyBusiness(lines, 20, true);
}

function solveForSecondStar(lines) {
	return doMonkeyBusiness(lines, 10_000, false);
}

function doMonkeyBusiness(lines, rounds, relief){
	const monkeySpecs = generateMonkeySpecs(lines);

	const monkeySpecsAfterRounds = playRounds(monkeySpecs, rounds, relief);

	monkeySpecsAfterRounds.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
		
	const levelOfMonkeyBusiness = monkeySpecsAfterRounds[0].itemsInspected * monkeySpecsAfterRounds[1].itemsInspected;

	return levelOfMonkeyBusiness;
}

function generateMonkeySpecs(lines) {
	let monkeySpecs = [];

	for (let monkeyIndex = 0; monkeyIndex < lines.length; monkeyIndex += 7) {
		monkeySpecs.push({
			number: monkeySpecs.length,

			itemLevels: /: (.*)$/
				.exec(lines[monkeyIndex + 1])[1]
				.split(", ")
				.map(Number),

			operation: /= (.*)$/
				.exec(lines[monkeyIndex + 2])[1],

			test: {
				isDivisibleBy: parseInt(
					/\d+/.exec(lines[monkeyIndex + 3])[0],
					10
				),
				isTrueMonkey: parseInt(
					/\d+/.exec(lines[monkeyIndex + 4])[0],
					10
				),
				isFalseMonkey: parseInt(
					/\d+/.exec(lines[monkeyIndex + 5])[0],
					10
				)
			},
			itemsInspected: 0
		});
	}

	return monkeySpecs;
}

function playRounds(monkeySpecs, rounds, applyRelief) {
	for (let round = 0; round < rounds; ++round) {
	  monkeySpecs.forEach((spec) => {
		spec = inspectItems(spec, monkeySpecs, applyRelief);
		monkeySpecs = moveItemsAmongMonkeys(spec, monkeySpecs);
	  });
	}
  
	return monkeySpecs;
  }
 

function inspectItems(spec, monkeySpecs, applyRelief) {
	const lcm = helpers.math.leastCommonMultiple(monkeySpecs.map((monkey) => monkey.test.isDivisibleBy));

	spec.itemsInspected += spec.itemLevels.length;

	spec.itemLevels = spec.itemLevels.map(
		(itemLevel) => {
			let newItemLevel = evaluateMonkeyOperation(spec.operation, itemLevel);
			return applyRelief
				? reliefitemLevel(newItemLevel)
				: newItemLevel % lcm;
		}
	);

	return spec;
}

function reliefitemLevel(itemLevelWorryLevel) {
	return Math.floor(itemLevelWorryLevel / 3);
}

function moveItemsAmongMonkeys(spec, monkeySpecs) {
	spec.itemLevels.forEach((itemLevel) => {
		if (itemLevel % spec.test.isDivisibleBy === 0) {
			monkeySpecs[spec.test.isTrueMonkey].itemLevels.push(itemLevel);
		} else {
			monkeySpecs[spec.test.isFalseMonkey].itemLevels.push(itemLevel);
		}
	});

	//after moves, current monkey does not have any itemLevels
	monkeySpecs[spec.number].itemLevels = [];

	return monkeySpecs;
}

function evaluateMonkeyOperation(operation, itemLevel) {
	return eval(operation.replace(/old/g, itemLevel));
}

module.exports = { solveForFirstStar, solveForSecondStar };
