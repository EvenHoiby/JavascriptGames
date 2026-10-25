const answerBtn = document.getElementById("holAnswerBtn");
const userInput = document.getElementById("holUserInput");
const gameAnswer = document.getElementById("gameAnswer");
const holNewNumberBtn = document.getElementById("holNewNumberBtn");

let currentNumber = randomNumber();

function randomNumber() {
    return Math.ceil((Math.random())*100);
};

holNewNumberBtn.addEventListener("click", ()=>{
    currentNumber = randomNumber();
});

answerBtn.addEventListener("click", ()=>{
    userGuess()
});

function userGuess() {
    if(userInput.value == currentNumber) {
        gameAnswer.innerText = "Correct";
    }
    else if(userInput.value < currentNumber) {
        gameAnswer.innerText = "Higher";
    }
    else if(userInput.value > currentNumber) {
        gameAnswer.innerText = "Lower";
    }
};