import { generateMultiplicationQuestion, generateChoices } from "./logic.js";
import {
  speakQuestion,
  speakAnswer,
  playCorrectSound,
  playIncorrectSound,
} from "./audio.js";
import {
  loadSettings,
  saveSettings,
  loadHistory,
  saveHistory,
} from "./storage.js";
import { updateQuestionProgress, displayHistory } from "./ui.js";

let totalQuestions = 10;

document.addEventListener("DOMContentLoaded", function () {
  const questionDiv = document.getElementById("question");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const startButton = document.getElementById("start-btn");

  let currentQuestion;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  const completedQuestions = [];
  let gameHistory = [];

  async function displayQuestion() {
    currentQuestion = generateMultiplicationQuestion(completedQuestions);
    if (currentQuestion === null) {
      return;
    }
    questionDiv.textContent = currentQuestion.question;
    await speakQuestion(currentQuestion.reading);
    displayChoices();
    choiceButtons.forEach((button) => {
      button.style.backgroundColor = "#f0f0f0";
      button.style.opacity = 1;
    });
  }

  function displayChoices() {
    const correctAnswer = currentQuestion.answer;
    const choices = generateChoices(correctAnswer);
    choiceButtons.forEach((button, index) => {
      button.textContent = choices[index];
      button.onclick = (event) => checkAnswer(choices[index], event.target);
    });
  }

  function checkAnswer(selectedAnswer, selectedButton) {
    choiceButtons.forEach((button) => {
      button.disabled = true;
    });
    const correctAnswer = currentQuestion.answer;
    const correctAnswerButton = Array.from(choiceButtons).find(
      (button) => button.textContent == correctAnswer,
    );

    correctAnswerButton.style.backgroundColor = "lightgreen";
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      playCorrectSound();
    } else {
      selectedButton.style.backgroundColor = "pink";
      playIncorrectSound();
      speakAnswer(currentQuestion.answerReading);
    }

    setTimeout(async () => {
      currentQuestionIndex++;
      updateQuestionProgress(currentQuestionIndex);
      choiceButtons.forEach((button) => {
        button.disabled = false;
      });
      if (currentQuestionIndex < totalQuestions) {
        await displayQuestion();
      } else {
        endGame(completedQuestions);
      }
    }, 2000);
  }

  function endGame(completedQuestions) {
    const gameResult = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleString(),
      questions: completedQuestions,
    };

    gameHistory.push(gameResult);
    saveHistory(gameHistory);
    displayHistory(gameHistory);
    questionDiv.textContent = `正解数は ${correctAnswers} でした！`;
    choiceButtons.forEach((button) => (button.style.display = "none"));
    startButton.style.display = "inline-block";
  }

  startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    startButton.style.display = "none";
    choiceButtons.forEach((button) => (button.style.display = "inline-block"));
    displayQuestion();
    updateQuestionProgress(currentQuestionIndex);
  });

  totalQuestions = loadSettings();
  gameHistory = loadHistory();
  displayHistory(gameHistory);
  document
    .querySelectorAll('#settings input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        totalQuestions = saveSettings();
      });
    });
  document.getElementById("questionCount").addEventListener("change", () => {
    totalQuestions = saveSettings();
  });
});
