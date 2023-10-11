import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameField = document.querySelector(".game-field");

const grid = new Grid(gameField);
grid.addRandomSquare().linkTile(new Tile(gameField));
grid.addRandomSquare().linkTile(new Tile(gameField));
setInput();

function setInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
			moveUp();
      break;

    case "ArrowDown":
			moveDown();
      break;

    case "ArrowLeft":
			moveLeft();
      break;

    case "ArrowRight":
			moveRight();
      break;

		default:
			setInput();
			return;
  }

  setInput();
}

function moveUp() {
	moveTiles(grid.columns);
}

function moveTiles(groupedSquares) {
	groupedSquares.forEach(group => moveTilesInGroup(group));
}

function moveTilesInGroup(group) {
	for (let i = 1; i < group.length; i += 1) {
		if (group[i].isEmpty()) {
			continue;
		}

		const squareWithTile = group[i];

		let targetSquare;
		let j = i - 1;
		while (j >= 0  && group[j].canAccept(squareWithTile.linkedTile)) {
			targetSquare = group[j];
			j -= 1;
		}

		if (!targetSquare) {
			continue;
		}

		if(targetSquare.isEmpty()) {
			targetSquare.linkTile(squareWithTile.linkedTile);
		} else {
			targetSquare.linkNewTile(squareWithTile.linkedTile);
		}

		squareWithTile.unlinkTile();
	}
}