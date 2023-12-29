const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const total = checkIntervals(lines, checkIfIntervalIsContained);

	return total;
}

function solveForSecondStar(lines) {
	const total = checkIntervals(lines, checkIfIntervalOverlap);

	return total;
}

function checkIntervals(lines, fun) {
	const pairs = buildPairs(lines);

	let totalConsumingIntervals = 0;

	for (const intervals of pairs) {
		let interval1 = intervals[0].split("-").map(Number);
		let interval2 = intervals[1].split("-").map(Number);

		if (interval1[0] > interval2[0]) {
			[interval1, interval2] = [interval2, interval1];
		}

		let result = false;
		result = fun(interval1, interval2);

		if (result) {
			totalConsumingIntervals += 1;
		}
	}
	return totalConsumingIntervals;
}

function buildPairs(lines) {
	return lines.map((line) => line.split(","));
}

function checkIfIntervalIsContained(firstInterval, secondInterval) {
	// True      |  True        | True      | False       |   False
	// --------- |  ---------   | --------- | ---------   | ---------
	// ----      |  ----------- |     ---   |     ------- |            -------

	if (firstInterval[0] == secondInterval[0]) {
		return true;
	} 
	else {
		return firstInterval[1] >= secondInterval[1];
	}
}

function checkIfIntervalOverlap(firstInterval, secondInterval) {
	// True      |  True        | True      | True        |   False
	// --------- |  ---------   | --------- | ---------   | ---------
	// ----      |  ----------- |     ---   |     ------- |            -------

	return firstInterval[1] >= secondInterval[0];
}

module.exports = { solveForFirstStar, solveForSecondStar };
