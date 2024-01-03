const helpers = require("./helpers");

let distanceMemo;

function solveForFirstStar(lines) {
	const tunnelMap = buildMap(lines);

	distanceMemo = new Map();

	let contesters = [...tunnelMap.keys()].filter(
		(valve) => tunnelMap.get(valve).flowRate > 0
	);

	return nextOptimalValve(tunnelMap, "AA", 30, contesters).value;
}

//couldnt make part 2 work with algorithm of part1, rewrote from scratch
function solveForSecondStar(lines) {
	const map = lines.map(parse);

	return maxPressureReleasedWithElephant(map, 26);
}

function buildMap(lines) {
	let tunnelMap = new Map();
	lines.map((line) => {
		let neighbors = line.split(", ");
		neighbors[0] = neighbors[0].slice(-2);

		let valve = line.split(" ")[1];

		let flowRate = parseInt(line.split("=")[1].split(";")[0]);

		tunnelMap.set(valve, { neighbors, flowRate });
	});
	return tunnelMap;
}

function nextOptimalValve(tunnelMap, currValve, timeLeft, contesters) {
	let optimalValve = null;
	let value = 0;

	for (let contester of contesters) {
		let newContesters = [...contesters].filter((v) => v !== contester);
		let newTime =
			timeLeft - distanceTo(tunnelMap, currValve, contester) - 1;
		if (newTime <= 0) continue;
		let score = newTime * tunnelMap.get(contester).flowRate;
		let optimal = nextOptimalValve(
			tunnelMap,
			contester,
			newTime,
			newContesters
		);
		score += optimal.value;

		if (score > value) {
			optimalValve = contester;
			value = score;
		}
	}

	return { optimalValve, value };
}

function distanceTo(tunnelMap, currValve, targetValve) {
	let key = distanceMemoKey(currValve, targetValve);
	if (distanceMemo.has(key)) return distanceMemo.get(key);
	let visited = new Set();
	let queue = [currValve];
	let traveled = 0;

	while (queue.length > 0) {
		let nextQueue = [];
		for (let valve of queue) {
			if (visited.has(valve)) continue;
			visited.add(valve);
			if (valve === targetValve) {
				distanceMemo.set(key, traveled);
				return traveled;
			}
			for (let neighbor of tunnelMap.get(valve).neighbors) {
				nextQueue.push(neighbor);
			}
		}
		queue = nextQueue;
		traveled++;
	}
}

function distanceMemoKey(currValve, targetValve) {
	return currValve < targetValve
		? currValve + targetValve
		: targetValve + currValve;
}

function maxPressureReleasedWithElephant(map, startTime) {
	const score = search(map, startTime);
	let max = 0;
	for (let j = 1; j < score.length; j++) {
		for (let i = 0; i < j; i++) {
			if (score[i][1] * 2 < max) break;
			const hashA = score[i][0];
			const hashB = score[j][0];
			if (hashA & hashB) continue;
			const total = score[i][1] + score[j][1];
			if (total > max) max = total;
		}
	}
	return max;
}

function search(map, startTime) {
	const valves = getValves(map);
	const openable = map.filter((valve) => valve.rate > 0);
	const shortestPath = getShortestPath(valves, openable);

	const score = [];
	const unvisited = [];
	unvisited.push([0, "AA", startTime, 0]);

	while (unvisited.length > 0) {
		const [visited, next, time, released, extras] = unvisited.pop();
		openable.forEach((row) => {
			if (visited & row.hash) return;
			score.push([visited, released]);
			const distance = shortestPath[next][row.from];
			const nextTime = time - distance - 1;
			if (nextTime > 0) {
				unvisited.push([
					visited + row.hash,
					row.from,
					nextTime,
					released + nextTime * row.rate,
					extras
				]);
			}
		});
	}

	return score.sort((a, b) => b[1] - a[1]);
}

function getShortestPath(valves, openable) {
	function findShortestPath(start) {
		const visited = {};
		const unvisited = [];
		unvisited.push([valves[start], 0]);
		while (unvisited.length > 0) {
			const [next, steps] = unvisited.shift();
			if (next.from in visited) {
				if (steps >= visited[next.from]) continue;
				else visited[next.from] = steps;
			} else {
				visited[next.from] = steps;
			}
			Object.keys(next.to).forEach((id) =>
				unvisited.push([valves[id], steps + next.to[id]])
			);
		}
		delete visited[start];
		return visited;
	}

	const shortest = {};
	shortest.AA = findShortestPath("AA");
	openable.forEach((row) => {
		shortest[row.from] = findShortestPath(row.from);
	});
	return shortest;
}

function getValves(input) {
	const valves = {};
	let hash = 1;
	input.forEach((row) => {
		valves[row.from] = row;
		if (row.rate > 0) {
			row.hash = hash;
			hash *= 2;
		}
	});

	function preprocessInputRowTo(row, path = []) {
		if (!Array.isArray(row.to)) return row.to;
		const to = {};
		row.to.forEach((id) => {
			if (path.includes(id)) return;
			const next = valves[id];
			const steps =
				next.rate > 0
					? { [id]: 0 }
					: preprocessInputRowTo(next, [...path, row.from]);
			Object.keys(steps).forEach((id) => {
				if (id in to) to[id] = Math.min(to[id], steps[id] + 1);
				else to[id] = steps[id] + 1;
			});
		});
		delete to[row.from];
		return to;
	}

	input.forEach((row) => {
		row.to = preprocessInputRowTo(row);
	});

	return valves;
}

function parse(line) {
	const matches = line.match(
		/^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/
	);
	return {
		from: matches[1],
		to: matches[3].split(", "),
		rate: +matches[2]
	};
}

module.exports = { solveForFirstStar, solveForSecondStar };
