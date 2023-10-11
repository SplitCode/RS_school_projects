export class Square {
    constructor (gridItem, x, y) {
        const square = document.createElement("div");
        square.classList.add("square");
        gridItem.append(square);
        this.x = x;
        this.y = y;
    }

    linkTile(tile) {
        tile.setCoordinate(this.x, this.y);
        this.linkedTile = tile;
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    isEmpty() {
        return !this.linkedTile;
    }

    linkNewTile(tile) {
        tile.setCoordinate(this.x, this.y);
        this.linkedNewTile = tile;
    }

    hasNewTile() {
      return !!this.linkedNewTile;
    }

    canAccept(newTile) {
      return this.isEmpty() || (!this.hasNewTile() && this.linkedTile.number === newTile.number);
    }
}