import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function getSegmentByRegex(regexPattern: string, flags: string, searchString: string) {
    const regex = new RegExp(regexPattern, flags);
    return searchString.match(regex);
}

async function main() {
    let result: number = 0;
    const inputs: string = await readInput("input.txt");
    const memory: string[] = inputs.split("\n");
    const mergedMemory = "".concat(...memory);
    const firstSegment = getSegmentByRegex("(.+?)don't\\(\\)", "i", mergedMemory);
    const enabledSegments: string[] = getSegmentByRegex("do\\(\\)(.+?)don't\\(\\)", "ig", mergedMemory)
    const lastSegmentAddr: number = mergedMemory.lastIndexOf("do()");
    const lastSegment: string = mergedMemory.slice(lastSegmentAddr,);
    const mergedSegments = [firstSegment[0], ...enabledSegments, lastSegment];
    for (let enabledSegment of mergedSegments) {
        const instructions: string[] = getSegmentByRegex("mul\\([0-9]+,[0-9]+\\)", "gi", enabledSegment);
        if (instructions) {
            for (let inst of instructions) {
                const numbers: string[] = getSegmentByRegex("[0-9]+", "gi", inst);
                result += Number(numbers[0]) * Number(numbers[1]);
            }
        }
    }
    console.log(result);
}

main();