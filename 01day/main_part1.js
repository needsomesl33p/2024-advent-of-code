"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
async function readInput(fileName) {
    return await fs_1.promises.readFile(fileName, "utf8");
}
function accumulate(diffies) {
    let result = 0;
    for (let numb of diffies) {
        result = numb > 0 ? result + numb : result + numb * -1;
    }
    return result;
}
async function main() {
    const inputs = await readInput("input.txt");
    const lines = inputs.split("\n");
    const leftList = [];
    const rightList = [];
    const diffies = [];
    lines.forEach((value) => {
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
