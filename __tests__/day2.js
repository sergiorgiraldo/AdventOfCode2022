
const lib = require('../solutions/lib/day2');

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("A Y");
	lines.push("B X");
	lines.push("C Z");
	expect(lib.solveForFirstStar(lines)).toBe(15);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("A Y");
	lines.push("B X");
	lines.push("C Z");
	expect(lib.solveForSecondStar(lines)).toBe(12);
});
