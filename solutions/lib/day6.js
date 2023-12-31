const helpers = require("./helpers");

function solveForFirstStar(lines) {
	return getMarker(lines, 4);
}

function solveForSecondStar(lines) {
	return getMarker(lines,14);
}

function getMarker(lines, lengthOfMarker){
	let start = 0;

	const areAllDifferent = (marker) => {
		return new Set(marker).size === lengthOfMarker;
	};

	while (start < lines.length - 4) {
		const marker = lines.slice(start, start + lengthOfMarker);

		if (areAllDifferent(marker)) {
			return start + lengthOfMarker;
		}
		else{
			start += 1;
		}
	}
	
	return 0;
}

module.exports = { solveForFirstStar, solveForSecondStar };
