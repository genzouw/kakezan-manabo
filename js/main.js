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
  recordMistake,
  updateCorrectStreak,
  loadMistakes,
  loadCharacterXP,
  addCharacterXP,
  recordTodayStudy,
} from "./storage.js";
import { updateQuestionProgress, displayHistory, displayMistakeNotebook, displayCharacter, showLevelUpModal, displayRewardCalendar } from "./ui.js";
import { updateQuestionStats } from "./analytics.js";
import { updateModeDescription } from "./ui-helper.js";
import {
  updateAchievementStats,
  updateStreak,
  checkNewBadges,
  showBadgeModal,
} from "./badges.js";
import { displayBadgeCollection } from "./badge-display.js";
import { updateAllCharts } from "./charts.js";
import { MenuManager } from "./menu.js";
import { calculateXP, hasLeveledUp, getCurrentLevel } from "./character.js";

// レベルアップモーダル表示の遅延時間（ミリ秒）
const LEVEL_UP_MODAL_DELAY_MS = 2500;

let totalQuestions = 10;
let learningMode = "normal";

document.addEventListener("DOMContentLoaded", function () {
  // メニューマネージャーを初期化
  const menuManager = new MenuManager();

  const questionDiv = document.getElementById("question");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const startButton = document.getElementById("start-btn");

  let currentQuestion;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  const completedQuestions = [];
  let gameHistory = [];
  let gameStartTime = null;

  async function displayQuestion() {
    const selectedLevels = Array.from(
      document.querySelectorAll('#settings input[type="checkbox"]:checked'),
    ).map((checkbox) => parseInt(checkbox.value));
    currentQuestion = generateMultiplicationQuestion(
      completedQuestions,
      selectedLevels,
      learningMode
    );
    if (currentQuestion === null) {
      return;
    }
    questionDiv.textContent = currentQuestion.question;
    displayChoices();
    choiceButtons.forEach((button) => {
      button.style.backgroundColor = "#f0f0f0";
      button.style.opacity = 1;
    });
    await speakQuestion(currentQuestion.reading);
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
    const isCorrect = selectedAnswer === correctAnswer;
    const correctAnswerButton = Array.from(choiceButtons).find(
      (button) => button.textContent == correctAnswer,
    );

    // 学習分析用に正誤情報を記録
    updateQuestionStats(currentQuestion.questionKey, isCorrect);

    // 連続正解数を更新
    updateStreak(isCorrect);

    correctAnswerButton.style.backgroundColor = "lightgreen";
    if (isCorrect) {
      correctAnswers++;
      playCorrectSound();
      // 正解時に連続正解カウントを更新（間違いノートに登録されている場合）
      updateCorrectStreak(currentQuestion.questionKey);

      // キャラクターにXPを加算
      const oldXP = loadCharacterXP();
      const xpGained = calculateXP(true);
      const newXP = addCharacterXP(xpGained);

      // レベルアップチェック
      if (hasLeveledUp(oldXP, newXP)) {
        const newLevel = getCurrentLevel(newXP);
        setTimeout(() => {
          showLevelUpModal(newLevel);
        }, LEVEL_UP_MODAL_DELAY_MS);
      }

      // キャラクター表示を更新
      displayCharacter(newXP);
    } else {
      selectedButton.style.backgroundColor = "pink";
      playIncorrectSound();
      speakAnswer(currentQuestion.answerReading);
      // 不正解時に間違いノートに記録
      recordMistake(currentQuestion.questionKey);
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
    const gameEndTime = Date.now();
    const duration = gameStartTime ? gameEndTime - gameStartTime : null;

    const gameResult = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleString(),
      questions: completedQuestions,
      duration: duration,
    };

    gameHistory.push(gameResult);
    saveHistory(gameHistory);
    displayHistory(gameHistory);

    // 今日の学習を記録
    recordTodayStudy();

    // 達成統計を更新
    updateAchievementStats(gameResult);

    // 新しく獲得したバッジをチェック
    const newBadges = checkNewBadges();
    if (newBadges.length > 0) {
      showBadgeModal(newBadges);
    }

    // グラフを更新
    updateAllCharts();
    displayBadgeCollection();

    // まちがいノートを更新
    displayMistakeNotebook(loadMistakes());

    // カレンダーを更新
    displayRewardCalendar();

    questionDiv.textContent = `せいかいは ${correctAnswers}こ だったよ！`;
    choiceButtons.forEach((button) => (button.style.display = "none"));
    startButton.style.display = "inline-block";
  }

  startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    gameStartTime = Date.now();
    startButton.style.display = "none";
    choiceButtons.forEach((button) => (button.style.display = "inline-block"));
    displayQuestion();
    updateQuestionProgress(currentQuestionIndex);
  });

  const settings = loadSettings();
  totalQuestions = settings.questionCount;
  learningMode = settings.learningMode;
  gameHistory = loadHistory();
  displayHistory(gameHistory);
  displayBadgeCollection();
  updateAllCharts();
  displayMistakeNotebook(loadMistakes());
  displayCharacter(loadCharacterXP());
  displayRewardCalendar();

  document
    .querySelectorAll('#settings input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const newSettings = saveSettings();
        totalQuestions = newSettings.questionCount;
        learningMode = newSettings.learningMode;
      });
    });

  document.getElementById("questionCount").addEventListener("change", () => {
    const newSettings = saveSettings();
    totalQuestions = newSettings.questionCount;
    learningMode = newSettings.learningMode;
  });

  const modeSelect = document.getElementById("learningMode");
  if (modeSelect) {
    modeSelect.addEventListener("change", () => {
      const newSettings = saveSettings();
      totalQuestions = newSettings.questionCount;
      learningMode = newSettings.learningMode;
      updateModeDescription();
    });
  }

  // 初期表示時にモードの説明を更新
  updateModeDescription();
});
