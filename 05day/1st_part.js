"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function readInput(fileName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.promises.readFile(fileName, "utf8")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function genRules(update) {
    var ruleList = [];
    for (var idx = 0; idx < update.length; idx++) {
        for (var j = idx + 1; j < update.length; j++) {
            ruleList.push("".concat(update[idx], "|").concat(update[j]));
        }
    }
    return ruleList;
}
function isOrderOK(rules, rulesOfOrders) {
    for (var _i = 0, rulesOfOrders_1 = rulesOfOrders; _i < rulesOfOrders_1.length; _i++) {
        var item = rulesOfOrders_1[_i];
        if (!rules.includes(item)) {
            return false;
        }
    }
    return true;
}
function addUpMiddles(updates) {
    var result = 0;
    for (var _i = 0, updates_1 = updates; _i < updates_1.length; _i++) {
        var update = updates_1[_i];
        var index = Math.floor(update.length / 2);
        var value = update[index];
        result += Number(value);
    }
    return result;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var trueUpdates, input, parts, rules, updates, _i, updates_2, update, pages, rulesOfOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trueUpdates = [];
                    return [4 /*yield*/, readInput("input.txt")];
                case 1:
                    input = _a.sent();
                    parts = input.split("\n\n");
                    rules = parts[0].split('\n');
                    updates = parts[1].split("\n");
                    for (_i = 0, updates_2 = updates; _i < updates_2.length; _i++) {
                        update = updates_2[_i];
                        pages = update.split(",");
                        rulesOfOrders = genRules(pages);
                        console.log(rulesOfOrders);
                        if (isOrderOK(rules, rulesOfOrders)) {
                            trueUpdates.push(pages);
                        }
                    }
                    console.log(addUpMiddles(trueUpdates));
                    return [2 /*return*/];
            }
        });
    });
}
main();
