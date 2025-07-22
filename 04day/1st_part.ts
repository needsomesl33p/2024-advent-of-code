import { promises as fs } from "fs";

const MAGICWORD: string = "XMAS";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function reverseWords(str: string): string {
    const words = str.split("");
    const reversedWords = words.reverse();
    return reversedWords.join("").trim();
}

function evalString(section: string): number {
    return section == MAGICWORD || reverseWords(section) == MAGICWORD ? 1 : 0;
}

function horizontalSearch(row: string, position: number): number {
    if (position > row.length - MAGICWORD.length) {
        return 0;
    }
    const section = row.substring(position, position + MAGICWORD.length);
    return evalString(section);
}

function verticalSearch(rowNumber: number, position: number, input: string[]): number {

    if (input.length - MAGICWORD.length < rowNumber) {
        return 0;
    }
    const section = getVerticalString(rowNumber, position, input);
    return evalString(section);
}

function getVerticalString(rowNumber: number, position: number, input: string[]): string {
    const letters: string[] = [];
    for (let idx = rowNumber; idx < MAGICWORD.length + rowNumber; idx++) {
        letters.push(input[idx][position]);
    }
    return letters.join("");
}

function crossSearch(rowNumber: number, position: number, input: string[]): number {
    const horizontalStopPoint = position > input[rowNumber].length - MAGICWORD.length
    const verticalStopPoint = input.length - MAGICWORD.length < rowNumber
    if (horizontalStopPoint || verticalStopPoint) {
        return 0;
    }
    const section = getCrossString(rowNumber, position, input);
    return evalString(section);
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

function mirrorMatrix(rows: string[]): string[] {
    const matrix: string[] = [];
    for (const row of rows) {
        matrix.push(reverseWords(row));
    }
    return matrix;
}

async function main() {
    let result: number = 0;
    const inputs: string = await readInput("input.txt");
    const rows: string[] = inputs.split("\n");
    let rowNumber: number = 0;
    for (let row of rows) {
        for (let position = 0; position < row.length; position++) {
            result += horizontalSearch(row, position);
            result += verticalSearch(rowNumber, position, rows);
            result += crossSearch(rowNumber, position, rows);
        }
        rowNumber++;
    }
    const mirroredMatrix: string[] = mirrorMatrix(rows);
    rowNumber = 0;
    for (let row of mirroredMatrix) {
        for (let position = 0; position < row.length; position++) {
            result += crossSearch(rowNumber, position, mirroredMatrix);
        }
        rowNumber++;
    }
    console.log(result);
}

main();