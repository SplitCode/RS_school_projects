export class Tile {
    constructor(gridItem) {
        this.tileItem = document.createElement("div");
        this.tileItem.classList.add("tile");
        this.setStyle(Math.random() > 0.5 ? 2 : 4);
        gridItem.append(this.tileItem);
    }

    setCoordinate(x, y) {
        this.x = x;
        this.y = y;
        this.tileItem.style.setProperty("--x", x);
        this.tileItem.style.setProperty("--y", y);
    }

    setStyle(number) {
       this.number = number;
       this.tileItem.textContent = number;
       const bgColor = 100 - Math.log2(number) * 9;
       this.tileItem.style.setProperty("--bg-color", `${bgColor}%`);
       this.tileItem.style.setProperty("--text-color", `${bgColor < 50 ? 90 : 10}%`);
    }

    clear() {
        this.tileItem.remove();
    }

    removeFromDOM() {
        this.tileItem.remove();
    }

    waitForMoveEnd() {
        return new Promise(resolve => {
            this.tileItem.addEventListener("transitionend", resolve, { once: true });
        });
    }

    waitForAnimationEnd() {
        return new Promise(resolve => {
          this.tileItem.addEventListener("animationend", resolve, { once: true });
        });
    }
}