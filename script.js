// Varibales
const url =
  "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple";

const questionHeader = document.querySelector(".quiz-app__question");
const options = document.querySelectorAll(".quiz-app__option");
const submit = document.querySelector(".quiz-app__submit");
const alert = document.querySelector(".alert");
let correct;
// Events
getQuestion(url);

options.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    for (let o of options) {
      o.classList.remove("selected");
    }
    opt.classList.add("selected");
  });
});

submit.addEventListener("click", showResult);

// Functions
async function getQuestion(url) {
  let randomNumber = randomIntFromInterval(0, 2);
  // get data
  const respone = await fetch(url);
  const data = await respone.json();
  const question = data.results[0].question;
  const correctAnswer = data.results[0].correct_answer;
  const incorrectAnswers = data.results[0].incorrect_answers;
  correct = correctAnswer;

  // add Question text to dom
  questionHeader.classList.add("bodyColor");
  questionHeader.firstElementChild.innerText = `${question}`;

  // Options list
  const allAnswers = [...incorrectAnswers];
  allAnswers.splice(randomNumber, 0, correctAnswer);

  // add Question options to dom
  for (let i = 0; i < options.length; i++) {
    options[i].lastElementChild.innerText = allAnswers[i];
  }
}

// Get random number function
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Show Test Result
function showResult() {
  options.forEach((opt) => {
    const selctedOption = opt.classList.contains("selected");
    if (selctedOption) {
      const slectedText = opt.lastElementChild.innerText;
      opt.classList.remove("selected");
      if (slectedText === correct) {
        opt.lastElementChild.style.backgroundColor = "#08e765";
      } else {
        opt.lastElementChild.style.backgroundColor = "#d61c45";
      }
    }
    alert.classList.add("active");
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  });
}
