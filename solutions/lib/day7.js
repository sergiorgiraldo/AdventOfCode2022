const helpers = require("./helpers");

function solveForFirstStar(lines) {
	const [rootNode, _] = buildFileSystem(lines);

	return sumOfDirectorySizeLessThanThreshold(rootNode, 100_000, 0);
}

function solveForSecondStar(lines) {
	const [rootNode, totalSize] = buildFileSystem(lines);

	const totalSpace = 70_000_000;
	const freeSpaceNeeded = 30_000_000;
	const currentlyFreeSpace = totalSpace - totalSize;
	const moreSpaceNeeded = freeSpaceNeeded - currentlyFreeSpace;

	return findSmallestDirectoryGreaterThanSize(rootNode, null, moreSpaceNeeded).size;
}

class Node {
	name = "";
	parent = null;

	isDirectory = true;
	size = 0;
	children = {};

	Node() {}
}

function buildFileSystem(commands) {
	const rootNode = new Node();
	rootNode.name = "/";
	rootNode.isDirectory = true;

	let currentPosition = rootNode;

	for (let command of commands) {
		if (command.charAt(0) === "$") {
			currentPosition = processCommand(command, rootNode, currentPosition);
		} 
		else {
			processFile(command, currentPosition);
		}
	}
	const totalSize = updateDirectorySize(rootNode);

	return [rootNode, totalSize];
}

function processCommand(command, rootNode, currentPosition) {
	let newCurrentPosition = currentPosition;

	const [_, name, args] = command.split(" ");

	if (name === "cd") {
		if (args === "..") {
			newCurrentPosition = currentPosition.parent;
		} 
		else if (args === "/") {
			newCurrentPosition = rootNode;
		} 
		else {
			if (currentPosition.children[args]) {
				newCurrentPosition = currentPosition.children[args];
			}
		}
	} 
	else if (name === "ls") {
	}

	return newCurrentPosition;
}

function processFile(command, currentPosition) {
	const [attr, name] = command.split(" ");

	if (!currentPosition.children[name]) {
		const newNode = new Node();
		newNode.name = name;
		newNode.parent = currentPosition;
		currentPosition.children[name] = newNode;

		if (attr === "dir") {
			newNode.isDirectory = true;
		} 
		else {
			newNode.isDirectory = false;
			newNode.size = +attr;
		}
	}
}

function updateDirectorySize(node) {
	if (!node.isDirectory) {
		return node.size;
	}

	let subSize = Object.values(node.children).reduce((acc, child) => acc + updateDirectorySize(child), 0);

	node.size = subSize;
	return subSize;
}

function sumOfDirectorySizeLessThanThreshold(node, threshold, totalSize) {
	if (!node.isDirectory) {
		return totalSize;
	}

	totalSize = Object.values(node.children).reduce((acc, child) =>
			sumOfDirectorySizeLessThanThreshold(child, threshold, acc), totalSize);

	if (node.size <= threshold) {
		return node.size + totalSize;
	}

	return totalSize;
}

function findSmallestDirectoryGreaterThanSize(node, candidateNode, targetSize) {
	if (!node.isDirectory) {
		return candidateNode;
	}

	for (let child of Object.values(node.children)) {
		candidateNode = findSmallestDirectoryGreaterThanSize(child, candidateNode, targetSize);
	}

	if (node.size < targetSize) {
		return candidateNode;
	}

	if (!candidateNode || node.size <= candidateNode.size) {
		return node;
	}

	return candidateNode;
}

module.exports = { solveForFirstStar, solveForSecondStar };
