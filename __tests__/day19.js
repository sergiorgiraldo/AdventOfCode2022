const lib = require("../solutions/lib/day19");
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.");
	lines.push("Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.");
	expect(lib.solveForFirstStar(lines)).toBe(33);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.");
	lines.push("Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.");

	expect(lib.solveForSecondStar(lines)).toBe(3_472);
});
