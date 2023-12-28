const lib = require("../solutions/lib/day3");

test("SolveFirstStar", () => {
	let lines = [];

	lines.push("vJrwpWtwJgWrhcsFMMfFFhFp");
	lines.push("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL");
	lines.push("PmmdzqPrVvPwwTWBwg");
	lines.push("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn");
	lines.push("ttgJtRGJQctTZtZT");
	lines.push("CrZsJsPPZsGzwwsLwLmpwMDw");

	expect(lib.solveForFirstStar(lines)).toBe(157);
});

test("SolveSecondStar", () => {
	let lines = [];

	lines.push("vJrwpWtwJgWrhcsFMMfFFhFp");
	lines.push("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL");
	lines.push("PmmdzqPrVvPwwTWBwg");
	lines.push("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn");
	lines.push("ttgJtRGJQctTZtZT");
	lines.push("CrZsJsPPZsGzwwsLwLmpwMDw");
	
	expect(lib.solveForSecondStar(lines)).toBe(70);
});
