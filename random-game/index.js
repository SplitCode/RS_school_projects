import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameField = document.querySelector(".game-field");

const loseModal = document.querySelector(".pop-up-1");
const winModal = document.querySelector(".pop-up-2");
const recordsModal = document.querySelector(".pop-up-3");

const newGame = document.getElementById("new-game-button");
const tryAgain = document.getElementById("again-button");
const records = document.getElementById("records-button");
const closeRecords = document.getElementById("close-button");
const closeWin = document.getElementById("win-button");

const scoreElements = document.querySelectorAll(".score");
const bestScoreElement = document.getElementById("bestScore");

const recordsItems = recordsModal.querySelectorAll(".recordsList li");
const loseRecordsItems = loseModal.querySelectorAll(".recordsList li");
const winRecordsItems = winModal.querySelectorAll(".recordsList li");

const moveSound = new Audio("./assets/sounds/moveSound.mp3");
const loseSound = new Audio("./assets/sounds/loseSound.mp3");
const winSound = new Audio("./assets/sounds/winSound.mp3");

let score = 0;
let bestScore = 0;
let recordsList = [];

function initRecords() {
  const savedRecords = localStorage.getItem("savedRecords");
  const savedBestScore = localStorage.getItem("bestScore");

  if (savedRecords) {
    recordsList = JSON.parse(savedRecords);
  }
  if (savedBestScore) {
    bestScore = parseInt(savedBestScore);
  }

  bestScoreElement.textContent = bestScore;

  fillRecord();
}

initRecords();

newGame.addEventListener("click", function() {
  resetGame();
});

tryAgain.addEventListener("click", function() {
  loseModal.classList.add("non-visible");
  resetGame();
});

closeWin.addEventListener("click", function() {
  winModal.classList.add("non-visible");
  resetGame();
  unblockTileMovement();
});

records.addEventListener("click", function() {
  recordsModal.classList.remove("non-visible");
  fillRecord();
  fillLoseRecord();
  blockTileMovement();
})

closeRecords.addEventListener("click", function() {
  recordsModal.classList.add("non-visible");
  unblockTileMovement();
})

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
    // alert(`Game over! Your score is ${score}. Try again!`)
    loseModal.classList.remove("non-visible");
    addRecord();
    // resetGame();
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
  scoreElements.forEach((scoreElement) => {
    scoreElement.textContent = score;
  });

  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.textContent = bestScore;
  }
}

function savedBestScore() {
  if (score > bestScore) {
    bestScore = score;
  }
}

function resetGame() {
  score = 0;
  scoreElements.forEach((scoreElement) => {
    scoreElement.textContent = score;
  });

  grid.squares.forEach(square => {
    if (square.linkedTile) {
      square.linkedTile.clear();
      square.unlinkTile();
    }
  });

  grid.addRandomSquare().linkTile(new Tile(gameField));
  grid.addRandomSquare().linkTile(new Tile(gameField));

  setInput();
  addRecord();
  savedBestScore();
}

async function check2048() {
  if (grid.squares.some(square => square.linkedTile && square.linkedTile.number === 2048)) {

    await new Promise(resolve => setTimeout(resolve, 500));

    winSound.play();
    // alert("Congratulations! You've reached 2048!");
    winModal.classList.remove("non-visible");
    addRecord();
    fillWinRecord();
    blockTileMovement();
    // resetGame();
  }
}

function addRecord() {
  savedRecords();
  savedBestScore();
  localStorage.setItem("savedRecords", JSON.stringify(recordsList));
  localStorage.setItem("bestScore", bestScore);
  fillRecord();
  fillLoseRecord();
  fillWinRecord(); // Заполняем записи в окне "game-win"
}

function savedRecords() {
  if (recordsList) {
    recordsList.push(score);
    recordsList = recordsList
      .sort((a, b) => b - a)
      .slice(0, 10);

    localStorage.setItem("savedRecords", JSON.stringify(recordsList));
  } else if (recordsList == false) {
    localStorage.setItem("savedRecords", JSON.stringify([score]));
    recordsList = [score];
  }
}

function fillRecords(items) {
  items.forEach((elem, index) => {
    if (recordsList && recordsList[index] !== undefined) {
      elem.textContent = recordsList[index];
      if (recordsList[index] === score) {
        elem.classList.add("user-score");
      } else {
        elem.classList.remove("user-score");
      }
    } else {
      elem.textContent = "0";
      elem.classList.remove("user-score");
    }
  });
}

function fillRecord() {
  fillRecords(recordsItems);
}

function fillLoseRecord() {
  fillRecords(loseRecordsItems);
}

function fillWinRecord() {
  fillRecords(winRecordsItems);
}

function blockTileMovement() {
  // Отключите обработчики событий клавиатуры
  window.removeEventListener("keydown", handleInput);
}

function unblockTileMovement() {
  // Включите обработчики событий клавиатуры
  window.addEventListener("keydown", handleInput, { once: true });
}