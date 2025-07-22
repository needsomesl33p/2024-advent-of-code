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
var MAGICWORD = "XMAS";
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
function reverseWords(str) {
    var words = str.split("");
    var reversedWords = words.reverse();
    return reversedWords.join("").trim();
}
function evalString(section) {
    console.log(section, section == MAGICWORD || reverseWords(section) == MAGICWORD ? 1 : 0);
    return section == MAGICWORD || reverseWords(section) == MAGICWORD ? 1 : 0;
}
function horizontalSearch(row, position) {
    if (position > row.length - MAGICWORD.length) {
        return 0;
    }
    var section = row.substring(position, position + MAGICWORD.length);
    console.log("horizontal", section);
    return evalString(section);
}
function verticalSearch(rowNumber, position, input) {
    if (input.length - MAGICWORD.length < rowNumber) {
        return 0;
    }
    var section = getVerticalString(rowNumber, position, input);
    console.log("vertical", section);
    return evalString(section);
}
function getVerticalString(rowNumber, position, input) {
    var letters = [];
    for (var idx = rowNumber; idx < MAGICWORD.length + rowNumber; idx++) {
        letters.push(input[idx][position]);
    }
    return letters.join("");
}
function CrossSearch(rowNumber, position, input) {
    var horizontalStopPoint = position > input[rowNumber].length - MAGICWORD.length;
    var verticalStopPoint = input.length - MAGICWORD.length < rowNumber;
    console.log(position, rowNumber, horizontalStopPoint, verticalStopPoint);
    if (horizontalStopPoint || verticalStopPoint) {
        return 0;
    }
    var section = getCrossString(rowNumber, position, input);
    console.log("diag", section);
    return evalString(section);
}
function getCrossString(rowNumber, position, input) {
    var letters = [];
    var inc = 0;
    for (var idx = position; idx < MAGICWORD.length + position; idx++) {
        letters.push(input[rowNumber][position + inc]);
        inc++;
        rowNumber++;
    }
    return letters.join("");
}
function mirrorMatrix(rows) {
    var matrix = [];
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        matrix.push(reverseWords(row));
    }
    return matrix;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var result, inputs, rows, rowNumber, _i, rows_2, row, position, subResult1, subResult2, subResult3, mirroredMatrix, _a, mirroredMatrix_1, row, position;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = 0;
                    return [4 /*yield*/, readInput("input.txt")];
                case 1:
                    inputs = _b.sent();
                    rows = inputs.split("\n");
                    rowNumber = 0;
                    for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                        row = rows_2[_i];
                        for (position = 0; position < row.length; position++) {
                            subResult1 = horizontalSearch(row, position);
                            subResult2 = verticalSearch(rowNumber, position, rows);
                            subResult3 = CrossSearch(rowNumber, position, rows);
                            result += horizontalSearch(row, position);
                            result += verticalSearch(rowNumber, position, rows);
                            result += CrossSearch(rowNumber, position, rows);
                        }
                        rowNumber++;
                    }
                    mirroredMatrix = mirrorMatrix(rows);
                    rowNumber = 0;
                    for (_a = 0, mirroredMatrix_1 = mirroredMatrix; _a < mirroredMatrix_1.length; _a++) {
                        row = mirroredMatrix_1[_a];
                        for (position = 0; position < row.length; position++) {
                            result += CrossSearch(rowNumber, position, mirroredMatrix);
                        }
                        rowNumber++;
                    }
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
main();
