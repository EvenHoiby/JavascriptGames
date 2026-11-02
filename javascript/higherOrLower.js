const answerBtn = document.getElementById("holAnswerBtn");
const userInput = document.getElementById("holUserInput");
const gameAnswer = document.getElementById("gameAnswer");
const holNewNumberBtn = document.getElementById("holNewNumberBtn");

let currentNumber = randomNumber();

function randomNumber() {
    return Math.ceil((Math.random())*100);
};

let userAnswers = [];

holNewNumberBtn.addEventListener("click", ()=>{
    currentNumber = randomNumber();
    userInput.value = "";
    userAnswers = [];
    userGuess();
    holRespons();
});

answerBtn.addEventListener("click", ()=>{
    if(Number(userInput.value) <= 100 && Number(userInput.value) >= 1) {
        userAnswers.push(userInput.value);
        userGuess();
        holRespons();
    }
    userInput.value = "";
});

function userGuess() {
    if(userInput.value == "") {
        gameAnswer.innerText = "-";
    }
    else if(userInput.value == currentNumber) {
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
    holResponsList.innerHTML = "";

    const sortedAnswers = [...userAnswers].sort((a, b) => b - a);

    for(let i = 0; i < sortedAnswers.length; i++) {
        const text = document.createElement("p");
        text.classList = "holRespons";

        if(sortedAnswers[i] == currentNumber) {
            text.innerText = `${sortedAnswers[i]} ✓ Correct`;
        }
        else if(sortedAnswers[i] < currentNumber) {
            text.innerText = `${sortedAnswers[i]} ↑ Higher`;
        }
        else if(sortedAnswers[i] > currentNumber) {
            text.innerText = `${sortedAnswers[i]} ↓ Lower`;
        };

        holResponsList.append(text);
    }
}

// Prevents the page from refreshing
function handleSubmit(event) {
    event.preventDefault();
}