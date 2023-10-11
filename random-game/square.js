export class Square {
    constructor (gridItem, x, y) {
        const square = document.createElement("div");
        square.classList.add("square");
        gridItem.append(square);
        this.x = x;
        this.y = y;
    }
}