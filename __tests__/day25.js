
const lib = require('../solutions/lib/day25');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("1=-0-2");
	lines.push("12111");
	lines.push("2=0=");
	lines.push("21");
	lines.push("2=01");
	lines.push("111");
	lines.push("20012");
	lines.push("112");
	lines.push("1=-1=");
	lines.push("1-12");
	lines.push("12");
	lines.push("1=");
	lines.push("122");
	expect(lib.solveForFirstStar(lines)).toBe("2=-1=0");
});