// UI関連の定数
const COLORS = {
  DEFAULT_BUTTON: "#f0f0f0",
  CORRECT_ANSWER: "lightgreen",
  INCORRECT_ANSWER: "pink",
};

const OPACITY = {
  VISIBLE: 1,
};

const DISPLAY = {
  NONE: "none",
  INLINE_BLOCK: "inline-block",
};

const DATE_FORMAT = {
  MONTH: "2-digit",
  DAY: "2-digit",
  HOUR: "2-digit",
  MINUTE: "2-digit",
};

const MEDAL_EMOJI = {
  GOLD: "🥇",
  SILVER: "🥈",
};

const TABLE_CLASS = "history-table";

const MESSAGES = {
  NO_HISTORY: "まだ履歴はありません。",
  QUESTION_NUMBER: (num) => `${num} 問目`,
  GAME_RESULT: (score) => `正解数は ${score} でした！`,
};

const TABLE_HEADERS = ["日付", "正解数", "問題数"];

/**
 * スコア表示を更新する
 * @param {number} currentQuestionIndex - 現在の問題番号（0ベース）
 */
export function updateScore(currentQuestionIndex) {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = MESSAGES.QUESTION_NUMBER(currentQuestionIndex + 1);
}

/**
 * ゲーム履歴を表示する
 * @param {Array} gameHistory - ゲーム履歴の配列
 */
export function displayHistory(gameHistory) {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";

  const filteredHistory = gameHistory
    .filter((result) => result.date !== undefined)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  if (filteredHistory.length === 0) {
    historyDiv.textContent = MESSAGES.NO_HISTORY;
    return;
  }

  const table = document.createElement("table");
  table.classList.add(TABLE_CLASS);

  // ヘッダー行の作成
  const headerRow = document.createElement("tr");
  TABLE_HEADERS.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // データ行の作成
  filteredHistory.forEach((result) => {
    const row = document.createElement("tr");

    // 日付セル
    const formattedDate = new Date(result.date)
      .toLocaleString("ja-JP", DATE_FORMAT)
      .replace(/\//g, "/");
    const dateCell = document.createElement("td");
    dateCell.textContent = formattedDate;
    row.appendChild(dateCell);

    // 正解数セル（メダル付き）
    const correctAnswersCell = document.createElement("td");
    const medal = getMedal(result.correctAnswers, result.totalQuestions);
    correctAnswersCell.textContent = `${medal}${result.correctAnswers}`;
    row.appendChild(correctAnswersCell);

    // 問題数セル
    const totalQuestionsCell = document.createElement("td");
    totalQuestionsCell.textContent = result.totalQuestions;
    row.appendChild(totalQuestionsCell);

    table.appendChild(row);
  });

  historyDiv.appendChild(table);
}

/**
 * メダル絵文字を取得する
 * @param {number} correctAnswers - 正解数
 * @param {number} totalQuestions - 総問題数
 * @returns {string} メダル絵文字またはプ文字列
 */
function getMedal(correctAnswers, totalQuestions) {
  if (correctAnswers === totalQuestions) {
    return MEDAL_EMOJI.GOLD;
  }
  if (correctAnswers === totalQuestions - 1) {
    return MEDAL_EMOJI.SILVER;
  }
  return "";
}

/**
 * ゲーム終了時のUI更新
 * @param {number} correctAnswers - 正解数
 * @param {HTMLElement} questionDiv - 問題表示要素
 * @param {NodeListOf<HTMLElement>} choiceButtons - 選択肢ボタンのリスト
 * @param {HTMLElement} startButton - スタートボタン
 */
export function displayGameEnd(
  correctAnswers,
  questionDiv,
  choiceButtons,
  startButton,
) {
  questionDiv.textContent = MESSAGES.GAME_RESULT(correctAnswers);
  choiceButtons.forEach((button) => (button.style.display = DISPLAY.NONE));
  startButton.style.display = DISPLAY.INLINE_BLOCK;
}

/**
 * 問題表示時のボタンスタイルをリセット
 * @param {NodeListOf<HTMLElement>} choiceButtons - 選択肢ボタンのリスト
 */
export function resetButtonStyles(choiceButtons) {
  choiceButtons.forEach((button) => {
    button.style.backgroundColor = COLORS.DEFAULT_BUTTON;
    button.style.opacity = OPACITY.VISIBLE;
  });
}

/**
 * 正解・不正解のボタンスタイルを適用
 * @param {HTMLElement} correctButton - 正解ボタン
 * @param {HTMLElement} selectedButton - 選択されたボタン（不正解の場合）
 * @param {boolean} isCorrect - 正解かどうか
 */
export function applyAnswerStyles(correctButton, selectedButton, isCorrect) {
  correctButton.style.backgroundColor = COLORS.CORRECT_ANSWER;
  if (!isCorrect) {
    selectedButton.style.backgroundColor = COLORS.INCORRECT_ANSWER;
  }
}

/**
 * ゲーム開始時のUI更新
 * @param {NodeListOf<HTMLElement>} choiceButtons - 選択肢ボタンのリスト
 * @param {HTMLElement} startButton - スタートボタン
 */
export function displayGameStart(choiceButtons, startButton) {
  startButton.style.display = DISPLAY.NONE;
  choiceButtons.forEach((button) => (button.style.display = DISPLAY.INLINE_BLOCK));
}
