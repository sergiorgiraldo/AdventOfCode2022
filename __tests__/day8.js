const lib = require("../solutions/lib/day8");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("30373");
	lines.push("25512");
	lines.push("65332");
	lines.push("33549");
	lines.push("35390");
	expect(lib.solveForFirstStar(lines)).toBe(21);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("30373");
	lines.push("25512");
	lines.push("65332");
	lines.push("33549");
	lines.push("35390");
	expect(lib.solveForSecondStar(lines)).toBe(8);
});
