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