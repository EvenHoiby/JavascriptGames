const opponentHand = document.getElementById("opponentHand");
const userHand = document.getElementById("userHand");

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

let userChoice;
let opponentChoice;

let userScoreAmount = 0;
let opponentScoreAmount = 0;

let gameOver = false;

rockButton.addEventListener("click", () => {
    if(!gameOver) {
        userChoice = "✊";
        startRound()
        removeHandGlow();
    };
});
paperButton.addEventListener("click", () => {
    if(!gameOver) {
        userChoice = "✋";
        startRound()
        removeHandGlow();
    };
});
scissorsButton.addEventListener("click", () => {
    if(!gameOver) {
        userChoice = "✌️";
        startRound()
        removeHandGlow();
    };
});

function startRound() {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
};

function removeHandGlow() {
    userHand.classList.remove("handWon");
    userHand.classList.remove("handLost");
    userHand.classList.remove("handDraw");
    opponentHand.classList.remove("handWon");
    opponentHand.classList.remove("handLost");
    opponentHand.classList.remove("handDraw");
};

userHand.addEventListener("animationend", () => {
    userHand.classList.remove("animateUserHand");
});
opponentHand.addEventListener("animationend", () => {
    opponentHand.classList.remove("animateOpponentHand");
});

opponentHand.addEventListener("animationend", ()=>{
    opponentChoice = randomHands();
    opponentHand.innerText = opponentChoice;
});
userHand.addEventListener("animationend", () => {
    userHand.innerText = userChoice;
});

function randomHands() {
    let rNumber = Math.floor((Math.random() * 9) + 1);
    if(rNumber <= 3) {
        return "✊";
    }
    else if(rNumber <= 6 && rNumber > 3) {
        return "✋";
    }
    else if (rNumber <= 9 && rNumber > 6) {
        return "✌️";
    }
};

opponentHand.addEventListener("animationend", () => {
    if(userChoice == opponentChoice) {
        userHand.classList.add("handDraw");
        opponentHand.classList.add("handDraw");
    }
    else if(userChoice == "✊" && opponentChoice == "✌️") {
        userWin();
    }
    else if(userChoice == "✋" && opponentChoice == "✊") {
        userWin();
    }
    else if(userChoice == "✌️" && opponentChoice == "✋") {
        userWin();
    }
    else if(opponentChoice == "✊" && userChoice == "✌️") {
        opponentWin();
    }
    else if(opponentChoice == "✋" && userChoice == "✊") {
        opponentWin();
    }
    else if(opponentChoice == "✌️" && userChoice == "✋") {
        opponentWin();
    };
});

function userWin() {
    userScoreAmount++
    userHand.classList.add("handWon");
    opponentHand.classList.add("handLost");
};

function opponentWin() {
    opponentScoreAmount++
    opponentHand.classList.add("handWon");
    userHand.classList.add("handLost");
};

const countdown = document.getElementById("countdown");
const countdownText = ["Rock", "Paper", "Scissors", "Shoot!"];
let count = 0;

const userScore = document.getElementById("userScore");
const opponentScore = document.getElementById("opponentScore");

opponentHand.addEventListener("animationiteration", () => {
    countdown.innerText = countdownText[count++];
});
opponentHand.addEventListener("animationend", () => {
    countdown.innerText = countdownText[count];
    count = 0;
    userScore.innerText = "Score: " + userScoreAmount;
    opponentScore.innerText = "Score: " + opponentScoreAmount;

    if(opponentScoreAmount == 3) {
        countdown.innerText = "You Lost!";
        gameOver = true;
    }
    else if(userScoreAmount == 3) {
        countdown.innerText = "You Won!";
        gameOver = true;
    };
});