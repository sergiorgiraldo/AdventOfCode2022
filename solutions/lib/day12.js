const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const map = getMap(lines);

	let [start, end] = getStartAndEnd(map);

	const path = traverseGrid(map, start, end);

	return path;
}

function solveForSecondStar(lines) {
	const map = getMap(lines);

	let starts = ["0,0"];
	let end = "0,0";

	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			const current = map[i][j];
			if (current === "S" || current === "a") {
				starts.push([i, j].join(","));
				map[i][j] = "a";
			} 
			else if (current === "E") {
				end = [i, j].join(",");
				map[i][j] = "z";
			}
		}
	}

	const paths = starts
		.map((start) => {
			return traverseGrid(map, start, end);
		})
		.filter((e) => e !== undefined);	

	return Math.min(...paths);
}

function getMap(lines) {
	return lines.map((line) => line.split(""));
}

function getStartAndEnd(map) {
	let start, end;
	
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			const current = map[i][j];

			if (current === "S") {
				start = [i, j].join(",");
				map[i][j] = "a";
			} 
			else if (current === "E") {
				end = [i, j].join(",");
				map[i][j] = "z";
			}
		}
	}
	return [start, end];
}

function traverseGrid(map, start, end) {
	const visited = new Set();
	const queue = [[start, 0]];

	while (queue.length > 0) {
		const current = queue.shift();
		
		const position = current[0].split(",").map(Number);

		const possibleMoves = getPossibleMoves(map, ...position).map((move) => move.join(","));

		for (const move of possibleMoves) {
			if (move === end) {
				return current[1] + 1;
			}

			if (!visited.has(move)) {
				visited.add(move);
				queue.push([move, current[1] + 1]);
			}
		}
	}
}

function getPossibleMoves(map, row, col) {
	const directions = [
		[row - 1, col], // top
		[row, col + 1], // right
		[row + 1, col], // down
		[row, col - 1] // left
	];

	const neighbours = directions.filter((coords) => {
		return (
			(coords[0] >= 0 || coords[1] >= 0) && map?.[coords[0]]?.[coords[1]] && //out-of-bounds check
			(map[coords[0]][coords[1]].charCodeAt(0) - map[row][col].charCodeAt(0) <= 1) //can only move 1 or 0 height
		);
	});

	return neighbours;
}

module.exports = { solveForFirstStar, solveForSecondStar };
