const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const msg = getMsg(lines);
	
	const newMsg = moveAround(msg);
	
	const indexOfZeroValue = newMsg.findIndex((element) => element[1] === 0);

    return 	newMsg[(indexOfZeroValue + 1000) % msg.length][1] + 
			newMsg[(indexOfZeroValue + 2000) % msg.length][1] + 
			newMsg[(indexOfZeroValue + 3000) % msg.length][1];
}

function solveForSecondStar(lines) {
	const msg = getMsg(lines, 811589153);
	
	const newMsg = moveAround(msg, 10);
	
	const indexOfZeroValue = newMsg.findIndex((element) => element[1] === 0);

    return 	newMsg[(indexOfZeroValue + 1000) % msg.length][1] + 
			newMsg[(indexOfZeroValue + 2000) % msg.length][1] + 
			newMsg[(indexOfZeroValue + 3000) % msg.length][1];
}

function getMsg(lines, decryption_key = 1) {
	const input = lines.map(Number);

	let msg = [];

	input.map((val, index) => msg.push([index, val * decryption_key]));
	
	return msg;
}

function moveAround(msg, shuffles = 1) {
	const size = msg.length;

	// Make a copy of the input array so that we don't mutate the original
	// array because we need it for reference to move the numbers around
	// in the right order
	let shuffled = msg.slice();

	while (shuffles > 0) {
		for (let i = 0; i < size; i++) {
			let [index, instruction] = msg[i];

			// find the index of the sub-array in shuffled with the same index as the current instruction
			const instructionIndex = shuffled.findIndex((element) => element[0] === index);

			// Instead of actually moving the number billions of times, we can just
			// calculate the final index of the number by taking the modulus of the
			// size of the array. This is because the array is circular. But we need
			// to make sure that we account for the fact that the number we are moving
			// doesn't count as a step and therefore we need to subtract 1 from array size
			// before taking the modulus.
			instruction = instruction % (size - 1);

			let newIndex = instructionIndex + instruction;

			//check if passed the boundaries
			if (newIndex >= size) {
				newIndex = newIndex - size + 1;
			} else if (newIndex <= 0) {
				newIndex = size + newIndex - 1;
			}

			// Lift item from array
			let [removed] = shuffled.splice(instructionIndex, 1);

			// Splice it back in at the new index
			shuffled.splice(newIndex, 0, removed);
		}
		shuffles--;
	}
	return shuffled;
}

module.exports = { solveForFirstStar, solveForSecondStar };
