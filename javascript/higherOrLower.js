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
    userInput.value = "";
});

answerBtn.addEventListener("click", ()=>{
    userGuess()
    holRespons()
    userInput.value = "";
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

const holResponsList = document.getElementById("holResponsList")

function holRespons() {
    const text = document.createElement("p");
    text.classList = "holRespons";

    if(userInput.value == currentNumber) {
        text.innerText = `${userInput.value} ✓ Correct`;
    }
    else if(userInput.value < currentNumber) {
        text.innerText = `${userInput.value} ↑ Higher`;
    }
    else if(userInput.value > currentNumber) {
        text.innerText = `${userInput.value} ↓ Lower`;
    }

    holResponsList.prepend(text);
}

// Prevents the page from refreshing
function handleSubmit(event) {
    event.preventDefault();
}