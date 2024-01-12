const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const notes = parseNotes(lines);
	helpers.dbg(notes.map.length);
	helpers.dbg(notes.map[0]);
	helpers.dbg(notes.map[1]);
	helpers.dbg(notes.moves);

	let direction = 0;
	let position = { x: notes.map[0].indexOf("."), y: 0 };
	helpers.dbg("start ", position.x, "-", position.y);
	while (notes.moves.length > 0) {
		let move = notes.moves.shift();

		if (move === "L") {
			direction = (direction + 3) % 4;
		} else if (move === "R") {
			direction = (direction + 1) % 4;
		} else {
			position = findNextPosition(notes.map, move, position, direction);
			helpers.dbg("next ", position.x, "-", position.y);
		}
	}
	helpers.dbg(position.x, "-", position.y, " ", direction);
	const password = (position.y + 1) * 1000 + (position.x + 1) * 4 + direction;

	return password;
}

function solveForSecondStar(lines, faceSize) {
	const notes = parseNotes(lines);

	let direction = 0;
	let position = { x: notes.map[0].indexOf("."), y: 0 };

	while (notes.moves.length > 0) {
		let move = notes.moves.shift();

		if (move === "L") {
			direction = (direction + 3) % 4;
		}
		else if (move === "R") {
			direction = (direction + 1) % 4;
		}
		else {
			let newState = findNextPositionInCube(notes.map, move, position, direction, faceSize);
			position = newState.position;
			direction = newState.direction;
		}
	}
	helpers.dbg(position.x, "-", position.y, " ", direction);
	const password = (position.y + 1) * 1000 + (position.x + 1) * 4 + direction;

	return password;
}

function parseNotes(lines) {
	let map = [];
	let instructions = "";

	lines.every((line, i) => {
		if (line === "") {
			instructions = lines[i + 1];
			return false;
		} else {
			map.push([]);
			map[map.length - 1] = line.split("");
			return true;
		}
	});

	let moves = [];

	const instructionRegex = /(\d+)([RL])/g;
	const lastInstructionRegex = /([RL])(\d+)$/;

	for (const instruction of instructions.matchAll(instructionRegex)) {
		moves.push(parseInt(instruction[1], 10));
		moves.push(instruction[2]);
	}

	const lastInstruction = instructions.match(lastInstructionRegex);

	moves.push(parseInt(lastInstruction[2], 10));

	const notes = { map, moves };

	return notes;
}

function findNextPosition(map, move, position, direction) {
	/* 
	directions
	0 -> 1 ↓ 2 <- 3 ↑
	*/
	const offsets = [
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		{ x: -1, y: 0 },
		{ x: 0, y: -1 }
	];

	for (let i = 0; i < move; i++) {
		const offset = offsets[direction];

		let nextPosition = {
			x: position.x + offset.x,
			y: position.y + offset.y
		};

		if (map[nextPosition.y]?.[nextPosition.x] === undefined ||
			map[nextPosition.y][nextPosition.x] === " ") {
			let wrapPos = findWrapPosition(map, position, direction);

			if (map[wrapPos.y][wrapPos.x] === "#") {
				return position;
			} 
			else {
				[nextPosition] = [wrapPos];
			}
		} 
		else if (map[nextPosition.y][nextPosition.x] === "#") {
			return position;
		}

		position.x = nextPosition.x;
		position.y = nextPosition.y;
	}

	return position;
}

function findWrapPosition(map, position, direction) {
	/* 
	directions
	0 -> 1 ↓ 2 <- 3 ↑
	*/
	const offsets = [
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		{ x: -1, y: 0 },
		{ x: 0, y: -1 }
	];
	const oppositeDirection = (direction + 2) % 4;
	const offset = offsets[oppositeDirection];

	let { x, y } = position;

	while (map[y]?.[x] !== undefined && map[y][x] !== " ") {
		x += offset.x;
		y += offset.y;
	}

	//I stop when out of bounds so revert one position
	x -= offset.x;
	y -= offset.y;

	return { x, y };
}

function findFacePosition(map, faceNumber, faceSize) {
	let faceCount = 0;

	for (let y = 0; y < map.length; y += faceSize) {
		for (let x = 0; x < map[y].length; x += faceSize) {
			if (map[y]?.[x] !== undefined && map[y][x] !== " ") faceCount++;
			if (faceCount === faceNumber) return { x, y };
		}
	}
}
function getFaceNumber(x, y, faceSize) {
	if (x >= faceSize && x < faceSize * 2 && y >= 0 && y < faceSize) return 1;
	if (x >= faceSize * 2 && x < faceSize * 3 && y >= 0 && y < faceSize * 2) return 2; 
	if (x >= faceSize && x < faceSize * 2 && y >= faceSize && y < faceSize * 2) return 3; 
	if (x >= 0 && x < faceSize && y >= faceSize * 2 && y < faceSize * 3) return 4; 
	if (x >= faceSize && x < faceSize * 2 && y >= faceSize * 2 && y < faceSize * 3) return 5; 
	if (x >= 0 && x < faceSize && y >= faceSize * 3 && y < faceSize * 4) return 6;
	return undefined;
}

/*
# PUZZLE INPUT DATA
#   Y               6>    6^
#   0            + - - + - - +
#                |     |     |
#              4>|  1  |  2  |5<
#                |     |     |
#   F            + - - + - - +
#                |     |  3<
#              4v|  3 >|2^
#             3> |     | 
#   2F     + - - + - - +
#          |     |     |
#        1>|  4  |  5  |2<
#          |     |     |
#   3F     + - - + - - +
#          |     |  6<
#        1v|  6  |5^
#          |     |
#   4F     + - - +
#             2v
#    X     0     F     2     3
#                      F     F
#
# 50-Cube ranges
# 1 [50,99],[0,49]
# 2 [100,149],[0,49]
# 3 [50,99],[0,49]
# 4 [0,49],[50,149]
# 5 [50,99],[50,149]
# 6 [0,49],[150,199]
*/
function findWrapPositionInCube(map, position, direction, faceSize) {
	/* 
	directions
	0 -> 1 ↓ 2 <- 3 ↑
	*/

	const wrapMap = new Map(); // face,direction
	wrapMap.set("1,0", "2,0");
	wrapMap.set("1,1", "3,1");
	wrapMap.set("1,2", "4,0");
	wrapMap.set("1,3", "6,0");
	
	wrapMap.set("2,0", "5,2");
	wrapMap.set("2,1", "3,2");
	wrapMap.set("2,2", "1,2");
	wrapMap.set("2,3", "6,3");
	
	wrapMap.set("3,0", "2,3");
	wrapMap.set("3,1", "5,1");
	wrapMap.set("3,2", "4,1");
	wrapMap.set("3,3", "1,3");
	
	wrapMap.set("4,0", "5,0");
	wrapMap.set("4,1", "6,1");
	wrapMap.set("4,2", "1,0");
	wrapMap.set("4,3", "3,0");
	
	wrapMap.set("5,0", "2,2");
	wrapMap.set("5,1", "6,2");
	wrapMap.set("5,2", "4,2");
	wrapMap.set("5,3", "3,3");
	
	wrapMap.set("6,0", "5,3");
	wrapMap.set("6,1", "2,1");
	wrapMap.set("6,2", "1,1");
	wrapMap.set("6,3", "4,3");	

	let faceNumber = getFaceNumber(position.x, position.y, faceSize);
	
	helpers.dbg("faceSize", faceSize, "face ", faceNumber, " ", position.x, "-", position.y, "-", direction);

	let [newFace, newDirection] = wrapMap.get(`${faceNumber},${direction}`).split(",").map(Number);
	let newPosition = findFacePosition(map, newFace, faceSize);
	let relativeX = position.x % faceSize;
	let relativeY = position.y % faceSize;

	if (direction === 0) {
		if (newDirection === 2) {
			newPosition.x += faceSize - 1;
			newPosition.y += faceSize - relativeY - 1;
		}
		if (newDirection === 3) {
			newPosition.y += faceSize - 1;
			newPosition.x += relativeY;
		}
	}

	if (direction === 1) {
		if (newDirection === 1) newPosition.x += relativeX;
		if (newDirection === 2) {
			newPosition.x += faceSize - 1;
			newPosition.y += relativeX;
		}
	}

	if (direction === 2) {
		if (newDirection === 0) newPosition.y += faceSize - relativeY - 1;
		if (newDirection === 1) newPosition.x += relativeY;
	}

	if (direction === 3) {
		if (newDirection === 0) newPosition.y += relativeX;
		if (newDirection === 3) {
			newPosition.x += relativeX;
			newPosition.y += faceSize - 1;
		}
	}
	return { newPosition, newDirection };
}

function findNextPositionInCube(map, move, position, direction, faceSize) {
	for (let i = 0; i < move; i++) {
		let nextPosition = { x: position.x, y: position.y };

		if (direction === 0) nextPosition.x++;
		else if (direction === 1) nextPosition.y++;
		else if (direction === 2) nextPosition.x--;
		else if (direction === 3) nextPosition.y--;
		
		if (map[nextPosition.y]?.[nextPosition.x] === undefined ||
			map[nextPosition.y][nextPosition.x] === " ") {
			let { newPosition, newDirection } = findWrapPositionInCube(map, position, direction, faceSize);

			if (map[newPosition.y][newPosition.x] === "#") return { position, direction };
			
			nextPosition.x = newPosition.x;
			nextPosition.y = newPosition.y;
			direction = newDirection;
		}

		if (map[nextPosition.y][nextPosition.x] === "#") {
			return { position, direction };
		}

		position.x = nextPosition.x;
		position.y = nextPosition.y;
	}
	return { position, direction };
}

module.exports = { solveForFirstStar, solveForSecondStar };
