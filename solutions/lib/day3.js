const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const total = lines
		.map((line) => {
			const items = line.split("");
			const half = Math.floor(items.length / 2);
			
			const first = items.slice(0, half);
			const second = items.slice(half);
			
			const intersect = helpers.arrays.intersect(first, second);
			
			return getPriority(intersect[0]);
		})
		.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function solveForSecondStar(lines) {
	let priorities = [];

	for (let i = 0; i < lines.length; i += 3) {
		const first = lines[i].split("");
		const second = lines[i + 1].split("");
		const third = lines[i + 2].split("");
		
		const intersect = helpers.arrays.intersect(
			helpers.arrays.intersect(first, second),
			third
		);
		
		priorities.push(getPriority(intersect[0]));
	}

	const total = priorities.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function getPriority(item) {
	//a-z: 97-122, should be 1-26
	//A-Z: 65-90, should be 27-52
	const charCode = item.charCodeAt(0);
	return charCode > 90 ? charCode - 96 : charCode - 38;
}

module.exports = { solveForFirstStar, solveForSecondStar };
