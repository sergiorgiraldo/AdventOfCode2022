const helpers = require("./helpers");

function solveForFirstStar(lines) {
	let map = buildMap(lines);

	const trip = searchBestPath(
		{ x: map.start.x, y: map.start.y, blizzards: map.blizzards },
		map.end,
		map.x,
		map.y
	);

	return trip.time;
}

function solveForSecondStar(lines) {
	let map = buildMap(lines);

	let trip1 = searchBestPath(
		{ x: map.start.x, y: map.start.y, blizzards: map.blizzards },
		map.end,
		map.x,
		map.y
	);

	// Go back to start from the end based on the blizzard configuration from the end of trip1
	let trip2 = searchBestPath(
		{ x: trip1.x, y: trip1.y, blizzards: trip1.blizzards },
		map.start,
		map.x,
		map.y
	);

	// Return the the end one more time from start based on the blizzard configuration of trip 2
	let trip3 = searchBestPath(
		{ x: trip2.x, y: trip2.y, blizzards: trip2.blizzards },
		map.end,
		map.x,
		map.y
	);

	return trip1.time + trip2.time + trip3.time;
}

function buildMap(lines) {
	let blizzards = new Set();
	let start = {};
	let end = {};
	let y;
	let x;

	lines.map((curr, y)=>{
		const line = curr.split("");
		line.map((char, x)=>{
			if (y === 0 && char === "."){
				start.x = x;
				start.y = y;
			}
			else if (y === lines.length - 1 && char === "."){
				end.x = x;
				end.y = y;
			}
			else if (
				char === ">" ||
				char === "<" ||
				char === "^" ||
				char === "v"){
				blizzards.add(`${x},${y},${char}`);
			}
		});
	});

	helpers.dbg(JSON.stringify([...blizzards], null, 2));
	helpers.dbg(start.x, "-", start.y, "-", end.x, "-", end.y);

	return { blizzards, start, end, x: lines[0].length - 1, y: lines.length - 1 };
}

function searchBestPath(state, end, maxX, maxY) {
	let queue = [];
	let seen = new Set();

	state.time = 0;
	queue.push(state);

	while (queue.length > 0) {
		let current = queue.shift();

		const uniqueId = `${current.x},${current.y},${current.time}`;
		if (seen.has(uniqueId)){
			continue;
		}
		else{
			seen.add(uniqueId);
		}

		if (current.x === end.x && current.y === end.y) return current;

		const moves = getNextValidMoves(current, maxX, maxY, state, end);

		moves.forEach((next) => {
			next.time = current.time + 1;
			queue.push(next);
		});
	}
}

function getNextValidMoves(current, maxX, maxY, start, end) {
	let updatedBlizzards = new Set();

	current.blizzards.forEach((value) => {
		const parsed = value.split(",");
		let x = parseInt(parsed[0], 10);
		let y = parseInt(parsed[1], 10);
		const dir = parsed[2];

		let newX;
		let newY;
		if (dir === "^") {
			newY = y - 1;
			newX = x;
			if (newY === 0) {
				newY = maxY - 1;
			}
		} else if (dir === "<") {
			newX = x - 1;
			newY = y;
			if (newX === 0) {
				newX = maxX - 1;
			}
		} else if (dir === ">") {
			newX = x + 1;
			newY = y;
			if (newX === maxX) {
				newX = 1;
			}
		} else if (dir === "v") {
			newY = y + 1;
			newX = x;
			if (newY === maxY) {
				newY = 1;
			}
		}

		updatedBlizzards.add(`${newX},${newY},${dir}`);
	});

	// Get each set of new coordinates for all possible next moves
	let up = { x: current.x, y: current.y - 1, blizzards: updatedBlizzards };
	let left = { x: current.x - 1, y: current.y, blizzards: updatedBlizzards };
	let right = { x: current.x + 1, y: current.y, blizzards: updatedBlizzards };
	let down = { x: current.x, y: current.y + 1, blizzards: updatedBlizzards };
	let wait = { x: current.x, y: current.y, blizzards: updatedBlizzards };

	// Check each new position to see if it can be moved to
	let canMoveUp =
		(up.x === start.x && up.y === start.y) ||
		(up.x === end.x && up.y === end.y) ||
		(!updatedBlizzards.has(`${up.x},${up.y},^`) &&
			!updatedBlizzards.has(`${up.x},${up.y},<`) &&
			!updatedBlizzards.has(`${up.x},${up.y},>`) &&
			!updatedBlizzards.has(`${up.x},${up.y},v`) &&
			up.y > 0 &&
			up.y < maxY &&
			up.x > 0 &&
			up.x < maxX);
	let canMoveLeft =
		!updatedBlizzards.has(`${left.x},${left.y},^`) &&
		!updatedBlizzards.has(`${left.x},${left.y},<`) &&
		!updatedBlizzards.has(`${left.x},${left.y},>`) &&
		!updatedBlizzards.has(`${left.x},${left.y},v`) &&
		left.y > 0 &&
		left.y < maxY &&
		left.x > 0 &&
		left.x < maxX;
	let canMoveRight =
		!updatedBlizzards.has(`${right.x},${right.y},^`) &&
		!updatedBlizzards.has(`${right.x},${right.y},<`) &&
		!updatedBlizzards.has(`${right.x},${right.y},>`) &&
		!updatedBlizzards.has(`${right.x},${right.y},v`) &&
		right.y > 0 &&
		right.y < maxY &&
		right.x > 0 &&
		right.x < maxX;
	let canMoveDown =
		(down.x === start.x && down.y === start.y) ||
		(down.x === end.x && down.y === end.y) ||
		(!updatedBlizzards.has(`${down.x},${down.y},^`) &&
			!updatedBlizzards.has(`${down.x},${down.y},<`) &&
			!updatedBlizzards.has(`${down.x},${down.y},>`) &&
			!updatedBlizzards.has(`${down.x},${down.y},v`) &&
			down.y > 0 &&
			down.y < maxY &&
			down.x > 0 &&
			down.x < maxX);
	let canWait =
		!updatedBlizzards.has(`${wait.x},${wait.y},^`) &&
		!updatedBlizzards.has(`${wait.x},${wait.y},<`) &&
		!updatedBlizzards.has(`${wait.x},${wait.y},>`) &&
		!updatedBlizzards.has(`${wait.x},${wait.y},v`);

	// Only add new positions that can be moved into the result
	let result = [];

	if (canMoveDown) result.push(down);
	if (canMoveRight) result.push(right);
	if (canMoveLeft) result.push(left);
	if (canMoveUp) result.push(up);
	if (canWait) result.push(wait);

	return result;
}

module.exports = { solveForFirstStar, solveForSecondStar };
