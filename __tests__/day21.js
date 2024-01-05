const lib = require("../solutions/lib/day21");
const helpers = require("../solutions/lib/helpers.js");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("root: pppw + sjmn");
	lines.push("dbpl: 5");
	lines.push("cczh: sllz + lgvd");
	lines.push("zczc: 2");
	lines.push("ptdq: humn - dvpt");
	lines.push("dvpt: 3");
	lines.push("lfqf: 4");
	lines.push("humn: 5");
	lines.push("ljgn: 2");
	lines.push("sjmn: drzm * dbpl");
	lines.push("sllz: 4");
	lines.push("pppw: cczh / lfqf");
	lines.push("lgvd: ljgn * ptdq");
	lines.push("drzm: hmdt - zczc");
	lines.push("hmdt: 32");
	expect(lib.solveForFirstStar(lines)).toBe(152);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines = [];
	lines.push("root: pppw + sjmn");
	lines.push("dbpl: 5");
	lines.push("cczh: sllz + lgvd");
	lines.push("zczc: 2");
	lines.push("ptdq: humn - dvpt");
	lines.push("dvpt: 3");
	lines.push("lfqf: 4");
	lines.push("humn: 5");
	lines.push("ljgn: 2");
	lines.push("sjmn: drzm * dbpl");
	lines.push("sllz: 4");
	lines.push("pppw: cczh / lfqf");
	lines.push("lgvd: ljgn * ptdq");
	lines.push("drzm: hmdt - zczc");
	lines.push("hmdt: 32");
	expect(lib.solveForSecondStar(lines)).toBe(301);
});
