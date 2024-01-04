
const lib = require('../solutions/lib/day18');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("2,2,2");
	lines.push("1,2,2");
	lines.push("3,2,2");
	lines.push("2,1,2");
	lines.push("2,3,2");
	lines.push("2,2,1");
	lines.push("2,2,3");
	lines.push("2,2,4");
	lines.push("2,2,6");
	lines.push("1,2,5");
	lines.push("3,2,5");
	lines.push("2,1,5");
	lines.push("2,3,5");
	expect(lib.solveForFirstStar(lines)).toBe(64);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("2,2,2");
	lines.push("1,2,2");
	lines.push("3,2,2");
	lines.push("2,1,2");
	lines.push("2,3,2");
	lines.push("2,2,1");
	lines.push("2,2,3");
	lines.push("2,2,4");
	lines.push("2,2,6");
	lines.push("1,2,5");
	lines.push("3,2,5");
	lines.push("2,1,5");
	lines.push("2,3,5");
	expect(lib.solveForSecondStar(lines)).toBe(58);
});
