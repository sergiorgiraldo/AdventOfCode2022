const helpers = require("./helpers");

function solveForFirstStar(lines) {
	let cycleToFinish = 0;
	let offset = 0;
	let command;
	let register = 1;
	let values = [];
	for (let cycle = 1; cycle <= 220; cycle++) {
		if (cycle == 20 || (cycle - 20) % 40 == 0) {
			values.push(register * cycle);
		}

		if (cycleToFinish == 0) {
			command = lines[offset];

			if (command === "noop") {
				offset += 1;
			} else {
				if (command.startsWith("addx")) {
					cycleToFinish = 1;
				}
			}
		} else {
			//second cycle for addx command
			cycleToFinish = 0;
			const value = Number(command.split(" ")[1]);

			register += value;
			offset += 1;
		}
	}

	const signal = values.reduce((acc, curr) => acc + curr, 0);

	return signal;
}

function solveForSecondStar(lines) {
	let screen = new Array(6).fill(".").map(() => new Array(40).fill(" "));

	let cycle = 1;
	let register = 1;
	for (line of lines) {
		if (line == "noop") {
			screen = updateScreen(cycle, register, screen);
			cycle++;
		} else {
			const value = Number(line.split(" ")[1]);

			for (let loop = 0; loop < 2; loop++) {
				screen = updateScreen(cycle, register, screen);
				cycle++;
			}
			register += value;
		}
	}

	screen.forEach((row) => console.log(row.join("")));
	return screen; //RJERPEFC;
}

function updateScreen(cycle, register, screen) {
	const row = parseInt((cycle - 1) / 40);
	const col = (cycle - 1) % 40;

	if ([register - 1, register, register + 1].includes(col)) {
		screen[row][col] = "#";
	} else {
		screen[row][col] = ".";
	}

	return screen;
}

module.exports = { solveForFirstStar, solveForSecondStar };
