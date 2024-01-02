const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const map = buildMap(lines);
	
	const sandCount = simulateSand(map, false);

	return sandCount;
}

function solveForSecondStar(lines) {
	const map = buildMap(lines);
	
	const sandCount = simulateSand(map, true);
	
	return sandCount;
}

function buildMap(lines) {
	const map = [];

	lines.forEach((line) => {
		const scans = line.split(" -> ");
		for (i = 0; i < scans.length - 1; i++) {
			let [x1, y1] = scans[i].split(",").map(Number);
			let [x2, y2] = scans[i + 1].split(",").map(Number);

			//lines can be going backwards or forwards, up or down, make sure they are ordered for the loop
			if (x1 > x2) [x1, x2] = [x2, x1];
			if (y1 > y2) [y1, y2] = [y2, y1];

			for (j = x1; j <= x2; j++) {
				for (k = y1; k <= y2; k++) {
					if (!helpers.objects.existsWithAttrs(map, { x: j, y: k })){
						map.push({ x: j, y: k, isSand:false, isRock: true });
					}
				}
			}
		}
	});

	return map;
}

function simulateSand(map, isInfinite) {
	const endlessVoid = Math.max(...map.map((item) => item.y)) + 1;
	
	//if(isInfinite){
	const extraRow = endlessVoid;
	const extraRocks = endlessVoid + 1;
	//}

	const directions = [
		[0, 1],
		[-1, 1],
		[1, 1]
	];
	const isInMap = (x, y) => {
		return helpers.objects.existsWithAttrs(map, { x: x, y: y }) ||
				(isInfinite && (y === extraRow || y === extraRocks))
	};
	const isRockOrSand = (x, y) => {
		if(isInfinite && (y === extraRocks)) return true;

		const item = map.find((item) => item.x === x && item.y === y);

		if (!item && isInfinite) return false; //this is the extraRow

		return item.isRock || item.isSand;
	};

	let sandCount = 0;
	let inTheEndlessVoid = false;

	while (!inTheEndlessVoid) {
	
		let isFalling = true;
		let start = { x: 500, y: 0 };

		while (isFalling) {
			let [x, y] = [start.x, start.y];
			let canFall = true;
			
			let newPosition = {
				x: x + directions[0][0],
				y: y + directions[0][1]
			}; //down

			if (isInMap(newPosition.x, newPosition.y) && isRockOrSand(newPosition.x, newPosition.y)){
				newPosition = {
					x: x + directions[1][0],
					y: y + directions[1][1]
				}; //left

				if (isInMap(newPosition.x, newPosition.y) && isRockOrSand(newPosition.x, newPosition.y)){
					newPosition = {
						x: x + directions[2][0],
						y: y + directions[2][1]
					}; //right

					if (isInMap(newPosition.x, newPosition.y) && isRockOrSand(newPosition.x, newPosition.y)){
						canFall = false;
					}
				}
			}

			if (canFall){
				if (!isInfinite){
					if (newPosition.y === endlessVoid) {
						isFalling = false;
						inTheEndlessVoid = true;
						break;
					}
				}
				start.x = newPosition.x; 
				start.y = newPosition.y;
			}
			else{
				isFalling = false;

				map.push({ x: start.x, y: start.y, isSand: true, isRock: false });

				sandCount += 1;

				if(isInfinite){
					if (start.x === 500 && start.y === 0) {
						inTheEndlessVoid = true;
						break;
					}
				}
			}
		}
	}
	return sandCount;
}

module.exports = { solveForFirstStar, solveForSecondStar };
