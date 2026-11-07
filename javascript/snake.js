const snakeGame = document.getElementById("snakeGame");
const player = document.createElement("div");

player.style.position = "absolute";
player.style.height = "25px";
player.style.width = "25px";
player.style.backgroundColor = "#003366";

let xPlayer = 10;
let yPlayer = 10;

player.style.left = xPlayer + "px";
player.style.bottom = yPlayer + "px";

snakeGame.append(player);