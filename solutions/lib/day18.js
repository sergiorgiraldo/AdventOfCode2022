const helpers = require("./helpers");

function solveForFirstStar(lines) {
	let cubePositions = new Set();

	lines.map((line) => {
		let [x, y, z] = line.split(",").map(Number);
		cubePositions.add(`${x},${y},${z}`);
	});
	cubePositions.forEach((cube) => {helpers.dbg(cube)});
	let surfaceArea = [];

	cubePositions.forEach((cube) => {
		let [x, y, z] = cube.split(",").map(Number);
		surfaceArea.push(countOpenSides(cubePositions, x, y, z));
	});

	const total = surfaceArea.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function solveForSecondStar(lines) {
	let cubePositions = new Set();

	lines.map((line) => {
		let [x, y, z] = line.split(",").map(Number);
		cubePositions.add(`${x},${y},${z}`);
	});

	let MIN = Infinity;
	let MAX = -Infinity;

	cubePositions.forEach((cube) => {
		let [x, y, z] = cube.split(",").map(Number);
		MIN = Math.min(MIN, x, y, z);
		MAX = Math.max(MAX, x, y, z);
	});

	let visited = new Set();
	let surfaceArea = [];
	let queue = [{ x: 0, y: 0, z: 0 }];
	
	while (queue.length > 0) {
	  let { x, y, z } = queue.shift();

	  if (visited.has(`${x},${y},${z}`)) continue;
	  if (cubePositions.has(`${x},${y},${z}`)) continue;
	  if (x < MIN - 1 || y < MIN - 1 || z < MIN - 1) continue;
	  if (x > MAX + 1 || y > MAX + 1 || z > MAX + 1) continue;

	  visited.add(`${x},${y},${z}`);
	
	  surfaceArea.push(countAffectedCubes(cubePositions, x, y, z));
	
	  queue.push({ x: x + 1, y, z });
	  queue.push({ x: x - 1, y, z });
	  queue.push({ x, y: y + 1, z });
	  queue.push({ x, y: y - 1, z });
	  queue.push({ x, y, z: z + 1 });
	  queue.push({ x, y, z: z - 1 });
	}
	
	const total = surfaceArea.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function countOpenSides(cubePositions, x, y, z) {
	let count = 6;
	if (cubePositions.has(`${x + 1},${y},${z}`)) count--;
	if (cubePositions.has(`${x - 1},${y},${z}`)) count--;
	if (cubePositions.has(`${x},${y + 1},${z}`)) count--;
	if (cubePositions.has(`${x},${y - 1},${z}`)) count--;
	if (cubePositions.has(`${x},${y},${z + 1}`)) count--;
	if (cubePositions.has(`${x},${y},${z - 1}`)) count--;

	return count;
}

/*
Since all cubes are volume 1, a cube of air means that there is a not a cube of lava that starts 1 coordinate away.
in other words, i have to find cubes where one of the coordinates is +1 or -1 and the others are the same
*/
function countAffectedCubes(cubePositions, x, y, z) {
	let count = 0;
	if (cubePositions.has(`${x + 1},${y},${z}`)) count++;
	if (cubePositions.has(`${x - 1},${y},${z}`)) count++;
	if (cubePositions.has(`${x},${y + 1},${z}`)) count++;
	if (cubePositions.has(`${x},${y - 1},${z}`)) count++;
	if (cubePositions.has(`${x},${y},${z + 1}`)) count++;
	if (cubePositions.has(`${x},${y},${z - 1}`)) count++;

	return count;
}

module.exports = { solveForFirstStar, solveForSecondStar };
