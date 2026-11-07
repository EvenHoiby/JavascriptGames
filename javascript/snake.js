const snakeGame = document.getElementById("snakeGame");
const player = document.createElement("div");

// Player position
player.style.position = "absolute";
player.style.height = "25px";
player.style.width = "25px";
player.style.borderRadius = "5px";
player.style.backgroundColor = "#003366";

let xPlayer = 5;
let yPlayer = 5;

player.style.left = xPlayer + "px";
player.style.bottom = yPlayer + "px";

snakeGame.append(player);

// Button imputs
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

up.addEventListener("click", ()=>{
    yPlayerMove(25)
});

down.addEventListener("click", ()=>{
    yPlayerMove(-25)
});

left.addEventListener("click", ()=>{
    xPlayerMove(-25)
});

right.addEventListener("click", ()=>{
    xPlayerMove(25)
});

function xPlayerMove(num){
    xPlayer += num;
    player.style.left = xPlayer + "px";
};

function yPlayerMove(num){
    yPlayer += num;
    player.style.bottom = yPlayer + "px";
};