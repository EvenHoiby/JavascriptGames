const snakeGame = document.getElementById("snakeGame");
const snakeFood = document.createElement("div");
const snakeHighscore = document.getElementById("snakeHighscore");
let snakeGameOver = true;
let playerChosen = false;
let player2Chosen = false;
let twoPlayer = false;

let currentSnakeHighscore = 0;

// Player position
const playerAppendage = [{xPlayer: 165, yPlayer: 5}];
const player2Appendage = [{xPlayer: 205, yPlayer: 5}];

playerPosition(playerAppendage, "#003366");

function playerPosition(snake, color){
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

function clearSnakes(){
    const oldParts = snakeGame.querySelectorAll(".snakePart");
    for(let i = 0; i < oldParts.length; i++){
        oldParts[i].remove();
    }
};

function moveBody(snake){
    for(let i = snake.length - 1; i > 0; i--){
        snake[i].xPlayer = snake[i - 1].xPlayer;
        snake[i].yPlayer = snake[i - 1].yPlayer;
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

    if(twoPlayer){
        for(let i = 0; i < player2Appendage.length; i++){
            if(xSnakeFood == player2Appendage[i].xPlayer && ySnakeFood == player2Appendage[i].yPlayer){
                foodRandomLocation();
            }
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
        twoPlayer = false;
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

snakeStart2.addEventListener("click", ()=>{
    if(snakeGameOver){
        twoPlayer = true;
        snakeGameOver = false;
        snakeGameDisplay.classList.add("hidden");

        playerDirection = "up"
        playerAppendage.length = 1;
        playerAppendage[0].xPlayer = 165;
        playerAppendage[0].yPlayer = 5;
        playerPosition(playerAppendage, "#003366");
        
        player2Direction = "up"
        player2Appendage.length = 1;
        player2Appendage[0].xPlayer = 205;
        player2Appendage[0].yPlayer = 5;
        playerPosition(player2Appendage, "#807815");

        startGame();
    }
})

let playerDirection = "up";
let player2Direction = "w";

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

    if(e.key == "w" && !snakeGameOver && player2Direction != "down" && !player2Chosen){
        player2Direction = "up";
        player2Chosen = true;
    }
    else if(e.key == "s" && !snakeGameOver && player2Direction != "up" && !player2Chosen){
        player2Direction = "down";
        player2Chosen = true;
    }
    else if(e.key == "a" && !snakeGameOver && player2Direction != "right" && !player2Chosen){
        player2Direction = "left";
        player2Chosen = true;
    }
    else if(e.key == "d" && !snakeGameOver && player2Direction != "left" && !player2Chosen){
        player2Direction = "right";
        player2Chosen = true;
    };
})

function startGame(){
    const gameTick = setInterval(()=>{
        moveBody(playerAppendage);
        playerMove(playerAppendage, playerDirection);

        if(twoPlayer){
            moveBody(player2Appendage);
            playerMove(player2Appendage, player2Direction);
        }

        let p1Crashed = snakeCrashed(playerAppendage, player2Appendage)
        let p2Crashed = false;
        if(twoPlayer){
            p2Crashed = snakeCrashed(player2Appendage, playerAppendage)
        }

        if(p1Crashed || p2Crashed){
            gameEnd();
            clearInterval(gameTick);
            return;
        }

        snakeEat(playerAppendage);
        if(twoPlayer){
            snakeEat(player2Appendage);
        }

        foodPositionValidCheck();

        clearSnakes();
        playerPosition(playerAppendage, "#003366");
        if(twoPlayer){
            playerPosition(player2Appendage, "#807815")
        }

        playerChosen = false;
        player2Chosen = false;
    }, 300);
};

function snakeCrashed(snake, otherSnake){
    const head = snake[0];
    if(head.yPlayer >= 400 || head.yPlayer <= -10 || head.xPlayer >= 400 || head.xPlayer <= -10){
            return true;
        }

    for(let i = 1; i < snake.length; i++){
        if(head.xPlayer == snake[i].xPlayer && head.yPlayer == snake[i].yPlayer){
            return true;
        }
    }

    if(twoPlayer){
        for(let i = 0; i < otherSnake.length; i++){
            if(head.xPlayer == otherSnake[i].xPlayer && head.yPlayer == otherSnake[i].yPlayer){
                return true;
            }
        }
    }

    return false;
};

function gameEnd(){
    snakeGameOver = true;
    if((playerAppendage.length - 1) > currentSnakeHighscore){
        currentSnakeHighscore = (playerAppendage.length - 1);
        snakeHighscore.innerText = "Highscore: " + currentSnakeHighscore;
    }
    snakeGameDisplay.classList.remove("hidden");
}

function playerMove(snake, direction){
    if(direction == "up"){
        snake[0].yPlayer += 40;
    }
    else if(direction == "down"){
        snake[0].yPlayer += -40;
    }
    else if(direction == "left"){
        snake[0].xPlayer += -40;
    }
    else if(direction == "right"){
        snake[0].xPlayer += 40;
    }
};

function snakeEat(snake){
    if(snake[0].xPlayer == xSnakeFood && snake[0].yPlayer == ySnakeFood){
        const tail = snake[snake.length - 1];
        snake.push({xPlayer: tail.xPlayer, yPlayer: tail.yPlayer});
    }
};