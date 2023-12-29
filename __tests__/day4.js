
const lib = require('../solutions/lib/day4');

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("2-4,6-8");
	lines.push("2-3,4-5");
	lines.push("5-7,7-9");
	lines.push("2-8,3-7");
	lines.push("6-6,4-6");
	lines.push("2-6,4-8");
	expect(lib.solveForFirstStar(lines)).toBe(2);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("2-4,6-8");
	lines.push("2-3,4-5");
	lines.push("5-7,7-9");
	lines.push("2-8,3-7");
	lines.push("6-6,4-6");
	lines.push("2-6,4-8");
	expect(lib.solveForSecondStar(lines)).toBe(4);
});
