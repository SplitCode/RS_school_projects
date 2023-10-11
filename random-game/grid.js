import { Square } from "./square.js";

const fieldSize = 4;
const squaresCount = fieldSize * fieldSize;

export class Grid {
    constructor(gridItem) {
        this.squares = [];
        for (let i = 0; i < squaresCount; i += 1) {
            this.squares.push(
                new Square(gridItem, i % fieldSize, Math.floor(i / fieldSize))
            );

        }
    }
}