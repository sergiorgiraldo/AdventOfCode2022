
const lib = require('../solutions/lib/day2');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	let lines = [];
	lines.push("A Y");
	lines.push("B X");
	lines.push("C Z");
	expect(lib.solveForFirstStar(lines)).toBe(15);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	let lines = [];
	lines.push("A Y");
	lines.push("B X");
	lines.push("C Z");
	expect(lib.solveForSecondStar(lines)).toBe(12);
});
