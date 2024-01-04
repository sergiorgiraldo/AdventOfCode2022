const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const score = getScore(lines);

	return score;
}

function solveForSecondStar(lines) {
	const MustWin = {
		/*Rock*/ A: "Y" /*Paper*/ ,
		/*Paper*/ B: "Z" /*Scissors*/,
		/*Scissors*/ C: "X" /*Rock*/
	};
	const MustLose = {
		/*Rock*/ A: "Z" /*Scissors*/ ,
		/*Paper*/ B: "X" /*Rock*/,
		/*Scissors*/ C : "Y" /*Paper*/
	};
	const Equivalences = {
		/*Rock*/ A: "X" /* Rock */,
		/*Paper*/ B: "Y" /* Paper */,
		/*Scissors*/ C: "Z" /* Scissors */
	};

	let newGame = [];

	/*
	X: I lose
	Y: I draw
	Z: I win
	*/

	lines.forEach(line => {
		helpers.dbg(line);

		const play = line.split(" ");
		if (play[1] === "X") {
			newGame.push(play[0] + " " + MustLose[play[0]]);
		} else if (play[1] === "Y") {
			newGame.push(play[0] + " " + Equivalences[play[0]]);
		} else if (play[1] === "Z") {
			newGame.push(play[0] + " " + MustWin[play[0]]);
		}
		helpers.dbg(newGame);
	})
	const score = getScore(newGame);

	return score;
}

function getScore(plays) {
	const Wins = {
		/*Rock*/ X: "C" /* Scissors */,
		/*Paper*/ Y: "A" /* Rock */,
		/*Scissors*/ Z: "B" /* Paper */
	};
	const MyPlays = {
		Z: 3,
		Y: 2,
		X: 1
	};
	const Equivalences = {
		/*Rock*/ X: "A" /* Rock */,
		/*Paper*/ Y: "B" /* Paper */,
		/*Scissors*/ Z: "C" /* Scissors */
	};

	const score = plays
		.map((line) => {
			const play = line.split(" ");
			if (play[0] === Equivalences[play[1]]) {
				// Draw
				return MyPlays[play[1]] + 3;
			} else if (play[0] === Wins[play[1]]) {
				// I win
				return MyPlays[play[1]] + 6;
			} else {
				// I lose
				return MyPlays[play[1]];
			}
		})
		.reduce((acc, curr) => acc + curr, 0);

	return score;
}

module.exports = { solveForFirstStar, solveForSecondStar };
