import { promises as fs } from "fs";

const MAGICWORD: string = "MAS";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function reverseWords(str: string): string {
    const words = str.split("");
    const reversedWords = words.reverse();
    return reversedWords.join("").trim();
}

function isMagicWord(section: string): boolean {
    return section == MAGICWORD || reverseWords(section) == MAGICWORD ? true : false;
}


function isMagicFound(rowNumber: number, position: number, input: string[]): boolean {
    const horizontalStopPoint = position > input[rowNumber].length - MAGICWORD.length
    const verticalStopPoint = input.length - MAGICWORD.length < rowNumber
    if (horizontalStopPoint || verticalStopPoint) {
        return false;
    }
    const section = getCrossString(rowNumber, position, input);
    return isMagicWord(section);
}

function getCrossString(rowNumber: number, position: number, input: string[]): string {
    const letters: string[] = [];
    let inc: number = 0;
    for (let idx = position; idx < MAGICWORD.length + position; idx++) {
        letters.push(input[rowNumber][position + inc]);
        inc++;
        rowNumber++;
    }
    return letters.join("");
}

function getAdjacentString(x: number, y: number, matrix: string[]): string {
    return matrix[y][x + 2] + "A" + matrix[y + 2][x]

}

async function main() {
    let result: number = 0;
    let rowNumber: number = 0;
    const coordinates: number[][] = [];
    const inputs: string = await readInput("input.txt");
    const rows: string[] = inputs.split("\n");
    for (let row of rows) {
        for (let position = 0; position < row.length; position++) {
            const isMagic = isMagicFound(rowNumber, position, rows);
            if (isMagic) {
                const adjacentString = getAdjacentString(position, rowNumber, rows);
                const isAdjacentMagic = isMagicWord(adjacentString);
                if (isAdjacentMagic) {
                    result++
                }
            }
        }
        rowNumber++;
    }
    console.log(result);
}

main();