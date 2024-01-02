
const lib = require('../solutions/lib/day14');

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("498,4 -> 498,6 -> 496,6");
	lines.push("503,4 -> 502,4 -> 502,9 -> 494,9");
	expect(lib.solveForFirstStar(lines)).toBe(24);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("498,4 -> 498,6 -> 496,6");
	lines.push("503,4 -> 502,4 -> 502,9 -> 494,9");
	expect(lib.solveForSecondStar(lines)).toBe(93);
});
