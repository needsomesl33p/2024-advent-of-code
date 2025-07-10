import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function isIncreasing(first: number, second: number) {
    return first < second;
}

function isCorrectDiffering(first: number, second: number) {
    return first + 4 > second;
}

function isSafe(level: string[]) {
    for (let idx = 0; idx < level.length - 1; idx++) {
        const isIncreased: boolean = isIncreasing(Number(level[idx]), Number(level[idx + 1]));
        const isCorrectDiffer: boolean = isCorrectDiffering(Number(level[idx]), Number(level[idx + 1]));
        if (!(isIncreased && isCorrectDiffer)) {
            return false;
        }
    };
    return true;
}

async function main() {
    const inputs: string = await readInput("input.txt");
    const reports: string[] = inputs.split("\n");
    let safeLevelNumber: number = 0;

    reports.forEach((report: string) => {
        const level: string[] = report.split(" ");
        if (!isIncreasing(Number(level[0]), Number(level[1]))) {
            level.reverse();
        };
        console.log(level);
        safeLevelNumber = isSafe(level) ? safeLevelNumber + 1 : safeLevelNumber;

    });

    console.log(safeLevelNumber);
}

main();

