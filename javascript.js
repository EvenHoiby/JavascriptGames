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
});
paperButton.addEventListener("click", () => {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
    userChoice = "✋";
});
scissorsButton.addEventListener("click", () => {
    userHand.innerText = "✊";
    opponentHand.innerText = "✊";
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
    userChoice = "✌️";
});


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

const winLose = document.getElementById("winLose");

userHand.addEventListener("animationend", () => {
    if(userChoice == opponentChoice) {
        winLose.innerText = "Draw";
    }
    else if(userChoice == "✊" && opponentChoice == "✌️") {
        winLose.innerText = "You Won!";
    }
    else if(userChoice == "✋" && opponentChoice == "✊") {
        winLose.innerText = "You Won!";
    }
    else if(userChoice == "✌️" && opponentChoice == "✋") {
        winLose.innerText = "You Won!";
    }
    else if(opponentChoice == "✊" && userChoice == "✌️") {
        winLose.innerText = "You Lost!";
    }
    else if(opponentChoice == "✋" && userChoice == "✊") {
        winLose.innerText = "You Lost!";
    }
    else if(opponentChoice == "✌️" && userChoice == "✋") {
        winLose.innerText = "You Lost!";
    }
    
});