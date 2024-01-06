const lib = require("../solutions/lib/day22");
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("        ...# ");
	lines.push("        .#.. ");
	lines.push("        #... ");
	lines.push("        .... ");
	lines.push("...#.......# ");
	lines.push("........#... ");
	lines.push("..#....#.... ");
	lines.push("..........#. ");
	lines.push("        ...#....");
	lines.push("        .....#..");
	lines.push("        .#......");
	lines.push("        ......#.");
	lines.push("");
	lines.push("10R5L5R10L4R5L5");
	expect(lib.solveForFirstStar(lines)).toBe(6_032);
});
