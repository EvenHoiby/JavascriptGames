const opponentHand = document.getElementById("opponentHand");
const userHand = document.getElementById("userHand");

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

rockButton.addEventListener("click", () => {
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
});
paperButton.addEventListener("click", () => {
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
});
scissorsButton.addEventListener("click", () => {
    userHand.classList.add("animateUserHand");
    opponentHand.classList.add("animateOpponentHand");
});


userHand.addEventListener("animationend", () => {
    userHand.classList.remove("animateUserHand");
});
opponentHand.addEventListener("animationend", () => {
    opponentHand.classList.remove("animateOpponentHand");
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