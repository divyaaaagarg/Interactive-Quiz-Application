const questions = [
  { question: "Which language is primarily used to style web pages?", answers: ["HTML", "CSS", "SQL", "Python"], correct: 1 },
  { question: "Which HTML element is used for the largest standard heading?", answers: ["<head>", "<h6>", "<h1>", "<title>"], correct: 2 },
  { question: "Which keyword declares a block-scoped variable in modern JavaScript?", answers: ["varonly", "let", "define", "dim"], correct: 1 },
  { question: "What does JSON stand for?", answers: ["Java Source Object Network", "JavaScript Object Notation", "Joined System Output Name", "Java Syntax Open Network"], correct: 1 },
  { question: "Which method converts a JSON string into a JavaScript value?", answers: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "parse.JSON()"], correct: 0 }
];

const questionCount = document.querySelector("#question-count");
const scoreLabel = document.querySelector("#score-label");
const progressBar = document.querySelector("#progress-bar");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const result = document.querySelector("#result");
const restartButton = document.querySelector("#restart-button");

let currentIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const current = questions[currentIndex];
  answered = false;
  questionCount.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
  questionText.textContent = current.question;
  feedback.textContent = "";
  answersContainer.replaceChildren();
  nextButton.disabled = true;
  nextButton.textContent = currentIndex === questions.length - 1 ? "Show results" : "Next question";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index, button));
    answersContainer.append(button);
  });
}

function chooseAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const correctIndex = questions[currentIndex].correct;
  const buttons = [...answersContainer.querySelectorAll("button")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
  });
  if (selectedIndex === correctIndex) {
    score += 1;
    feedback.textContent = "Correct! Well done.";
    feedback.style.color = "#16845b";
  } else {
    selectedButton.classList.add("incorrect");
    feedback.textContent = `Not quite. Correct answer: ${questions[currentIndex].answers[correctIndex]}`;
    feedback.style.color = "#b33a4b";
  }
  scoreLabel.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

function showResults() {
  questionText.classList.add("hidden");
  answersContainer.classList.add("hidden");
  feedback.classList.add("hidden");
  nextButton.classList.add("hidden");
  result.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  progressBar.style.width = "100%";
  const percentage = Math.round((score / questions.length) * 100);
  result.textContent = `You scored ${score} out of ${questions.length} (${percentage}%). ${
    percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good effort—keep practising!" : "Keep learning and try again!"
  }`;
  questionCount.textContent = "Quiz complete";
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  questionText.classList.remove("hidden");
  answersContainer.classList.remove("hidden");
  feedback.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  result.classList.add("hidden");
  restartButton.classList.add("hidden");
  renderQuestion();
});

renderQuestion();
