// LocalStorage関連の定数
const STORAGE_KEYS = {
  SELECTED_LEVELS: "selectedLevels",
  QUESTION_COUNT: "questionCount",
  GAME_HISTORY: "gameHistory",
};

const DEFAULT_VALUES = {
  QUESTION_COUNT: 10,
};

const SELECTORS = {
  SETTINGS_CHECKBOXES: '#settings input[type="checkbox"]',
  QUESTION_COUNT_INPUT: "#questionCount",
};

/**
 * 設定を読み込む
 * @returns {number} 問題数
 */
export function loadSettings() {
  const storedLevels = localStorage.getItem(STORAGE_KEYS.SELECTED_LEVELS);
  if (storedLevels) {
    const selectedLevels = JSON.parse(storedLevels);
    document.querySelectorAll(SELECTORS.SETTINGS_CHECKBOXES).forEach((checkbox) => {
      checkbox.checked = selectedLevels.includes(parseInt(checkbox.value));
    });
  }

  const storedQuestionCount = localStorage.getItem(STORAGE_KEYS.QUESTION_COUNT);
  if (storedQuestionCount) {
    document.getElementById("questionCount").value = storedQuestionCount;
    return parseInt(storedQuestionCount);
  }
  return DEFAULT_VALUES.QUESTION_COUNT;
}

/**
 * 設定を保存する
 * @returns {number} 問題数
 */
export function saveSettings() {
  const selectedLevels = Array.from(
    document.querySelectorAll(SELECTORS.SETTINGS_CHECKBOXES + ":checked"),
  ).map((checkbox) => parseInt(checkbox.value));
  localStorage.setItem(
    STORAGE_KEYS.SELECTED_LEVELS,
    JSON.stringify(selectedLevels),
  );

  const questionCount = document.getElementById("questionCount").value;
  localStorage.setItem(STORAGE_KEYS.QUESTION_COUNT, questionCount);
  return parseInt(questionCount);
}

/**
 * 選択されたレベルを取得する
 * @returns {number[]} 選択されたレベルの配列
 */
export function getSelectedLevels() {
  return Array.from(
    document.querySelectorAll(SELECTORS.SETTINGS_CHECKBOXES + ":checked"),
  ).map((checkbox) => parseInt(checkbox.value));
}

/**
 * ゲーム履歴を読み込む
 * @returns {Array} ゲーム履歴の配列
 */
export function loadHistory() {
  const storedHistory = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
  if (storedHistory) {
    try {
      return JSON.parse(storedHistory);
    } catch (e) {
      return [];
    }
  }
  return [];
}

/**
 * ゲーム履歴を保存する
 * @param {Array} gameHistory - ゲーム履歴の配列
 */
export function saveHistory(gameHistory) {
  localStorage.setItem(
    STORAGE_KEYS.GAME_HISTORY,
    JSON.stringify(gameHistory),
  );
}
