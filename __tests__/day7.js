
const lib = require('../solutions/lib/day7');

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("$ cd /");
	lines.push("$ ls");
	lines.push("dir a");
	lines.push("14848514 b.txt");
	lines.push("8504156 c.dat");
	lines.push("dir d");
	lines.push("$ cd a");
	lines.push("$ ls");
	lines.push("dir e");
	lines.push("29116 f");
	lines.push("2557 g");
	lines.push("62596 h.lst");
	lines.push("$ cd e");
	lines.push("$ ls");
	lines.push("584 i");
	lines.push("$ cd ..");
	lines.push("$ cd ..");
	lines.push("$ cd d");
	lines.push("$ ls");
	lines.push("4060174 j");
	lines.push("8033020 d.log");
	lines.push("5626152 d.ext");
	lines.push("7214296 k");
	expect(lib.solveForFirstStar(lines)).toBe(95_437);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("$ cd /");
	lines.push("$ ls");
	lines.push("dir a");
	lines.push("14848514 b.txt");
	lines.push("8504156 c.dat");
	lines.push("dir d");
	lines.push("$ cd a");
	lines.push("$ ls");
	lines.push("dir e");
	lines.push("29116 f");
	lines.push("2557 g");
	lines.push("62596 h.lst");
	lines.push("$ cd e");
	lines.push("$ ls");
	lines.push("584 i");
	lines.push("$ cd ..");
	lines.push("$ cd ..");
	lines.push("$ cd d");
	lines.push("$ ls");
	lines.push("4060174 j");
	lines.push("8033020 d.log");
	lines.push("5626152 d.ext");
	lines.push("7214296 k");
	expect(lib.solveForSecondStar(lines)).toBe(24_933_642);
});
