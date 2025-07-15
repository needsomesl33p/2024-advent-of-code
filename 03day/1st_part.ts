import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

async function main() {
    const inputs: string = await readInput("input.txt");
    const memory: string[] = inputs.split("\n");
    let result: number = 0;
    for (let segment of memory) {
        const regex = new RegExp("mul\\([0-9]+,[0-9]+\\)", "gi");
        const instructions: string[] = segment.match(regex);
        console.log(instructions);
        for (let inst of instructions) {
            const numberRegex = new RegExp("[0-9]+", "gi");
            const numbers: string[] = inst.match(numberRegex);
            result += Number(numbers[0]) * Number(numbers[1]);
        }
    }

    console.log(result);
}

main();