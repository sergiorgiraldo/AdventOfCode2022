const lib = require("../solutions/lib/day16");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("Valve AA has flow rate=0; tunnels lead to valves DD, II, BB");
	lines.push("Valve BB has flow rate=13; tunnels lead to valves CC, AA");
	lines.push("Valve CC has flow rate=2; tunnels lead to valves DD, BB");
	lines.push("Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE");
	lines.push("Valve EE has flow rate=3; tunnels lead to valves FF, DD");
	lines.push("Valve FF has flow rate=0; tunnels lead to valves EE, GG");
	lines.push("Valve GG has flow rate=0; tunnels lead to valves FF, HH");
	lines.push("Valve HH has flow rate=22; tunnel leads to valve GG");
	lines.push("Valve II has flow rate=0; tunnels lead to valves AA, JJ");
	lines.push("Valve JJ has flow rate=21; tunnel leads to valve II");
	expect(lib.solveForFirstStar(lines)).toBe(1_651);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("Valve AA has flow rate=0; tunnels lead to valves DD, II, BB");
	lines.push("Valve BB has flow rate=13; tunnels lead to valves CC, AA");
	lines.push("Valve CC has flow rate=2; tunnels lead to valves DD, BB");
	lines.push("Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE");
	lines.push("Valve EE has flow rate=3; tunnels lead to valves FF, DD");
	lines.push("Valve FF has flow rate=0; tunnels lead to valves EE, GG");
	lines.push("Valve GG has flow rate=0; tunnels lead to valves FF, HH");
	lines.push("Valve HH has flow rate=22; tunnel leads to valve GG");
	lines.push("Valve II has flow rate=0; tunnels lead to valves AA, JJ");
	lines.push("Valve JJ has flow rate=21; tunnel leads to valve II");
	expect(lib.solveForSecondStar(lines)).toBe(1_707);
});
