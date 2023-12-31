
const lib = require('../solutions/lib/day6');

test("SolveFirstStar-1", () => {
	let lines = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

	expect(lib.solveForFirstStar(lines)).toBe(7);
});

test("SolveFirstStar-2", () => {
	let lines = "bvwbjplbgvbhsrlpgdmjqwftvncz";

	expect(lib.solveForFirstStar(lines)).toBe(5);
});

test("SolveFirstStar-3", () => {
	let lines = "nppdvjthqldpwncqszvftbrmjlhg";

	expect(lib.solveForFirstStar(lines)).toBe(6);
});

test("SolveFirstStar-4", () => {
	let lines = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

	expect(lib.solveForFirstStar(lines)).toBe(10);
});

test("SolveFirstStar-5", () => {
	let lines = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

	expect(lib.solveForFirstStar(lines)).toBe(11);
});


test("SolveSecondStar-1", () => {
	let lines = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

	expect(lib.solveForSecondStar(lines)).toBe(19);
});

test("SolveSecondStar-2", () => {
	let lines = "bvwbjplbgvbhsrlpgdmjqwftvncz";

	expect(lib.solveForSecondStar(lines)).toBe(23);
});

test("SolveSecondStar-3", () => {
	let lines = "nppdvjthqldpwncqszvftbrmjlhg";

	expect(lib.solveForSecondStar(lines)).toBe(23);
});

test("SolveSecondStar-4", () => {
	let lines = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

	expect(lib.solveForSecondStar(lines)).toBe(29);
});

test("SolveSecondStar-5", () => {
	let lines = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

	expect(lib.solveForSecondStar(lines)).toBe(26);
});
