const helpers = require("../solutions/lib/helpers.js");
const findSequence = (arr) => {
    helpers.clearDebug();
	const dp = Array.from({ length: arr.length + 1 }).map((_) =>
		Array(arr.length + 1).fill(0)
	);

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
        console.log("<<<<<<<< item <" + a + "< - index <" + i + " >>>>>>>>>>>>")
        for (let i = 0; i < dp.length; i++) {
            console.log(dp[i].join(" - "));
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

// let arr1 = [1,7,8,9,7,8,9,7];
// const res1 = findSequence(arr1);
// console.log(findPattern(res1[0]));

let arr2 = [1,6,7,2,2,3,4,3,4,3,4,3,4,3,4,3,4,5];
const res2 = findSequence(arr2);
console.log(res2);
console.log(findPattern(res2[0]));