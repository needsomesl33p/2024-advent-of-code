"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
async function readInput(fileName) {
    return await fs_1.promises.readFile(fileName, "utf8");
}
function isIncreasing(first, second) {
    return first < second;
}
function isCorrectDiffering(first, second) {
    return first + 4 > second;
}
function isSafe(level) {
    for (let idx = 0; idx < level.length - 1; idx++) {
        const isIncreased = isIncreasing(Number(level[idx]), Number(level[idx + 1]));
        const isCorrectDiffer = isCorrectDiffering(Number(level[idx]), Number(level[idx + 1]));
        if (!(isIncreased && isCorrectDiffer)) {
            return false;
        }
    }
    ;
    return true;
}
async function main() {
    const inputs = await readInput("input.txt");
    const reports = inputs.split("\n");
    let safeLevelNumber = 0;
    reports.forEach((report) => {
        const level = report.split(" ");
        if (!isIncreasing(Number(level[0]), Number(level[1]))) {
            level.reverse();
        }
        ;
        console.log(level);
        safeLevelNumber = isSafe(level) ? safeLevelNumber + 1 : safeLevelNumber;
    });
    console.log(safeLevelNumber);
}
main();
