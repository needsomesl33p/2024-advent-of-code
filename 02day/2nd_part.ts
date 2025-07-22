import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function isIncreasing(first: number, second: number): boolean {
    return first < second;
}

function isCorrectDiffering(first: number, second: number): boolean {
    return first + 4 > second;
}

function isSafe(level: string[]): boolean {
    for (let idx = 0; idx < level.length - 1; idx++) {
        const isIncreased: boolean = isIncreasing(Number(level[idx]), Number(level[idx + 1]));
        const isCorrectDiffer: boolean = isCorrectDiffering(Number(level[idx]), Number(level[idx + 1]));
        if (!(isIncreased && isCorrectDiffer)) {
            return false;
        }
    }
    return true;
}

function isProblemDampenerOK(level: string[]): boolean {
    for (let idx = 0; idx < level.length; idx++) {
        const reducedLevel: string[] = [...level];
        reducedLevel.splice(idx, 1);
        !isIncreasing(Number(reducedLevel[0]), Number(reducedLevel[1])) ? reducedLevel.reverse() : "";
        if (isSafe(reducedLevel)) {
            return true;
        }
    }
    return false;

}

async function main() {
    const inputs: string = await readInput("input.txt");
    const reports: string[] = inputs.split("\n");
    let safeLevelNumber: number = 0;

    reports.forEach((report: string) => {
        const level: string[] = report.split(" ");
        const secondLevel: string[] = [...level];
        !isIncreasing(Number(level[0]), Number(level[1])) ? level.reverse() : "";

        if (isSafe(level)) {
            safeLevelNumber += 1;
        } else {
            safeLevelNumber = isProblemDampenerOK(secondLevel) ? safeLevelNumber + 1 : safeLevelNumber;
        }
    });

    console.log(safeLevelNumber);
}

main();