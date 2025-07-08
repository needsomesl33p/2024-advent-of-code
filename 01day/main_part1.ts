import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}


function accumulate(diffies: number[]): number {
    let result: number = 0;
    for (let numb of diffies) {
        result = numb > 0 ? result + numb : result + numb * -1;
    }
    return result;

}

async function main() {
    const inputs: string = await readInput("input.txt");
    const lines: string[] = inputs.split("\n");
    const leftList: number[] = [];
    const rightList: number[] = [];
    const diffies: number[] = [];

    lines.forEach((value: string) => {
        const locationId = value.split("   ");
        leftList.push(Number(locationId[0]));
        rightList.push(Number(locationId[1]));
    });

    leftList.sort();
    rightList.sort();

    for (let idx = 0; idx < leftList.length; idx++) {
        diffies.push(rightList[idx] - leftList[idx]);
    }

    console.log(accumulate(diffies));

}

main();

