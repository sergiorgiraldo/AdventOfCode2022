const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const pairs = buildPairs(lines);

	const pairsInRightOrder = [];

	pairs.forEach(([left, right], i) => {
		const order = compare(left, right);
		if (order !== -1) {
			pairsInRightOrder.push(i + 1);
		}
	});

	const total = pairsInRightOrder.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function solveForSecondStar(lines) {
	const pairs = buildPairs(lines);
	
    const divider1 = [[2]];
    const divider2 = [[6]];

    const allPackets = [divider1, divider2];
    pairs.forEach(([left, right]) => allPackets.push(left, right));
    allPackets.sort((a, b) => compare(b, a));

    const posOfDivider1 = 1 + allPackets.findIndex(e => compare(e, divider1) === 0);
    const posOfDivider2 = 1 + allPackets.findIndex(e => compare(e, divider2) === 0);

	return posOfDivider1 * posOfDivider2;
}

function buildPairs(lines) {
	let pairs = [];

	for (let i = 0; i < lines.length; i += 3) {
		const left = JSON.parse(lines[i]);
		const right = JSON.parse(lines[i + 1]);
		pairs.push([left, right]);
	}

	return pairs;
}

function compare(left, right) {
	if (!left && left !== 0) return 1;
	if (!right && right !== 0) return -1;

	if (Array.isArray(left) || Array.isArray(right)) {
		const leftArr = Array.isArray(left) ? left : [left];
		const rightArr = Array.isArray(right) ? right : [right];
		return compareArrays(leftArr, rightArr);
	}

	if (left === right) return 0;

	return left < right ? 1 : -1;
}

function compareArrays(left, right) {
	const maxLength = Math.max(left.length, right.length);

	for (let i = 0; i < maxLength; i++) {
		const order = compare(left[i], right[i]);
		if (order !== 0) return order;
	}

	return 0;
}

module.exports = { solveForFirstStar, solveForSecondStar };
