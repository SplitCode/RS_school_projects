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

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setInput();
        return;
      }
      await moveUp();
      break;

    case "ArrowDown":
      if (!canMoveDown()) {
        setInput();
        return;
      }
      await moveDown();
      break;

    case "ArrowLeft":
      if (!canMoveLeft()) {
        setInput();
        return;
      }
      await moveLeft();
      break;

    case "ArrowRight":
      if (!canMoveRight()) {
        setInput();
        return;
      }
      await moveRight();
      break;

    default:
      setInput();
      return;
  }

  const newTile = new Tile(gameField);
  grid.addRandomSquare().linkTile(newTile);

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    console.log('некуда');
    await newTile.waitForAnimationEnd()
    alert("Try again!")
    return;
  }

  setInput();
}

async function moveUp() {
  await moveTiles(grid.columns);
}

async function moveDown() {
  await moveTiles(grid.reverseColumns);
}

async function moveLeft() {
  await moveTiles(grid.rows);
}

async function moveRight() {
  await moveTiles(grid.reverseRows);
}

async function moveTiles(groupedSquares) {
  const promises = [];
  groupedSquares.forEach((group) => moveTilesInGroup(group, promises));

  await Promise.all(promises);

  grid.squares.forEach((square) => {
    square.hasNewTile() && square.mergeTiles();
  });
}

function moveTilesInGroup(group, promises) {
  for (let i = 1; i < group.length; i += 1) {
    if (group[i].isEmpty()) {
      continue;
    }

    const squareWithTile = group[i];

    let targetSquare;
    let j = i - 1;
    while (j >= 0 && group[j].canAccept(squareWithTile.linkedTile)) {
      targetSquare = group[j];
      j -= 1;
    }

    if (!targetSquare) {
      continue;
    }

    promises.push(squareWithTile.linkedTile.waitForMoveEnd());

    if (targetSquare.isEmpty()) {
      targetSquare.linkTile(squareWithTile.linkedTile);
    } else {
      targetSquare.linkNewTile(squareWithTile.linkedTile);
    }

    squareWithTile.unlinkTile();
  }
}

function canMoveUp() {
  return canMove(grid.columns);
}

function canMoveDown() {
  return canMove(grid.reverseColumns);
}

function canMoveLeft() {
  return canMove(grid.rows);
}

function canMoveRight() {
  return canMove(grid.reverseRows);
}

function canMove(groupedSquares) {
  return groupedSquares.some(group => canMoveInGroup(group));
}

function canMoveInGroup(group) {
  return group.some((square, index) => {
    if (index === 0) {
      return false;
    }

    if (square.isEmpty()) {
      return false;
    }

    const targetSquare = group[index - 1];
    return targetSquare.canAccept(square.linkedTile);
  });
}