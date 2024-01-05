
const lib = require('../solutions/lib/day20');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("1");
	lines.push("2");
	lines.push("-3");
	lines.push("3");
	lines.push("-2");
	lines.push("0");
	lines.push("4");
	expect(lib.solveForFirstStar(lines)).toBe(3);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("1");
	lines.push("2");
	lines.push("-3");
	lines.push("3");
	lines.push("-2");
	lines.push("0");
	lines.push("4");
	expect(lib.solveForSecondStar(lines)).toBe(1_623_178_306);
});
