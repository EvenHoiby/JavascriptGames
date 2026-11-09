const snakeGame = document.getElementById("snakeGame");
const player = document.createElement("div");
const snakeFood = document.createElement("div");
let snakeGameOver = true;
let playerChosen = false;
let snakeAppendages = 0;

// Player position
player.style.position = "absolute";
player.style.height = "25px";
player.style.width = "25px";
player.style.borderRadius = "5px";
player.style.backgroundColor = "#003366";
player.style.zIndex = 2;

let xPlayer = 5;
let yPlayer = 5;

player.style.left = xPlayer + "px";
player.style.bottom = yPlayer + "px";

snakeGame.append(player);

// Snake food position
snakeFood.style.position = "absolute";
snakeFood.style.height = "25px";
snakeFood.style.width = "25px";
snakeFood.style.borderRadius = "5px";
snakeFood.style.backgroundColor = "#b82808";

let xSnakeFood = 105;
let ySnakeFood = 105;

snakeFood.style.left = xSnakeFood + "px";
snakeFood.style.bottom = ySnakeFood + "px";

snakeGame.append(snakeFood);

// Button imputs
const snakeStart = document.getElementById("snakeStart");

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        snakeGameOver = false;
        playerDirection = "up"
        xPlayer = 5;
        yPlayer = 5;
        startGame();
    }
})

let playerDirection = "up";

document.addEventListener("keydown", (e)=>{
    if(e.key.startsWith("Arrow") && !snakeGameOver){
        e.preventDefault();
    };
    
    if(e.key == "ArrowUp" && !snakeGameOver && playerDirection != "down" && !playerChosen){
        playerDirection = "up";
        playerChosen = true;
    }
    else if(e.key == "ArrowDown" && !snakeGameOver && playerDirection != "up" && !playerChosen){
        playerDirection = "down";
        playerChosen = true;
    }
    else if(e.key == "ArrowLeft" && !snakeGameOver && playerDirection != "right" && !playerChosen){
        playerDirection = "left";
        playerChosen = true;
    }
    else if(e.key == "ArrowRight" && !snakeGameOver && playerDirection != "left" && !playerChosen){
        playerDirection = "right";
        playerChosen = true;
    };
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

        snakeEat(105, 105);
        playerChosen = false;
    }, 400);
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

function snakeEat(foodX, foodY){
    if(xPlayer == foodX && yPlayer == foodY){
        snakeAppendages++;
        console.log(snakeAppendages);
    }
};