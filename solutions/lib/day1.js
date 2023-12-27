
const helpers = require("./helpers");

function solveForFirstStar(lines){
	const calories = sortCalories(lines);	

	return calories[0];
}

function solveForSecondStar(lines){
	const calories = sortCalories(lines);	

	return calories[0] + calories[1] + calories[2];
}

function sortCalories(lines){
	let calories = [];

	let currentCalorieCount = 0;
	
	for (let elfCalorie of lines) {
		if (elfCalorie === "")	{
			calories.push(currentCalorieCount);
			currentCalorieCount = 0;
			continue;
		} else {
			currentCalorieCount += +elfCalorie;
		}
	}
	calories.push(currentCalorieCount);
	
	calories.sort((a, b) => {
		return b-a;
	});

	return calories;
}

module.exports = { solveForFirstStar, solveForSecondStar };
