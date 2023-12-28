const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const total = lines
		.map((line) => {
			const items = line.split("");
			const half = Math.floor(items.length / 2);
			const first = items.slice(0, half);
			const second = items.slice(half);
			const intersect = helpers.arrrays.intersect(first, second);
			//a-z: 97-122
			//A-Z: 65-90
			const charCode = intersect[0].charCodeAt(0);
			return charCode > 90 ? charCode - 96 : charCode - 38;
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
		const intersect = helpers.arrrays.intersect(
			helpers.arrrays.intersect(first, second),
			third
		);
		//a-z: 97-122
		//A-Z: 65-90
		const charCode = intersect[0].charCodeAt(0);
		priorities.push(charCode > 90 ? charCode - 96 : charCode - 38);
	}

	const total = priorities.reduce((acc, curr) => acc + curr, 0);

	return total;
}

module.exports = { solveForFirstStar, solveForSecondStar };
