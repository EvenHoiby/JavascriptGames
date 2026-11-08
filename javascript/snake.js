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

let playerDirection = "up";

up.addEventListener("click", ()=>{
    if(!snakeGameOver && playerDirection != "down"){
        playerDirection = "up";
    };
});

down.addEventListener("click", ()=>{
    if(!snakeGameOver && playerDirection != "up"){
        playerDirection = "down";
    };
});

left.addEventListener("click", ()=>{
    if(!snakeGameOver && playerDirection != "right"){
        playerDirection = "left";
    };
});

right.addEventListener("click", ()=>{
    if(!snakeGameOver && playerDirection != "left"){
        playerDirection = "right";
    };
});

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        snakeGameOver = false;
        playerDirection = "up"
        xPlayer = 5;
        yPlayer = 5;
        startGame();
    }
})

function startGame(){
    const gameTick = setInterval(()=>{
        playerMove();
        player.style.left = xPlayer + "px";
        player.style.bottom = yPlayer + "px";
        if(yPlayer >= 400 || yPlayer <= -10){
            snakeGameOver = true;
            clearInterval(gameTick);
        }
        else if(xPlayer >= 400 || xPlayer <= -10){
            snakeGameOver = true;
            clearInterval(gameTick);
        }
    }, 1000);
};

function playerMove(){
    if(playerDirection == "up"){
        yPlayer += 25;
    }
    else if(playerDirection == "down"){
        yPlayer += -25;
    }
    else if(playerDirection == "left"){
        xPlayer += -25;
    }
    else if(playerDirection == "right"){
        xPlayer += 25;
    }
};