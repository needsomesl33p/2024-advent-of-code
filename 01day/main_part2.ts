import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function countSimilarityScore(locationId: number, rightList: number[]) {
    let counter: number = 0;
    rightList.forEach((value) => {
        counter = locationId == value ? counter + 1 : counter;
    });

    return locationId * counter;
}

async function main() {
    const inputs: string = await readInput("input.txt");
    const lines: string[] = inputs.split("\n");
    const leftList: number[] = [];
    const rightList: number[] = [];
    let result: number = 0;

    lines.forEach((value: string) => {
        const locationId = value.split("   ");
        leftList.push(Number(locationId[0]));
        rightList.push(Number(locationId[1]));
    });

    leftList.forEach((locationId) => {
        result += countSimilarityScore(locationId, rightList);
    });

    console.log(result);
}

main();
