const snakeGame = document.getElementById("snakeGame");
const snakeFood = document.createElement("div");
const snakeHighscore = document.getElementById("snakeHighscore");
const whoWon = document.getElementById("whoWon");
let snakeGameOver = true;
let twoPlayer = false;

let currentSnakeHighscore = 0;

// Player positions
const playerAppendage = [{xPlayer: 205, yPlayer: 5}];
const player2Appendage = [{xPlayer: 165, yPlayer: 5}];

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

// Removes snakes's old positions
function clearSnakes(){
    const oldParts = snakeGame.querySelectorAll(".snakePart");
    for(let i = 0; i < oldParts.length; i++){
        oldParts[i].remove();
    }
};

// Moves snake body to next position
function moveBody(snake){
    for(let i = snake.length - 1; i > 0; i--){
        snake[i].xPlayer = snake[i - 1].xPlayer;
        snake[i].yPlayer = snake[i - 1].yPlayer;
    }
};

// Snake food position
let xSnakeFood;
let ySnakeFood;

// Chooses random spot for food which is not occupied
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

// Start game buttons
const snakeStart = document.getElementById("snakeStart");
const snakeStart2 = document.getElementById("snakeStart2");
const snakeGameDisplay = document.getElementById("snakeGameDisplay");

snakeStart.addEventListener("click", ()=>{
    if(snakeGameOver){
        playerInputs.length = 0;
        player2Inputs.length = 0;
        whoWon.innerText = "";
        clearSnakes();

        twoPlayer = false;
        snakeGameOver = false;
        snakeGameDisplay.classList.add("hidden");
        
        playerDirection = "up"
        playerAppendage.length = 1;
        playerAppendage[0].xPlayer = 205;
        playerAppendage[0].yPlayer = 5;
        playerPosition(playerAppendage, "#003366");
        
        startGame();
    }
})

snakeStart2.addEventListener("click", ()=>{
    if(snakeGameOver){
        playerInputs.length = 0;
        player2Inputs.length = 0;
        whoWon.innerText = "";
        clearSnakes();

        twoPlayer = true;
        snakeGameOver = false;
        snakeGameDisplay.classList.add("hidden");

        playerDirection = "up"
        playerAppendage.length = 1;
        playerAppendage[0].xPlayer = 205;
        playerAppendage[0].yPlayer = 5;
        playerPosition(playerAppendage, "#003366");
        
        player2Direction = "up"
        player2Appendage.length = 1;
        player2Appendage[0].xPlayer = 165;
        player2Appendage[0].yPlayer = 5;
        playerPosition(player2Appendage, "#807815");

        startGame();
    }
})

// What direction is each player currently going
let playerDirection = "up";
let player2Direction = "up";


// User keyboard inputs
const playerInputs = [];
const player2Inputs = [];

document.addEventListener("keydown", (e)=>{
    if(snakeGameOver){
        return;
    } 
    
    if(e.key.startsWith("Arrow")){
        e.preventDefault();
    };

    const p1Last = playerInputs.length > 0 ? playerInputs[playerInputs.length - 1] : playerDirection;
    
    if(e.key == "ArrowUp" && p1Last != "down" && playerInputs.length < 2){
        playerInputs.push("up");
    }
    else if(e.key == "ArrowDown" && p1Last != "up" && playerInputs.length < 2){
        playerInputs.push("down");
    }
    else if(e.key == "ArrowLeft" && p1Last != "right" && playerInputs.length < 2){
        playerInputs.push("left");
    }
    else if(e.key == "ArrowRight" && p1Last != "left" && playerInputs.length < 2){
        playerInputs.push("right");
    };


    const p2Last = player2Inputs.length > 0 ? player2Inputs[player2Inputs.length - 1] : player2Direction;

    if(e.key.toLowerCase() == "w" && p2Last != "down" && player2Inputs.length < 2){
        player2Inputs.push("up");
    }
    else if(e.key.toLowerCase() == "s" && p2Last != "up" && player2Inputs.length < 2){
        player2Inputs.push("down");
    }
    else if(e.key.toLowerCase() == "a" && p2Last != "right" && player2Inputs.length < 2){
        player2Inputs.push("left");
    }
    else if(e.key.toLowerCase() == "d" && p2Last != "left" && player2Inputs.length < 2){
        player2Inputs.push("right");
    };
})

// Starts the games tick which moves everything in intervals
function startGame(){
    const gameTick = setInterval(()=>{
        moveBody(playerAppendage);

        if(playerInputs.length > 0){
            playerDirection = playerInputs.shift();
        };
        if(twoPlayer && player2Inputs.length > 0){
            player2Direction = player2Inputs.shift();
        };

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
            clearInterval(gameTick);
            gameEnd(p1Crashed, p2Crashed);
            return;
        }

        snakeEat(playerAppendage);
        if(twoPlayer){
            snakeEat(player2Appendage);
        }

        let totalLength = playerAppendage.length;
        if(twoPlayer){
            totalLength +=player2Appendage.length;
        }

        if(totalLength == 100){
            clearSnakes();
            playerPosition(playerAppendage, "#003366");
            if(twoPlayer){
                playerPosition(player2Appendage, "#807815")
            }
            clearInterval(gameTick);
            gameEnd(false, false);
            return;
        }

        foodPositionValidCheck();

        clearSnakes();
        playerPosition(playerAppendage, "#003366");
        if(twoPlayer){
            playerPosition(player2Appendage, "#807815")
        }
    }, 350);
};

// Checks if a snake has crashed
function snakeCrashed(snake, otherSnake){
    const head = snake[0];
    if(head.yPlayer > 365 || head.yPlayer < 5 || head.xPlayer > 365 || head.xPlayer < 5){
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

// Ends the game and displays stats
function gameEnd(p1Crashed, p2Crashed){
    snakeGameOver = true;
    snakeGameDisplay.classList.remove("hidden");

    if(twoPlayer){
        if(p1Crashed && p2Crashed){
            whoWon.innerText = "Both crashed!"
        }
        else if(p1Crashed){
            whoWon.innerText = "Player 1 crashed!"
        }
        else if(p2Crashed){
            whoWon.innerText = "Player 2 crashed!"
        }
        else{
            whoWon.innerText = "Full board!"
        }
        snakeHighscore.innerText = `Player 1 points: ${(playerAppendage.length - 1)}\nPlayer 2 points: ${(player2Appendage.length - 1)}`;
    }
    else{
        if(p1Crashed){
            whoWon.innerText = "You crashed!";
        }
        else{
            whoWon.innerText = "You won!";
        }
        
        if((playerAppendage.length - 1) > currentSnakeHighscore){
            currentSnakeHighscore = (playerAppendage.length - 1);
        }
        snakeHighscore.innerText = "Highscore: " + currentSnakeHighscore;
    }
}

// Moves the head of the snake one square towards chosen direction
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

// Checks if snake head is on food
function snakeEat(snake){
    if(snake[0].xPlayer == xSnakeFood && snake[0].yPlayer == ySnakeFood){
        const tail = snake[snake.length - 1];
        snake.push({xPlayer: tail.xPlayer, yPlayer: tail.yPlayer});
    }
};