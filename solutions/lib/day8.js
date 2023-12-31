const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const treeMap = buildTreeMap(lines);
	let visibles = 0;
	for (i = 0; i < treeMap.length; i++) {
		for (j = 0; j < treeMap[i].length; j++) {
			if (i == 0 || j == 0 || i == treeMap.length - 1 || j == treeMap[i].length - 1) { //edges
				visibles += 1;
			} 
			else { //inners
				visibles += isVisible(treeMap, i, j) ? 1 : 0;
			}
		}
	}
	return visibles;
}

function solveForSecondStar(lines) {
	const treeMap = buildTreeMap(lines);
	let scores = [];

	for (i = 0; i < treeMap.length; i++) {
		for (j = 0; j < treeMap[i].length; j++) {
			const score = getScore(treeMap, i, j);
			
			scores.push(score);
		}
	}

	return Math.max(...scores);
}

function buildTreeMap(lines) {
	let treeMap = [];
	treeMap = lines.map((line) => line.split("").map(Number));
	return treeMap;
}

function isVisible(treeMap, i, j) {
	let height = treeMap[i][j];
	let fromTop = true, fromBottom = true, fromLeft = true, fromRight = true;
	//top
	for (let k = 0; k < i; k++) {
		if (treeMap[k][j] >= height) {
			fromTop =  false;
			break;
		}
	}

	//bottom
	for (let k = i + 1; k < treeMap.length; k++) {
		if (treeMap[k][j] >= height) {
			fromBottom 	= false;
			break;
		}
	}

	//left
	for (let k = 0; k < j; k++) {
		if (treeMap[i][k] >= height) {
			fromLeft = false;
			break;
		}
	}

	//right
	for (let k = j + 1; k < treeMap[i].length; k++) {
		if (treeMap[i][k] >= height) {
			fromRight = false;
			break;
		}
	}

	return fromTop || fromBottom || fromLeft || fromRight;
}

function getScore(treeMap, i, j) {
	let height = treeMap[i][j];
	let fromTop = 0, fromBottom = 0, fromLeft = 0, fromRight = 0, start = 0;
	
	//top
	k = i-1;
	while (k >= 0){

		if (treeMap[k][j] >= height) {
			fromTop += 1;
			break;
		}
		else{
			fromTop += 1;
		}
		k--;
	}

	//bottom
	k = i+1;
	while(k < treeMap.length){
		if (treeMap[k][j] >= height) {
			fromBottom += 1;
			break;
		}
		else{
			fromBottom += 1;
		}
		k++;
	}

	//left
	k = j-1;
	while(k >= 0){
		if (treeMap[i][k] >= height) {
			fromLeft += 1;
			break;
		}
		else{
			fromLeft += 1;
		}
		k--;
	}

	//right
	k = j+1;
	while(k < treeMap[i].length){
		if (treeMap[i][k] >= height) {
			fromRight += 1;
			break;
		}
		else{
			fromRight += 1;
		}
		k++;
	}

	return fromTop * fromBottom * fromLeft * fromRight;
}

module.exports = { solveForFirstStar, solveForSecondStar };
