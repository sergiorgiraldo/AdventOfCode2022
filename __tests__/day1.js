const lib = require("../solutions/lib/day1");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("1000");
	lines.push("2000");
	lines.push("3000");
	lines.push("");
	lines.push("4000");
	lines.push("");
	lines.push("5000");
	lines.push("6000");
	lines.push("");
	lines.push("7000");
	lines.push("8000");
	lines.push("9000");
	lines.push("");
	lines.push("10000");
	expect(lib.solveForFirstStar(lines)).toBe(24_000);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("1000");
	lines.push("2000");
	lines.push("3000");
	lines.push("");
	lines.push("4000");
	lines.push("");
	lines.push("5000");
	lines.push("6000");
	lines.push("");
	lines.push("7000");
	lines.push("8000");
	lines.push("9000");
	lines.push("");
	lines.push("10000");
	expect(lib.solveForSecondStar(lines)).toBe(45_000);
});
