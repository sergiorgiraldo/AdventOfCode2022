
const lib = require('../solutions/lib/day23');
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("....#..");
	lines.push("..###.#");
	lines.push("#...#.#");
	lines.push(".#...##");
	lines.push("#.###..");
	lines.push("##.#.##");
	lines.push(".#..#..");
	expect(lib.solveForFirstStar(lines)).toBe(110);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("....#..");
	lines.push("..###.#");
	lines.push("#...#.#");
	lines.push(".#...##");
	lines.push("#.###..");
	lines.push("##.#.##");
	lines.push(".#..#..");
	expect(lib.solveForSecondStar(lines)).toBe(20);
});
