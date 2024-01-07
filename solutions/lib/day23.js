const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const elves = parseInput(lines);

	runSimulationPart1(elves, 10);

	const totalEmpty = countEmptySpaces(elves);

	return totalEmpty;
}

function solveForSecondStar(lines) {
	const elves = parseInput(lines);

	const finalRound = runSimulationPart2(elves);

	return finalRound;
}

// Parse the elves starting locations into a has set.
function parseInput(lines){
	let elves = new Set();

	lines.map((line, y) =>{
		const items = line.split("");
		items.map((item, x) =>{
			if (item === "#") {
				elves.add(`${x},${y}`);
			}
		});
	});

	return elves;
};

function runSimulationPart1(elves, rounds){
	const directions = ["N", "S", "W", "E"];

	for (let r = 0; r < rounds; r++) {
		moveElvesAround(elves, directions);

		const rotatedDir = directions.shift();
		directions.push(rotatedDir);
	}
};

function runSimulationPart2(elves){
	const directions = ["N", "S", "W", "E"];

	let elvesStopped = false;
	for (let round = 0; !elvesStopped; round++) {
		elvesStopped = moveElvesAround(elves, directions);

		if (elvesStopped) return round + 1;

		const rotatedDir = directions.shift();
		directions.push(rotatedDir);
	}
};

function moveElvesAround(elves, directions){ //move elves a round :D
	let nextPos = new Map();

	// Check each elf to see if they will move this round to a new position or stay put
	elves.forEach((value) => {
		// Get current cordinates and coordinates for all surrounding points
		let coord = value.split(",").map((i) => parseInt(i));
		let nw = `${coord[0] - 1},${coord[1] - 1}`;
		let n = `${coord[0]},${coord[1] - 1}`;
		let ne = `${coord[0] + 1},${coord[1] - 1}`;
		let e = `${coord[0] + 1},${coord[1]}`;
		let w = `${coord[0] - 1},${coord[1]}`;
		let sw = `${coord[0] - 1},${coord[1] + 1}`;
		let s = `${coord[0]},${coord[1] + 1}`;
		let se = `${coord[0] + 1},${coord[1] + 1}`;

		// Check each each surrounding point for an elf that is occupying it
		let hasNW = elves.has(nw);
		let hasN = elves.has(n);
		let hasNE = elves.has(ne);
		let hasE = elves.has(e);
		let hasW = elves.has(w);
		let hasSW = elves.has(sw);
		let hasS = elves.has(s);
		let hasSE = elves.has(se);

		// If the elf has at least one adjacent elf consider moving them
		if (hasNW || hasN || hasNE || hasE || hasW || hasSW || hasS || hasSE) {
			// Consider each direction in the order specified
			let foundDirection = false;
			for (let d = 0; d < directions.length && !foundDirection; d++) {
				let dir = directions[d];
				// Consider North
				if (dir === "N") {
					// If this direction is clear
					if (!hasNW && !hasN && !hasNE) {
						foundDirection = true;
						// If a collision was found, delete the other elf's move and don't
						// add one for this elf. Both elves will not move this round
						if (nextPos.has(n)) {
							nextPos.delete(n);
						}
						// Add the elf's next position
						else {
							nextPos.set(n, value);
						}
					}
				}
				// Consider South
				else if (dir === "S") {
					// If this direction is clear
					if (!hasSW && !hasS && !hasSE) {
						foundDirection = true;
						// If a collision was found delete the other elf's move and don't
						// add one for this elf. Both elves will not move this round
						if (nextPos.has(s)) {
							nextPos.delete(s);
						}
						// Add the elf's next position
						else {
							nextPos.set(s, value);
						}
					}
				}
				// Consider West
				else if (dir === "W") {
					// If this direction is clear
					if (!hasNW && !hasW && !hasSW) {
						foundDirection = true;
						// If a collision was found delete the other elf's move and don't
						// add one for this elf. Both elves will not move this round
						if (nextPos.has(w)) {
							nextPos.delete(w);
						}
						// Add the elf's next position
						else {
							nextPos.set(w, value);
						}
					}
				}
				// Consider East
				else if (dir === "E") {
					// If this direction is clear
					if (!hasNE && !hasE && !hasSE) {
						foundDirection = true;
						// If a collision was found delete the other elf's move and don't
						// add one for this elf. Both elves will not move this round
						if (nextPos.has(e)) {
							nextPos.delete(e);
						}
						// Add the elf's next position
						else {
							nextPos.set(e, value);
						}
					}
				}
			}
		}
	});

	// Check if the next position array is empty. If so this means
	// no elf will make a move this round
	if (nextPos.size === 0) return true;

	// Move each elf to it's new position by deleting it's old position
	// and adding it's new position the the elf hash set
	nextPos.forEach((value, key) => {
		elves.delete(value);
		elves.add(key);
	});

	// Elves have not stopped moving
	return false;
};

function countEmptySpaces(elves){
	let minX = Number.MAX_SAFE_INTEGER;
	let minY = Number.MAX_SAFE_INTEGER;
	let maxX = Number.MIN_SAFE_INTEGER;
	let maxY = Number.MIN_SAFE_INTEGER;

	// Check each elf to see if their position changes the minX, minY, maxX, or maxY values
	elves.forEach((value) => {
		let coord = value.split(",").map((i) => parseInt(i));
		minX = Math.min(minX, coord[0]);
		minY = Math.min(minY, coord[1]);
		maxX = Math.max(maxX, coord[0]);
		maxY = Math.max(maxY, coord[1]);
	});

	// Using the min and max values check each pair of coordinates
	// to see if an elf is in that position
	let totalEmpty = 0;
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			// If no elf is in this position add 1 to the total number of empty spaces
			if (!elves.has(`${x},${y}`)) totalEmpty++;
		}
	}

	return totalEmpty;
};

module.exports = { solveForFirstStar, solveForSecondStar };
