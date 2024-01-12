const path_c = require("path");
const open_c = require("open");
const { make: make_c, position: position_c, find: find_c, read: read_c, write: write_c, run: run_c } = require("promise-path");
const fromHere_c = position_c(__dirname);
const report = (...messages) =>
	console.log(
		`[${require(fromHere_c("./package.json")).logName} / ${__filename
			.split(path_c.sep)
			.pop()
			.split(".js")
			.shift()}]`,
		...messages
	);
const fs_c = require("fs");
const toTitleCase = (str) => {
	return str.replace(
	  /\w\S*/g,
	  function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	);
  }

async function fetchAOCDInput(currentYear, currentDay) {
	report(
		"Using AOCD to attempt to download your puzzle input, see: https://github.com/wimglenn/advent-of-code-data"
	);
	try {
		const { stdout, stderr } = await run_c(
			`aocd ${currentDay} ${currentYear}`
		);
		if (stderr) {
			report(`Could not fetch input for ${currentYear} / ${currentDay}`);
		}
		if (stdout) {
			report(`Downloaded using AOCD.`);
		}
		return stdout;
	} catch (ex) {
		report(`Could not fetch input for ${currentYear} / ${currentDay}`);
	}
	return "PASTE YOUR INPUT HERE";
}

async function fetchAOCDInputTest(currentYear, currentDay) {
	report(
		"Using AOCD to attempt to download your puzzle input, see: https://github.com/wimglenn/advent-of-code-data"
	);
	try {
		const { stdout, stderr } = await run_c(
			`aocd ${currentDay} ${currentYear} --example`
		);
		if (stderr) {
			report(`Could not fetch input for ${currentYear} / ${currentDay}`);
		}
		if (stdout) {
			report(`Downloaded using AOCD.`);
		}
		return stdout;
	} catch (ex) {
		report(`Could not fetch input for ${currentYear} / ${currentDay}`);
	}
	return "PASTE YOUR INPUT HERE";
}

async function copyTemplate() {
	const newFolderName = process.argv[2];
	const templateFolderPath = "template";
	const targetFolderPath = fromHere_c(`solutions/${newFolderName}`);

	if (!newFolderName) {
		return report(
			"No path specified to copy to.",
			"Please specify a folder name as an argument to this script.",
			"e.g. node copy-template day5"
		);
	}

	const existingFiles = await find_c(`${targetFolderPath}/*`);
	if (existingFiles.length > 0) {
		report("Existing files found:");
		console.log(existingFiles.map((n) => "  " + n).join("\n"));
		return report("Path", newFolderName, "already exists, doing nothing.");
	}

	report(
		"Creating:",
		`solutions/${newFolderName}`,
		"from template",
		templateFolderPath
	);

	const templateFiles = await find_c(fromHere_c(`${templateFolderPath}/*`));
	await make_c(fromHere_c(`solutions/${newFolderName}`));
	await Promise.all(
		templateFiles.map(async (filepath) => {
			const contents = await read_c(filepath);
			const filename = path_c.parse(filepath).base;
			const newFilePath = `solutions/${newFolderName}/${filename}`;
			report("Creating:", newFilePath);
			return write_c(fromHere_c(newFilePath), contents);
		})
	);

	const answerPath = fromHere_c(`solutions/${newFolderName}/answer.txt`);
	report("Creating:", answerPath);
	write_c(answerPath, "TODO");

	const libsPath = fromHere_c(`solutions/lib/${newFolderName}.ts`);
	report("Creating:", libsPath);
	write_c(
		libsPath,
`
class ${toTitleCase(newFolderName)} {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		return 0;
	}

	public solveForSecondStar(lines:string[]) {
		return 0;
	}
}

export default ${toTitleCase(newFolderName)};
`
	);

	const solutionsJsPath_ = fromHere_c(`solutions/${newFolderName}/solution.ts.template`);
	const solutionsJsPath = fromHere_c(`solutions/${newFolderName}/solution.ts`);
	fs_c.renameSync(solutionsJsPath_, solutionsJsPath);

	fs_c.readFile(solutionsJsPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const updatedData = data.replace(
			/TODO/g,
			Number.parseInt(newFolderName.replace("day", "")).toString()
		);

		fs_c.writeFile(solutionsJsPath, updatedData, "utf8", (err) => {
			if (err) {
				throw err;
			}

			report("Adjusting:", solutionsJsPath);
		});
	});

	const viewerPath = fromHere_c(`solutions/${newFolderName}/viewer.html`);
	fs_c.readFile(viewerPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const updatedData = data.replace(
			/TODO/g,
			Number.parseInt(newFolderName.replace("day", "")).toString()
		);

		fs_c.writeFile(viewerPath, updatedData, "utf8", (err) => {
			if (err) {
				throw err;
			}

			report("Adjusting:", viewerPath);
		});
	});

	report("Attemping to download puzzle input for this date");

	const currentPath = fromHere_c("/");
	const currentFolder = currentPath.split("/").reverse()[1];
	const currentYear = currentFolder.slice(-4);
	const currentDay = Number.parseInt(newFolderName.replace("day", ""));

	report(
		`Based on the path, ${currentFolder} I think its: ${currentYear}, and you're trying to solve: Day ${currentDay}`
	);

	if (currentYear > 0 && currentDay > 0) {
		report(`Potentially valid year (${currentYear}) / day (${currentDay})`);
		const aocInputText = await fetchAOCDInput(currentYear, currentDay);
		await write_c(
			fromHere_c(`solutions/${newFolderName}/input.txt`),
			aocInputText,
			"utf8"
		);

		const aocInputTestText = await fetchAOCDInputTest(currentYear, currentDay);
		const lines = aocInputTestText.split("\n");
		let firstBlock = false, secondBlock = false;
		let firstBlockLines = "", secondBlockAnswer = "";
		for (const line of lines) {
			if (line.startsWith("-------------------------------")) {
				if (!firstBlock) {
					firstBlock = true;
				} else if (!secondBlock) {
					firstBlock = false;
					secondBlock = true;
				}
				continue;
			}
			else{
				if (firstBlock){
					firstBlockLines += "lines.push(\"" + line + "\");" + "\n";
				}
				else if (secondBlock){
					secondBlockAnswer = line.split(": ")[1];
					break;
				}
			}
		}

		const testPath = fromHere_c(`__tests__/${newFolderName}.ts`);
		report("Creating:", testPath);
		write_c(
			testPath,
	`
	import { expect, test } from "@jest/globals";
	import ${toTitleCase(newFolderName)} from "../solutions/lib/${newFolderName}";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		const lib = new ${toTitleCase(newFolderName)}();
	
		let lines:string[] = [];
		${firstBlockLines}
		expect(lib.solveForFirstStar(lines)).toBe(${secondBlockAnswer});
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new ${toTitleCase(newFolderName)}();
	
		let lines:string[] = [];
		${firstBlockLines}
		expect(lib.solveForSecondStar(lines)).toBe(-2);
	});
	`
		);


	} else {
		report(`Invalid year (${currentYear}) / day (${currentDay})`);
	}
	report("Opening puzzle of the day");
	report("Done.");
	
	open_c(`https://adventofcode.com/${currentYear}/day/${currentDay}`);
}

module.exports = copyTemplate();
