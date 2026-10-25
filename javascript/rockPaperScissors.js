const opponentHand = document.getElementById("opponentHand");
const userHand = document.getElementById("userHand");

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

let userChoice;
let opponentChoice;

rockButton.addEventListener("click", () => {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
    userChoice = "✊";
    removeHandGlow();
});
paperButton.addEventListener("click", () => {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
    userChoice = "✋";
    removeHandGlow();
});
scissorsButton.addEventListener("click", () => {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
    userChoice = "✌️";
    removeHandGlow();
});

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

const hands = ["✊", "✋", "✌️"];

function randomHands() {
    let rNumber = Math.ceil(Math.random()*9);
    console.log(rNumber);
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

let userScoreAmount = 0;
let opponentScoreAmount = 0;
const winLose = document.getElementById("winLose");

userHand.addEventListener("animationend", () => {
    if(userChoice == opponentChoice) {
        winLose.innerText = "Draw";
        userHand.classList.add("handDraw");
        opponentHand.classList.add("handDraw");
    }
    else if(userChoice == "✊" && opponentChoice == "✌️") {
        winLose.innerText = "You Won!";
        userScoreAmount++
        userHand.classList.add("handWon");
        opponentHand.classList.add("handLost");
    }
    else if(userChoice == "✋" && opponentChoice == "✊") {
        winLose.innerText = "You Won!";
        userScoreAmount++
        userHand.classList.add("handWon");
        opponentHand.classList.add("handLost");
    }
    else if(userChoice == "✌️" && opponentChoice == "✋") {
        winLose.innerText = "You Won!";
        userScoreAmount++
        userHand.classList.add("handWon");
        opponentHand.classList.add("handLost");
    }
    else if(opponentChoice == "✊" && userChoice == "✌️") {
        winLose.innerText = "You Lost!";
        opponentScoreAmount++
        opponentHand.classList.add("handWon");
        userHand.classList.add("handLost");
    }
    else if(opponentChoice == "✋" && userChoice == "✊") {
        winLose.innerText = "You Lost!";
        opponentScoreAmount++
        opponentHand.classList.add("handWon");
        userHand.classList.add("handLost");
    }
    else if(opponentChoice == "✌️" && userChoice == "✋") {
        winLose.innerText = "You Lost!";
        opponentScoreAmount++
        opponentHand.classList.add("handWon");
        userHand.classList.add("handLost");
    }
});

const countdown = document.getElementById("countdown");
const countdownText = ["Rock", "Paper", "Scissors", "Shoot!"];
let count = 0;

const userScore = document.getElementById("userScore");
const opponentScore = document.getElementById("opponentScore");

userHand.addEventListener("animationiteration", () => {
    countdown.innerText = countdownText[count++];
});
userHand.addEventListener("animationend", () => {
    countdown.innerText = countdownText[count];
    count = 0;
    userScore.innerText = "Score: " + userScoreAmount;
    opponentScore.innerText = "Score: " + opponentScoreAmount;
});