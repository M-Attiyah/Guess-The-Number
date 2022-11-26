const form = document.querySelector('form');
const input = document.querySelector('form input');
const submitBtn = document.querySelector('form button');
const theNumber = document.querySelector('h2');
const attemptsElem = document.querySelector('p');
let displayMessage = document.querySelector('.message');

const gameStatue = {
    attempts: 20,
    "right number": 0,
    "input status": false
}

function init() {
    theNumber.textContent = gameStatue["right number"];
    attemptsElem.textContent = `${gameStatue.attempts} Attempts`;
    submitBtn.disabled = gameStatue["input status"];
    submitBtn.classList.add('active');
    displayMessage.style.top = "-57px";
}
init()

input.addEventListener('input', e => {
    if (e.target.value !== '') {
        gameStatue["input status"] = true;
        submitBtn.classList.remove('active');
    } else {
        gameStatue["input status"] = false;
        submitBtn.classList.add('active');
    }
})

form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value === '' || input.value > gameStatue["right number"] || input.value <= 0) {
        input.value = '';
        submitBtn.classList.add('active');
        return;
    } else {
        checkTheGuess(input.value);
        input.value = ''
    }
})

function computerSelect() {
    let limit = 20;
    const chooseRandom = Math.floor(Math.random() * limit);

    if (chooseRandom === 0) {
        limit++
    }
    console.log(chooseRandom)
    return chooseRandom;
}

function checkTheGuess(userInput) {
    const computerGuess = computerSelect();
    const userGuess = Number(userInput);

    if (userGuess < computerGuess) {
        displayMessage.textContent = 'Your number is less than the computer Number';
        gameStatue.attempts--;
    } else if (userGuess > computerGuess) {
        displayMessage.textContent = 'Your number is higher than the computer Number';
        gameStatue.attempts--;
    } else if (userGuess === computerGuess) {
        displayMessage.textContent = 'Your Got The correct number';
    }
    displayMessage.style.top = "0";
    gameStatue["right number"] = userGuess;
    theNumber.textContent = userGuess;
    attemptsElem.textContent = gameStatue.attempts;
}