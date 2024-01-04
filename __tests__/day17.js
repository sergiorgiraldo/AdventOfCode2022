
const lib = require('../solutions/lib/day17');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	let lines = [];
	lines.push(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>");
	expect(lib.solveForFirstStar(lines)).toBe(3_068);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	let lines = [];
	lines.push(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>");
	expect(lib.solveForSecondStar(lines)).toBe(1514285714288);
});
