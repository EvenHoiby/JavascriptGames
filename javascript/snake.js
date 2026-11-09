const snakeGame = document.getElementById("snakeGame");
const snakeFood = document.createElement("div");
const snakeHighscore = document.getElementById("snakeHighscore");
let snakeGameOver = true;
let playerChosen = false;

let currentSnakeHighscore = 0;

// Player position
const playerAppendage = [{xPlayer: 165, yPlayer: 5}];
const player2Appendage = [{xPlayer: 205, yPlayer: 5}];

playerPosition(playerAppendage, "#003366");

function playerPosition(snake, color){
    const oldParts = snakeGame.querySelectorAll(".snakePart");
    for(let i = 0; i < oldParts.length; i++){
        oldParts[i].remove();
    }

    for(let i = 0; i < snake.length; i++){
        const player = document.createElement("div");
        player.classList.add("snakePart");

        player.style.position = "absolute";
        player.style.height = "40px";
        player.style.width = "40px";
        player.style.borderRadius = "5px";
        player.style.backgroundColor = `${color}`;
        player.style.zIndex = 2;
        
        player.style.left = snake[i].xPlayer + "px";
        player.style.bottom = snake[i].yPlayer + "px";
        
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

function foodRandomLocation(){
    xSnakeFood = 5 + (40 * Math.floor(Math.random() * 10));
    ySnakeFood = 5 + (40 * Math.floor(Math.random() * 10));
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
    snakeFood.style.height = "40px";
    snakeFood.style.width = "40px";
    snakeFood.style.borderRadius = "5px";
    snakeFood.style.backgroundColor = "#b82808";
    
    snakeFood.style.left = xSnakeFood + "px";
    snakeFood.style.bottom = ySnakeFood + "px";
    
    snakeGame.append(snakeFood);
};

// Button imputs
const snakeStart = document.getElementById("snakeStart");
const snakeStart2 = document.getElementById("snakeStart2");
const snakeGameDisplay = document.getElementById("snakeGameDisplay");

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        snakeGameOver = false;
        snakeGameDisplay.classList.add("hidden");
        playerDirection = "up"
        playerAppendage.length = 1;
        playerAppendage[0].xPlayer = 165;
        playerAppendage[0].yPlayer = 5;
        playerPosition(playerAppendage, "#003366");
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
            gameEnd();
            clearInterval(gameTick);
            return;
        }
        else if(playerAppendage[0].xPlayer >= 400 || playerAppendage[0].xPlayer <= -10){
            gameEnd();
            clearInterval(gameTick);
            return;
        }

        for(let i = 1; i < playerAppendage.length; i++){
            if(playerAppendage[0].xPlayer == playerAppendage[i].xPlayer && playerAppendage[0].yPlayer == playerAppendage[i].yPlayer){
                gameEnd();
                clearInterval(gameTick);
                return;
            }
        }

        snakeEat(xSnakeFood, ySnakeFood);

        if(playerAppendage.length == 100){
            playerPosition(playerAppendage, "#003366");
            gameEnd();
            clearInterval(gameTick);
            return;
        }

        foodPositionValidCheck();
        playerPosition(playerAppendage, "#003366");
        playerChosen = false;
    }, 300);
};

function gameEnd(){
    snakeGameOver = true;
    if((playerAppendage.length - 1) > currentSnakeHighscore){
        currentSnakeHighscore = (playerAppendage.length - 1);
        snakeHighscore.innerText = "Highscore: " + currentSnakeHighscore;
    }
    snakeGameDisplay.classList.remove("hidden");
}

function playerMove(){
    if(playerDirection == "up"){
        playerAppendage[0].yPlayer += 40;
    }
    else if(playerDirection == "down"){
        playerAppendage[0].yPlayer += -40;
    }
    else if(playerDirection == "left"){
        playerAppendage[0].xPlayer += -40;
    }
    else if(playerDirection == "right"){
        playerAppendage[0].xPlayer += 40;
    }
};

function snakeEat(foodX, foodY){
    if(playerAppendage[0].xPlayer == foodX && playerAppendage[0].yPlayer == foodY){
        const tail = playerAppendage[playerAppendage.length - 1];
        playerAppendage.push({xPlayer: tail.xPlayer, yPlayer: tail.yPlayer});
    }
};