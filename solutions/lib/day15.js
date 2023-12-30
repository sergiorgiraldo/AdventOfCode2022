const helpers = require("./helpers");

function solveForFirstStar(lines, row) {
	const [map, beacons] = buildMap(lines);

	const rangesForRow = getRangesForRow(map, row);
	const coveredRanges = sortRanges(rangesForRow);

	const coveredCount = sumRangeCounts(coveredRanges);

	const existingBeacons = beacons.filter((beacon) => beacon.beaconY == row);

	return coveredCount - existingBeacons.length;
}

function solveForSecondStar(lines) {
	const MAX_ROW = 4_000_000;
	
	const [map, _] = buildMap(lines);

	for (let row = 0; row <= MAX_ROW; row++) {
		const rangesForRow = getRangesForRow(map, row);
		const coveredRanges = sortRanges(rangesForRow);

		let col = findUncoveredColumn(coveredRanges);

		if (col != null) {
			return col * MAX_ROW + row;
		}
	}
	return null;
}

function buildMap(lines) {
	let map = [];
	let beacons = [];
	for (let i = 0; i < lines.length; i++) {
		const lineRegex =
			/x=(?<x1>-?\d+).*?y=(?<y1>-?\d+).*x=(?<x2>-?\d+).*?y=(?<y2>-?\d+)/gm;
		const matches = lineRegex.exec(lines[i]);

		const sensorX = parseInt(matches.groups.x1, 10);
		const sensorY = parseInt(matches.groups.y1, 10);
		const beaconX = parseInt(matches.groups.x2, 10);
		const beaconY = parseInt(matches.groups.y2, 10);

		map.push({
			sensorX: sensorX,
			sensorY: sensorY,
			beaconX: beaconX,
			beaconY: beaconY,
			distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
		});

		const beacon = {
			beaconX: beaconX,
			beaconY: beaconY
		};

		if (
			!beacons.some((b) => JSON.stringify(b) === JSON.stringify(beacon))
		) {
			beacons.push(beacon);
		}
	}
	return [map, beacons];
}

function getRangesForRow(map, targetRow) {
	/*
			beaconY is given as row, need to find possibilities for beaconX:

			abs(sensorX -beaconX) + abs(sensorY - row) < distance
			abs(sensorX -beaconX) < distance - abs(sensorY - row)

			(case 1) (sensorX -beaconX) >=0
			sensorX -beaconX < distance - abs(sensorY - row)
			sensorX - distance + abs(sensorY - row) < beaconX
			beaconX > sensorX - distance + abs(sensorY - row) (i)
			
			(case 2) (sensorX -beaconX) <0
			- sensorX + beaconX < distance - abs(sensorY - row)
			beaconX < distance - abs(sensorY - row) + sensorX (ii)
	*/
	const row = parseInt(targetRow, 10);

	const rangesForRow = map
		.filter((s) => Math.abs(row - s.sensorY) < s.distance) //if greater than distance, then beacon can exist
		.map((s) => {
			return [
				s.sensorX - s.distance + Math.abs(s.sensorY - row), // (i)
				s.distance - Math.abs(s.sensorY - row) + s.sensorX  // (ii)
			];
		});

	return rangesForRow;
}

function sortRanges(ranges) {
	return ranges.sort((r1, r2) => {
		if (r1[0] == r2[0]) return 0;
		return r1[0] < r2[0] ? -1 : 1;
	});
}

function sumRangeCounts(ranges) {
	let count = 0;
	let [start, end] = ranges[0];

	for (let i = 1; i < ranges.length; i++) {
		const [range_start, range_end] = ranges[i];
		if (range_start > end) {
			count += end - start + 1;
			start = range_start;
			end = range_end;
		} else if (range_end > end) {
			end = range_end;
		}
	}

	count += end - start + 1;
	return count;
}

function findUncoveredColumn(ranges, max_row) {
	let [_, end] = ranges[0];
	for (let i = 1; i < ranges.length; i++) {
		const [range_start, range_end] = ranges[i];
		if (range_start > end) {
			return range_start - 1;
		} else if (range_end > end) {
			end = range_end;
		}
		if (end > max_row) return null;
	}
	return null;
}

module.exports = { solveForFirstStar, solveForSecondStar };
