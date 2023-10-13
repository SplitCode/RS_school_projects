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

    unlinkNewTile() {
        this.linkedNewTile = null;
    }

    hasNewTile() {
      return !!this.linkedNewTile;
    }

    canAccept(newTile) {
      return this.isEmpty() || (!this.hasNewTile() && this.linkedTile.number === newTile.number);
    }

    mergeTiles() {
        const mergedValue = this.linkedTile.number + this.linkedNewTile.number;
        this.linkedTile.setStyle(mergedValue);
        this.linkedNewTile.removeFromDOM();
        this.unlinkNewTile();

        // mergeSound.play();
        updateScore(mergedValue);
      }

}