const lib = require("../solutions/lib/day5");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("    [D]    ");
	lines.push("[N] [C]    ");
	lines.push("[Z] [M] [P]");
	lines.push(" 1   2   3 ");
	lines.push("");
	lines.push("move 1 from 2 to 1");
	lines.push("move 3 from 1 to 3");
	lines.push("move 2 from 2 to 1");
	lines.push("move 1 from 1 to 2");
	expect(lib.solveForFirstStar(lines)).toBe("CMZ");
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("    [D]    ");
	lines.push("[N] [C]    ");
	lines.push("[Z] [M] [P]");
	lines.push(" 1   2   3 ");
	lines.push("");
	lines.push("move 1 from 2 to 1");
	lines.push("move 3 from 1 to 3");
	lines.push("move 2 from 2 to 1");
	lines.push("move 1 from 1 to 2");
	expect(lib.solveForSecondStar(lines)).toBe("MCD");
});
