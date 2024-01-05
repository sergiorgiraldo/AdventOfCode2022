const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const monkeyJobs = parse(lines);
	helpers.dbg(JSON.stringify([...monkeyJobs], null, 2));
	const result = doMonkeyJob("root", monkeyJobs);

	return result;
}

function solveForSecondStar(lines) {
	const monkeyJobs = parse(lines);

	// Find which operand is affected by the human yell
	let rootJob = monkeyJobs.get("root");
	let target;
	let humanAffectedOperand;

	if (!usesHumanYell(rootJob.operand1, monkeyJobs)) {
		target = doMonkeyJob(rootJob.operand1, monkeyJobs);
		humanAffectedOperand = rootJob.operand2;
	} else {
		target = doMonkeyJob(rootJob.operand2, monkeyJobs);
		humanAffectedOperand = rootJob.operand1;
	}
	helpers.dbg(`target: ${target} hummanAffectedOperand: ${humanAffectedOperand}`);
	// Find the correlation of the human yell to the affected operand
	monkeyJobs.set("humn", {
		type: "yell",
		number: 0
	});
	let evaluated = doMonkeyJob(humanAffectedOperand, monkeyJobs);

	monkeyJobs.set("humn", {
		type: "yell",
		number: 1
	});
	let evaluated2 = doMonkeyJob(humanAffectedOperand, monkeyJobs);

	let correlation = evaluated < evaluated2 ? 1 : -1;

	// Find the number that will make the human yell equal to the target
	let increment = 100000000000000;
	let currNum = 0;
	let wasUnderTarget = true;
	while (doMonkeyJob(humanAffectedOperand, monkeyJobs) !== target) {
		let evaluated = doMonkeyJob(humanAffectedOperand, monkeyJobs);

		if (evaluated > target) {
			if (wasUnderTarget) increment /= 10;
			wasUnderTarget = false;
			currNum -= increment * correlation;
		}
		if (evaluated < target) {
			if (!wasUnderTarget) increment /= 10;
			wasUnderTarget = true;
			currNum += increment * correlation;
		}

		monkeyJobs.set("humn", {
			type: "yell",
			number: currNum
		});
	}

	return monkeyJobs.get("humn").number;
}

function parse(lines) {
	let monkeyJobs = new Map();

	lines.map((line) => {
		const split = line.split(": ");

		const monkey = split[0];

		const job = split[1].split(" ");

		if (job.length == 3) {
			const operand1 = job[0];
			const operator = job[1];
			const operand2 = job[2];

			monkeyJobs.set(monkey, {
				type: "operation",
				operand1,
				operator,
				operand2
			});
		} else {
			const number = parseInt(job[0], 10);

			monkeyJobs.set(monkey, {
				type: "yell",
				number
			});
		}
	});

	return monkeyJobs;
}

function doMonkeyJob(monkey, monkeyJobs) {
	const job = monkeyJobs.get(monkey);

	if (job.type === "yell") return job.number;

	const operand1 = doMonkeyJob(job.operand1, monkeyJobs);
	const operand2 = doMonkeyJob(job.operand2, monkeyJobs);

	return eval(`${operand1} ${job.operator} ${operand2}`);
}

function usesHumanYell(monkey, monkeyJobs) {
	const job = monkeyJobs.get(monkey);
	if (job.type === "yell") return false;
	if (job.operand1 === "humn") return true;
	if (job.operand2 === "humn") return true;

	return usesHumanYell(job.operand1, monkeyJobs) || usesHumanYell(job.operand2, monkeyJobs);
}

module.exports = { solveForFirstStar, solveForSecondStar };
