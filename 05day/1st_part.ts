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
        console.log(rulesOfOrders);
        if (isOrderOK(rules, rulesOfOrders)) {
            trueUpdates.push(pages);
        }

    }
    console.log(addUpMiddles(trueUpdates));
}

main();