const helpers = require("./helpers");

function solveForFirstStar(lines) {
	let total = 0;

	lines.map((line) => (total += snafuToDecimal(line)));

	const output = decimalToSnafu(total);

	return output;
}

function solveForSecondStar(lines) {
	return 0;
}

// Convert from decimal to SNAFU
function decimalToSnafu(decimalNumber) {
	// Find the highest power of 5 that does not exceed the size of the number being converted.
	// This is how many base 5 digits there will be.
	let highestPower = 0;
	while (decimalNumber > Math.pow(5, highestPower + 1)) {
		highestPower++;
	}

	// Starting with the largest power of 5 reduce the number by dividing by 5 for each base
	// 5 digit from largets to smallest and reducing the number by the modules 5. This converts
	// the number to base 5.
	let remaining = decimalNumber;
	let digits = [];
	for (let d = highestPower; d >= 0; d--) {
		let divisor = Math.pow(5, d);
		let div = Math.floor(remaining / divisor);
		let mod = remaining % divisor;

		digits.push(div);

		remaining = mod;
	}

	let convertedToSnafu = [];
	for (let d = digits.length - 1; d >= 0; d--) {
		let digit = digits[d];

		// If the digit is greater than or equal to 5 pass up the result of the division and
		// convert the remainder to be the new digits.
		if (digit >= 5) {
			digits[d - 1] += Math.floor(digit / 5);
			digit = digit % 5;
		}

		// The digit is now guaranteed to be 0-4. for 0-2 add the digit to the output.
		// For 3 and 4 since they add one to the next digit add one to the next highest
		// place digit in the array and append = or - respectively.
		switch (digit) {
			case 0:
				convertedToSnafu.unshift("0");
				break;
			case 1:
				convertedToSnafu.unshift("1");
				break;
			case 2:
				convertedToSnafu.unshift("2");
				break;
			case 3:
				convertedToSnafu.unshift("=");
				digits[d - 1] += 1;
				break;
			case 4:
				convertedToSnafu.unshift("-");
				digits[d - 1] += 1;
				break;
		}
	}

	return convertedToSnafu.join("");
}

function snafuToDecimal(snafuNumber) {
	let chars = snafuNumber.split("");

	let convertedToDecimal = 0;

	chars.map((char, index) =>{
		let val;
		switch (char) {
			case "2":
				val = 2;
				break;
			case "1":
				val = 1;
				break;
			case "0":
				val = 0;
				break;
			case "-":
				val = -1;
				break;
			case "=":
				val = -2;
				break;
		}

		convertedToDecimal += val * Math.pow(5, chars.length - (index + 1));
	});

	return convertedToDecimal;
}

module.exports = { solveForFirstStar, solveForSecondStar };
