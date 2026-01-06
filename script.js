const quizData = [
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: "HTML"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style System", "Cascading Style Sheets", "Color Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which is used for client-side scripting?",
        options: ["PHP", "Java", "JavaScript", "Python"],
        answer: "JavaScript"
    },
    {
        question: "Which tag is used to link CSS?",
        options: ["<css>", "<style>", "<script>", "<link>"],
        answer: "<link>"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Apple"],
        answer: "Netscape"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    nextBtn.disabled = true;
    selectedOption = null;
    optionsEl.innerHTML = "";

    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;

    current.options.forEach(option => {
        const div = document.createElement("div");
        div.textContent = option;
        div.classList.add("option");
        div.addEventListener("click", () => selectOption(div, option));
        optionsEl.appendChild(div);
    });
}

function selectOption(element, option) {
    document.querySelectorAll(".option").forEach(opt =>
        opt.classList.remove("selected")
    );

    element.classList.add("selected");
    selectedOption = option;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${quizData.length}`;
}
