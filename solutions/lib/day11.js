const helpers = require("./helpers");

function solveForFirstStar(lines) {
	return doMonkeyBusiness(lines, 20, true);
}

function solveForSecondStar(lines) {
	return doMonkeyBusiness(lines, 10_000, false);
}

function doMonkeyBusiness(lines, rounds, relief){
	const monkeySpecs = generateMonkeySpecs(lines);

	const monkeysSpecsAfterRounds = playRounds(monkeySpecs, rounds, relief);

	monkeysSpecsAfterRounds.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
		
	const levelOfMonkeyBusiness = monkeysSpecsAfterRounds[0].itemsInspected * monkeysSpecsAfterRounds[1].itemsInspected;

	return levelOfMonkeyBusiness;
}

function generateMonkeySpecs(lines) {
	let monkeySpecs = [];

	for (let monkeyIndex = 0; monkeyIndex < lines.length; monkeyIndex += 7) {
		monkeySpecs.push({
			number: monkeySpecs.length,

			itemWorryLevelList: /: (.*)$/
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

function playRounds(monkeySpecs, rounds, applyRelief = true) {
	for (let round = 0; round < rounds; ++round) {
	  monkeySpecs.forEach((spec) => {
		spec = inspectItems(spec, monkeySpecs, applyRelief);
		monkeySpecs = moveItemsAmongMonkeys(spec, monkeySpecs);
	  });
	}
  
	return monkeySpecs;
  }
 

function inspectItems(spec, monkeySpecs, applyRelief) {
	let allDivisorsModulo = monkeySpecs
		.map((monkey) => monkey.test.isDivisibleBy)
		.reduce((modulo, divisor) => modulo * divisor, 1);

	spec.itemsInspected += spec.itemWorryLevelList.length;

	spec.itemWorryLevelList = spec.itemWorryLevelList.map(
		(itemWorryLevel) => {
			let newItemWorryLevel = evaluateMonkeyOperation(spec.operation, itemWorryLevel);
			return applyRelief
				? reliefItem(newItemWorryLevel)
				: newItemWorryLevel % allDivisorsModulo;
		}
	);

	return spec;
}

function reliefItem(itemWorryLevel) {
	return Math.floor(itemWorryLevel / 3);
}

function moveItemsAmongMonkeys(spec, monkeySpecs) {
	spec.itemWorryLevelList.forEach((itemWorryLevel) => {
		if (itemWorryLevel % spec.test.isDivisibleBy === 0) {
			monkeySpecs[spec.test.isTrueMonkey].itemWorryLevelList.push(itemWorryLevel);
		} else {
			monkeySpecs[spec.test.isFalseMonkey].itemWorryLevelList.push(itemWorryLevel);
		}
	});

	//after moves, current monkey does not have any items
	monkeySpecs[spec.number].itemWorryLevelList = [];

	return monkeySpecs;
}

function evaluateMonkeyOperation(operation, itemWorryLevel) {
	return eval(operation.replace(/old/g, itemWorryLevel));
}

module.exports = { solveForFirstStar, solveForSecondStar };
