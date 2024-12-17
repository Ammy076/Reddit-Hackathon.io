let questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome"], correct: 0 },
    { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter"], correct: 1 },
    { question: "Who created JavaScript?", answers: ["Brendan Eich", "Elon Musk", "Bill Gates"], correct: 0 },
    { question: "Which is the largest ocean?", answers: ["Atlantic", "Indian", "Pacific"], correct: 2 },
    { question: "What is 5 x 6?", answers: ["30", "25", "20"], correct: 0 }
];

let currentPlayer = 1;
let player1Score = 0, player2Score = 0;
let questionIndex = 0;
let timer;
let timeLeft = 30;

const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const gameOverElement = document.getElementById("game-over");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    if (questionIndex >= questions.length) {
        endGame();
        return;
    }
    resetTimer();
    const q = questions[questionIndex];
    questionElement.textContent = q.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.onclick = () => checkAnswer(index);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    if (selectedIndex === questions[questionIndex].correct) {
        if (currentPlayer === 1) player1Score++;
        else player2Score++;
    }
    updateScores();
    nextTurn();
}

function nextTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    highlightCurrentPlayer();
    questionIndex++;
    loadQuestion();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextTurn();
        }
    }, 1000);
}

function updateScores() {
    document.getElementById("player1-score").textContent = `Score: ${player1Score}`;
    document.getElementById("player2-score").textContent = `Score: ${player2Score}`;
}

function highlightCurrentPlayer() {
    document.getElementById("player1").classList.remove("active");
    document.getElementById("player2").classList.remove("active");
    document.getElementById(`player${currentPlayer}`).classList.add("active");
}

function endGame() {
    clearInterval(timer);
    gameOverElement.style.display = "block";
    if (player1Score > player2Score) {
        winnerMessage.textContent = "🎉 Player 1 Wins!";
    } else if (player2Score > player1Score) {
        winnerMessage.textContent = "🎉 Player 2 Wins!";
    } else {
        winnerMessage.textContent = "🤝 It's a Draw!";
    }
}

restartButton.addEventListener("click", () => {
    location.reload();
});

function startGame() {
    highlightCurrentPlayer();
    loadQuestion();
}

startGame();
