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
  getSelectedLevels,
  loadHistory,
  saveHistory,
} from "./storage.js";
import {
  updateScore,
  displayHistory,
  displayGameEnd,
  resetButtonStyles,
  applyAnswerStyles,
  displayGameStart,
} from "./ui.js";

// ゲーム設定の定数
const GAME_CONFIG = {
  ANSWER_DISPLAY_TIME: 2000, // 解答表示時間（ミリ秒）
};

// メッセージ定数
const MESSAGES = {
  NO_LEVEL_SELECTED: "少なくとも一つの段を選択してください。",
};

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

  /**
   * 問題を表示する
   */
  function displayQuestion() {
    const selectedLevels = getSelectedLevels();

    if (selectedLevels.length === 0) {
      alert(MESSAGES.NO_LEVEL_SELECTED);
      return;
    }

    currentQuestion = generateMultiplicationQuestion(
      selectedLevels,
      completedQuestions,
    );

    if (currentQuestion === null) {
      return;
    }

    // 問題文を表示し、完了したら問題キーを記録
    if (!completedQuestions.includes(currentQuestion.questionKey)) {
      completedQuestions.push(currentQuestion.questionKey);
    }

    questionDiv.textContent = currentQuestion.question;
    speakQuestion(currentQuestion.reading);
    displayChoices();
    resetButtonStyles(choiceButtons);
  }

  /**
   * 選択肢を表示する
   */
  function displayChoices() {
    const correctAnswer = currentQuestion.answer;
    const choices = generateChoices(correctAnswer);
    choiceButtons.forEach((button, index) => {
      button.textContent = choices[index];
      button.onclick = () => checkAnswer(choices[index]);
    });
  }

  /**
   * 解答をチェックする
   * @param {number} selectedAnswer - 選択された解答
   */
  function checkAnswer(selectedAnswer) {
    choiceButtons.forEach((button) => {
      button.disabled = true;
    });

    const selectedButton = Array.from(choiceButtons).find(
      (button) => parseInt(button.textContent) === selectedAnswer,
    );
    const correctAnswer = currentQuestion.answer;
    const correctAnswerButton = Array.from(choiceButtons).find(
      (button) => parseInt(button.textContent) === correctAnswer,
    );

    const isCorrect = selectedAnswer === correctAnswer;
    applyAnswerStyles(correctAnswerButton, selectedButton, isCorrect);

    if (isCorrect) {
      correctAnswers++;
      playCorrectSound();
    } else {
      playIncorrectSound();
      speakAnswer(currentQuestion.answerReading);
    }

    setTimeout(async () => {
      currentQuestionIndex++;
      updateScore(currentQuestionIndex);
      choiceButtons.forEach((button) => {
        button.disabled = false;
      });
      if (currentQuestionIndex < totalQuestions) {
        await displayQuestion();
      } else {
        endGame();
      }
    }, GAME_CONFIG.ANSWER_DISPLAY_TIME);
  }

  /**
   * ゲームを終了する
   */
  function endGame() {
    const gameResult = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleString(),
      questions: [], // 将来的に問題の範囲を記録する場合に使用
    };

    gameHistory.push(gameResult);
    saveHistory(gameHistory);
    displayHistory(gameHistory);
    displayGameEnd(correctAnswers, questionDiv, choiceButtons, startButton);
  }

  /**
   * スタートボタンのイベントリスナー
   */
  startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    completedQuestions.length = 0;
    displayGameStart(choiceButtons, startButton);
    displayQuestion();
    updateScore(currentQuestionIndex);
  });

  // 初期化
  totalQuestions = loadSettings();
  gameHistory = loadHistory();
  displayHistory(gameHistory);

  // 設定変更のイベントリスナー
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
