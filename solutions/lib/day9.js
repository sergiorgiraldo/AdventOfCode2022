const helpers = require("./helpers");

function solveForFirstStar(lines) {
	return simulateRope(lines, 2);
}

function solveForSecondStar(lines) {
	return simulateRope(lines, 10);
}

function simulateRope(lines, knots) {
	const directions = {
		R: [1,  0],
		L: [-1, 0],
		U: [0, -1],
		D: [0,  1]
	};

	let rope = Array.from({ length: knots }, () => [0, 0]); //initial state, head and tail are at (0,0)

	let visited = new Set(); // [x,y], set already takes care of duplicates

	lines.map((line) => {
		let [direction, steps] = line.split(" ");

		while (steps--) {
			// advance head
			rope[0] = rope[0].map(
				(curr, coord) => curr + directions[direction][coord]
			);

			// advance ith point of rope based on (i-1)th point
			for (let i = 1; i < knots; i++) {
				// any x or y coordinate must not be more than 1 unit away
				if (rope[i - 1].some((curr, coord) => Math.abs(curr - rope[i][coord]) > 1)) {
					rope[i] = rope[i].map(
						(curr, coord) => curr + Math.sign(rope[i - 1][coord] - curr)
					);
				}
			}

			// mark tail, the last knot
			visited.add(rope[knots - 1].join(","));
		}
	});

	return visited.size;
}

module.exports = { solveForFirstStar, solveForSecondStar };
