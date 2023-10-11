import { Grid } from "./grid.js";

const gameField = document.querySelector(".game-field");

const grid = new Grid(gameField);
grid.addRandomSquare().linkTile(new Tile(gameField));
grid.addRandomSquare().linkTile(new Tile(gameField));