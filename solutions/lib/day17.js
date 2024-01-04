const helpers = require("./helpers");

//encode rocks in binary
//so the first rock is 60 => 0b111100
const ROCKS = [
	["  #### "],
   
	["   #   ", 
	 "  ###  ", 
	 "   #   "],
  
	["    #  ",
	 "    #  ",
	 "  ###  "],
   
	["  #    ",
	 "  #    ",
	 "  #    ",
	 "  #    "],
  
	["  ##   ",
	 "  ##   "]
].map((rock) => 
	rock
		.map(([...bits]) =>
			bits
				.map((b, i) => (b === "#" ? 1 << (7 - i) : 0))
				.reduce((or, bit) => or | bit)
		)
		.concat([0, 0, 0,])
);

//since rocks are binary encoded, they can be moved left and right by shifting by 1
const directions = {
	"<": (r) => r << 1,
	">": (r) => r >> 1
};

function solveForFirstStar(lines) {
	let input = lines.map((line) => line.split(""))[0];
	return solve(input, 2022);
}

function solveForSecondStar(lines) {
	let input = lines.map((line) => line.split(""))[0];
	return solve(input, 1_000_000_000_000);
}

function solve(input, count) {
	helpers.dbg("ROCKS", ROCKS);
	let chamber = [0b111111111];
	const lengths = [];
	let lastLength = 0;
	let rocks = 0;
	let w = 0;

	while (rocks < count) {
		let rock = ROCKS[rocks % ROCKS.length];
		// add space to chamber
		rock.map((_) => 0b100000001).forEach((l) => chamber.unshift(l));
		if (rocks < 2) {
			helpers.dbg("rock",rock,"chamber",chamber);
			helpers.dbg("rock << 1",rock << 1);
			helpers.dbg("rock >> 1",rock >> 1)
		}
		let landed = false;
		let h = 0;
		while (!landed) {
			const move = directions[input[w++ % input.length]];
			// check if clear to move
			if (!rock.some((r, i) => chamber[h + i] & move(r))) {
				rock = rock.map(move);
			}
			// check if collision one line down
			if (rock.some((r, i) => chamber[h + i + 1] & r)) {
				rock.forEach(
					(r, i) => h + i < chamber.length && (chamber[h + i] |= r)
				);
				landed = true;
			}
			h++;
		}

		// Trim the top
		chamber = chamber.slice(chamber.findIndex((r) => r !== 0b100000001));
		// Keep track of chamber length deltas
		lengths.push(chamber.length - 1 - lastLength);
		lastLength = chamber.length - 1;

		// Some arbitrary value for part 2, not too high, not too low
		if (rocks > 5000) {
			helpers.dbg("lengths", lengths);
			// Find longest sequence and its pattern
			const [sequence, seqIndex] = findSequence(lengths);
			helpers.dbg("sequence",sequence,"seqIndex", seqIndex);
			const pattern = findPattern(sequence);
			helpers.dbg("pattern", pattern);
			const patternHeight = pattern.reduce((s, v) => s + v);
			const repetitions = Math.trunc((count - seqIndex) / pattern.length);
			const rocksPostSeq = (count - seqIndex) % pattern.length;
			const preAndPostSeqHeight = pattern
				.slice(0, rocksPostSeq)
				.concat(lengths.slice(0, seqIndex))
				.reduce((s, v) => s + v);
			return preAndPostSeqHeight + repetitions * patternHeight;
		}
		rocks++;
	}
	return lastLength;
}
/*
initialize an array 2d (dp) with the length of the original array and fill it with 0
for each element in the original array, go forward and see if it can find it again.
if it does, update the dp incrementing the index from the upper left diagonal, it means that I found a repetition in the
previous position. example:
suppose i have this dp array after the iteration at index 4 and I found a repetition at index 4. Since the diagonal is 0
update with 1

0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - (0) - 0 - 0 - 0
0 - 0 - 0 - 0 - 1 - 0 - 0 <-
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0

the next iteration, i find a repetition at index 5
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 1 - 0 - 0 
0 - 0 - 0 - 0 - 0 - # - 0 <-
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0

the dp array will be
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 1 - 0 - 0
0 - 0 - 0 - 0 - 0 - 2 - 0 <-
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
0 - 0 - 0 - 0 - 0 - 0 - 0
*/ 
const findSequence = (arr) => {
	const dp = Array.from({ length: arr.length + 1 }).map((_) =>
		Array(arr.length + 1).fill(0)
	);
	helpers.dbg("FindSequence", dp.length, dp[0].length);
	let seqLength = 0;
	let index = 0;
	arr.forEach((a, i) => {
		for (let j = i + 2; j <= arr.length; j++) {
			if (a === arr[j - 1] && dp[i][j - 1] < j - i) {
				dp[i + 1][j] = dp[i][j - 1] + 1;
				if (dp[i + 1][j] > seqLength) {
					seqLength = dp[i + 1][j];
					index = Math.max(i + 1, index);
				}
			} else {
				dp[i + 1][j] = 0;
			}
		}
	});
	return [arr.slice(index - seqLength, index), index - seqLength];
};

const findPattern = (arr) => {
	const dp = arr.map((_) => 0);
	for (let i = 1; i < dp.length; i++) {
		let k = dp[i - 1];
		let done = false;
		while (!done) {
			if (arr[i] === arr[k]) {
				dp[i] = k + 1;
				done = true;
			} else if (k === 0) {
				dp[i] = 0;
				done = true;
			} else {
				k = dp[k - 1];
			}
		}
	}
	return arr.slice(0, arr.length - dp.at(-1));
};

module.exports = { solveForFirstStar, solveForSecondStar };
