
const lib = require('../solutions/lib/day9');

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("R 4");
	lines.push("U 4");
	lines.push("L 3");
	lines.push("D 1");
	lines.push("R 4");
	lines.push("D 1");
	lines.push("L 5");
	lines.push("R 2");
	expect(lib.solveForFirstStar(lines)).toBe(13);
});

test("SolveSecondStar-1", () => {
	let lines = [];
	lines.push("R 4");
	lines.push("U 4");
	lines.push("L 3");
	lines.push("D 1");
	lines.push("R 4");
	lines.push("D 1");
	lines.push("L 5");
	lines.push("R 2");
	expect(lib.solveForSecondStar(lines)).toBe(1);
});

test("SolveSecondStar-2", () => {
	let lines = [];
	lines.push("R 5");
	lines.push("U 8");
	lines.push("L 8");
	lines.push("D 3");
	lines.push("R 17");
	lines.push("D 10");
	lines.push("L 25");
	lines.push("U 20");
	expect(lib.solveForSecondStar(lines)).toBe(36);
});
