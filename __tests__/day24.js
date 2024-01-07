const lib = require("../solutions/lib/day24");
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("#.######");
	lines.push("#>>.<^<#");
	lines.push("#.<..<<#");
	lines.push("#>v.><>#");
	lines.push("#<^v^^>#");
	lines.push("######.#");
	expect(lib.solveForFirstStar(lines)).toBe(18);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("#.######");
	lines.push("#>>.<^<#");
	lines.push("#.<..<<#");
	lines.push("#>v.><>#");
	lines.push("#<^v^^>#");
	lines.push("######.#");
	expect(lib.solveForSecondStar(lines)).toBe(54);
});
