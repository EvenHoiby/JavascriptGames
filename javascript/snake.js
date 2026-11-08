const snakeGame = document.getElementById("snakeGame");
const player = document.createElement("div");
let snakeGameOver = true;

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
const snakeRetryBtn = document.getElementById("snakeRetryBtn");
const snakeStart = document.getElementById("snakeStart");
let userPicked = false;

up.addEventListener("click", ()=>{
    if(!userPicked && !snakeGameOver){
        yPlayerMove(25);
        userPicked = true;
    };
});

down.addEventListener("click", ()=>{
    if(!userPicked && !snakeGameOver){
        yPlayerMove(-25);
        userPicked = true;
    };
});

left.addEventListener("click", ()=>{
    if(!userPicked && !snakeGameOver){
        xPlayerMove(-25);
        userPicked = true;
    };
});

right.addEventListener("click", ()=>{
    if(!userPicked && !snakeGameOver){
        xPlayerMove(25);
        userPicked = true;
    };
});

function xPlayerMove(num){
    xPlayer += num;
};

function yPlayerMove(num){
    yPlayer += num;
};

snakeRetryBtn.addEventListener("click", ()=>{
    xPlayer = 10;
    yPlayer = 10;
    startGame();
});

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        startGame();
        snakeGameOver = false;
    }
})

function startGame(){
    const gameTick = setInterval(()=>{
        userPicked = false;
        player.style.left = xPlayer + "px";
        player.style.bottom = yPlayer + "px";
        if(yPlayer >= 405 || yPlayer <= -20){
            snakeGameOver = true;
            clearInterval(gameTick);
        }
        else if(xPlayer >= 405 || xPlayer <= -20){
            snakeGameOver = true;
            clearInterval(gameTick);
        }
    }, 1000);
};