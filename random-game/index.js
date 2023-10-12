import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

let score = 0;
let bestScore = 0;

const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");
const gameField = document.querySelector(".game-field");
const newGame = document.querySelector(".new-game-button");

const moveSound = new Audio("./assets/sounds/moveSound.mp3");
const loseSound = new Audio("./assets/sounds/loseSound.mp3");
const winSound = new Audio("./assets/sounds/winSound.mp3");

function initBestScore() {
  bestScore = localStorage.getItem("bestScore") || 0;
  bestScoreElement.innerHTML = bestScore;
}

newGame.addEventListener("click", function() {
  resetGame();
});

const grid = new Grid(gameField);
grid.addRandomSquare().linkTile(new Tile(gameField));
grid.addRandomSquare().linkTile(new Tile(gameField));
setInput();

function setInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

window.addEventListener('keydown', function (e) {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
});

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
    loseSound.play();
    alert(`Game over! Your score is ${score}. Try again!`)
    resetGame();
    return;
  }

  check2048();
  setInput();
}

async function moveUp() {
  await moveTiles(grid.columns);
  moveSound.play();
}

async function moveDown() {
  await moveTiles(grid.reverseColumns);
  moveSound.play();
}

async function moveLeft() {
  await moveTiles(grid.rows);
  moveSound.play();
}

async function moveRight() {
  await moveTiles(grid.reverseRows);
  moveSound.play();
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

window.updateScore = function(points) {
  score += points;
  scoreElement.textContent = score;

  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.textContent = bestScore;
  }
}

function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.textContent = bestScore;
  }
}

function resetGame() {
  score = 0;
  scoreElement.textContent = score;

  grid.squares.forEach(square => {
    if (square.linkedTile) {
      square.linkedTile.clear();
      square.unlinkTile();
    }
  });

  grid.addRandomSquare().linkTile(new Tile(gameField));
  grid.addRandomSquare().linkTile(new Tile(gameField));

  setInput();
}

// async function check2048() {
//   if (grid.squares.some(square => square.linkedTile && square.linkedTile.number === 64)) {
//     await waitForAnimationEnd()
//     winSound.play();
//     alert("Congratulations! You've reached 2048!");
//     resetGame();
//   }
// }

async function check2048() {
  if (grid.squares.some(square => square.linkedTile && square.linkedTile.number === 2048)) {

    await new Promise(resolve => setTimeout(resolve, 500));

    winSound.play();
    alert("Congratulations! You've reached 2048!");
    resetGame();
  }
}



