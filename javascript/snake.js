const snakeGame = document.getElementById("snakeGame");
const snakeFood = document.createElement("div");
let snakeGameOver = true;
let playerChosen = false;

// Player position
const playerAppendage = [{xPlayer: 5, yPlayer: 5}];

playerPosition();

function playerPosition(){
    const oldParts = snakeGame.querySelectorAll(".snakePart");
    for(let i = 0; i < oldParts.length; i++){
        oldParts[i].remove();
    }

    for(let i = 0; i < playerAppendage.length; i++){
        const player = document.createElement("div");
        player.classList.add("snakePart");

        player.style.position = "absolute";
        player.style.height = "25px";
        player.style.width = "25px";
        player.style.borderRadius = "5px";
        player.style.backgroundColor = "#003366";
        player.style.zIndex = 2;
        
        player.style.left = playerAppendage[i].xPlayer + "px";
        player.style.bottom = playerAppendage[i].yPlayer + "px";
        
        snakeGame.append(player);
    }
}

function moveBody(){
    for(let i = playerAppendage.length - 1; i > 0; i--){
        playerAppendage[i].xPlayer = playerAppendage[i - 1].xPlayer;
        playerAppendage[i].yPlayer = playerAppendage[i - 1].yPlayer;
    }
};

// Snake food position
let xSnakeFood;
let ySnakeFood;

foodRandomLocation();
foodPosition();

function foodRandomLocation(){
    xSnakeFood = 5 + (25 * Math.floor(Math.random() * 16));
    ySnakeFood = 5 + (25 * Math.floor(Math.random() * 16));
    foodPositionValidCheck();
    foodPosition();
    
}

function foodPositionValidCheck(){
    for(let i = 0; i < playerAppendage.length; i++){
        if(xSnakeFood == playerAppendage[i].xPlayer && ySnakeFood == playerAppendage[i].yPlayer){
            foodRandomLocation();
        }
    }
}

function foodPosition(){
    snakeFood.style.position = "absolute";
    snakeFood.style.height = "25px";
    snakeFood.style.width = "25px";
    snakeFood.style.borderRadius = "5px";
    snakeFood.style.backgroundColor = "#b82808";
    
    snakeFood.style.left = xSnakeFood + "px";
    snakeFood.style.bottom = ySnakeFood + "px";
    
    snakeGame.append(snakeFood);
};

// Button imputs
const snakeStart = document.getElementById("snakeStart");

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        snakeGameOver = false;
        playerDirection = "up"
        playerAppendage.length = 1;
        playerAppendage[0].xPlayer = 5;
        playerAppendage[0].yPlayer = 5;
        playerPosition();
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
        moveBody();
        playerMove();

        if(playerAppendage[0].yPlayer >= 400 || playerAppendage[0].yPlayer <= -10){
            snakeGameOver = true;
            clearInterval(gameTick);
        }
        else if(playerAppendage[0].xPlayer >= 400 || playerAppendage[0].xPlayer <= -10){
            snakeGameOver = true;
            clearInterval(gameTick);
        }

        for(let i = 1; i < playerAppendage.length; i++){
            if(playerAppendage[0].xPlayer == playerAppendage[i].xPlayer && playerAppendage[0].yPlayer == playerAppendage[i].yPlayer){
                snakeGameOver = true;
                clearInterval(gameTick);
            }
        }

        snakeEat(xSnakeFood, ySnakeFood);
        foodPositionValidCheck();
        playerPosition();
        playerChosen = false;
    }, 400);
};

function playerMove(){
    if(playerDirection == "up"){
        playerAppendage[0].yPlayer += 25;
    }
    else if(playerDirection == "down"){
        playerAppendage[0].yPlayer += -25;
    }
    else if(playerDirection == "left"){
        playerAppendage[0].xPlayer += -25;
    }
    else if(playerDirection == "right"){
        playerAppendage[0].xPlayer += 25;
    }
};

function snakeEat(foodX, foodY){
    if(playerAppendage[0].xPlayer == foodX && playerAppendage[0].yPlayer == foodY){
        const tail = playerAppendage[playerAppendage.length - 1];
        playerAppendage.push({xPlayer: tail.xPlayer, yPlayer: tail.yPlayer});
    }
};