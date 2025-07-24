import { promises as fs } from "fs";

async function readInput(fileName: string): Promise<string> {
    return await fs.readFile(fileName, "utf8");
}

function genRules(update: string[]) {
    const ruleList: string[] = [];

    for (let idx = 0; idx < update.length; idx++) {
        for (let j = idx + 1; j < update.length; j++) {
            ruleList.push(`${update[idx]}|${update[j]}`)
        }
    }
    return ruleList;
}

function isOrderOK(rules: string[], rulesOfOrders: string[]) {
    for (const item of rulesOfOrders) {
        if (!rules.includes(item)) {
            return false;
        }
    }
    return true;
}

function correctPageOrder(pages: string[], rules: string[]) {
    for (let idx = 0; idx < pages.length - 1; idx++) {
        const implodedOrd: string = `${pages[idx]}|${pages[idx + 1]}`;
        if (!rules.includes(implodedOrd)) {
            pages[idx] = pages.splice(idx + 1, 1, pages[idx])[0];
            idx = -1; // :DDDDDD
        }
    }
}

function addUpMiddles(updates: string[][]) {
    let result: number = 0;
    for (const update of updates) {
        const index: number = Math.floor(update.length / 2);
        const value = update[index];
        result += Number(value);
    }
    return result;
}

async function main() {
    const trueUpdates: string[][] = [];
    const input: string = await readInput("input.txt");
    const parts: string[] = input.split("\n\n");
    const rules: string[] = parts[0].split('\n');
    const updates: string[] = parts[1].split("\n");

    for (const update of updates) {
        const pages: string[] = update.split(",");
        const rulesOfOrders: string[] = genRules(pages);
        if (!isOrderOK(rules, rulesOfOrders)) {
            correctPageOrder(pages, rules);
            trueUpdates.push(pages);
        }

    }
    console.log(addUpMiddles(trueUpdates));
}

main();