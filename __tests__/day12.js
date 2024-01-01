const lib = require("../solutions/lib/day12");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("Sabqponm");
	lines.push("abcryxxl");
	lines.push("accszExk");
	lines.push("acctuvwj");
	lines.push("abdefghi");
	expect(lib.solveForFirstStar(lines)).toBe(31);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("Sabqponm");
	lines.push("abcryxxl");
	lines.push("accszExk");
	lines.push("acctuvwj");
	lines.push("abdefghi");
	expect(lib.solveForSecondStar(lines)).toBe(29);
});
