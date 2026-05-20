/**
 * @typedef {Object} Settings
 * @property {number[]|null} selectedLevels - 選択中の段（null時はDOMに反映しない）
 * @property {number} questionCount - 出題数
 * @property {string} learningMode - 学習モード ("normal" | "weak" | "adaptive")
 */

/**
 * 設定をlocalStorageから読み込む（純粋なデータ取得関数）
 * @returns {Settings}
 */
export function loadSettings() {
  const storedLevels = localStorage.getItem('selectedLevels');
  const storedQuestionCount = localStorage.getItem('questionCount');
  const storedMode = localStorage.getItem('learningMode');

  let selectedLevels = null;
  if (storedLevels) {
    try {
      const parsed = JSON.parse(storedLevels);
      selectedLevels = Array.isArray(parsed) ? parsed : null;
    } catch (e) {
      selectedLevels = null;
    }
  }

  const parsedQuestionCount = Number.parseInt(storedQuestionCount ?? '', 10);
  const questionCount =
    Number.isFinite(parsedQuestionCount) && parsedQuestionCount > 0
      ? parsedQuestionCount
      : 10;

  return {
    selectedLevels,
    questionCount,
    learningMode: storedMode || 'normal',
  };
}

/**
 * 設定をlocalStorageへ保存する（純粋なデータ保存関数）
 * @param {Settings} settings
 */
export function saveSettings(settings) {
  if (settings.selectedLevels) {
    localStorage.setItem(
      'selectedLevels',
      JSON.stringify(settings.selectedLevels),
    );
  } else if (settings.selectedLevels === null) {
    localStorage.removeItem('selectedLevels');
  }
  localStorage.setItem('questionCount', String(settings.questionCount));
  localStorage.setItem('learningMode', settings.learningMode);
}

export function loadHistory() {
  const storedHistory = localStorage.getItem('gameHistory');
  if (storedHistory) {
    try {
      return JSON.parse(storedHistory);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function saveHistory(gameHistory) {
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

/**
 * 間違いノートを読み込み
 * @returns {Array<{questionKey: string, consecutiveCorrect: number}>}
 */
export function loadMistakes() {
  const storedMistakes = localStorage.getItem('mistakes');
  if (storedMistakes) {
    try {
      return JSON.parse(storedMistakes);
    } catch (e) {
      return [];
    }
  }
  return [];
}

/**
 * 間違いノートを保存
 * @param {Array<{questionKey: string, consecutiveCorrect: number}>} mistakes
 */
export function saveMistakes(mistakes) {
  localStorage.setItem('mistakes', JSON.stringify(mistakes));
}

/**
 * 間違った問題を記録
 * @param {string} questionKey - 問題のキー (例: "7x6")
 */
export function recordMistake(questionKey) {
  const mistakes = loadMistakes();
  const existing = mistakes.find((m) => m.questionKey === questionKey);

  if (!existing) {
    mistakes.push({
      questionKey,
      consecutiveCorrect: 0,
    });
    saveMistakes(mistakes);
  } else {
    // 既に記録されている場合は連続正解カウントをリセット
    existing.consecutiveCorrect = 0;
    saveMistakes(mistakes);
  }
}

/**
 * 正解時に連続正解カウントを更新
 * @param {string} questionKey
 */
export function updateCorrectStreak(questionKey) {
  const mistakes = loadMistakes();
  const existing = mistakes.find((m) => m.questionKey === questionKey);

  if (existing) {
    existing.consecutiveCorrect += 1;

    // 3回連続正解したら削除（卒業）
    if (existing.consecutiveCorrect >= 3) {
      const filtered = mistakes.filter((m) => m.questionKey !== questionKey);
      saveMistakes(filtered);
    } else {
      saveMistakes(mistakes);
    }
  }
}

/**
 * キャラクターのXPを読み込み
 * @returns {number} 現在のXP
 */
export function loadCharacterXP() {
  const storedXP = localStorage.getItem('characterXP');
  return storedXP ? parseInt(storedXP) : 0;
}

/**
 * キャラクターのXPを保存
 * @param {number} xp - 新しいXP
 */
export function saveCharacterXP(xp) {
  localStorage.setItem('characterXP', xp.toString());
}

/**
 * XPを加算
 * @param {number} amount - 加算するXP
 * @returns {number} 新しい合計XP
 */
export function addCharacterXP(amount) {
  const currentXP = loadCharacterXP();
  const newXP = currentXP + amount;
  saveCharacterXP(newXP);
  return newXP;
}

/**
 * 学習カレンダーを読み込み
 * @returns {Object} 日付をキー、学習回数を値とするオブジェクト
 */
export function loadCalendar() {
  const storedCalendar = localStorage.getItem('learningCalendar');
  if (storedCalendar) {
    try {
      return JSON.parse(storedCalendar);
    } catch (e) {
      return {};
    }
  }
  return {};
}

/**
 * 学習カレンダーを保存
 * @param {Object} calendar - 日付をキー、学習回数を値とするオブジェクト
 */
export function saveCalendar(calendar) {
  localStorage.setItem('learningCalendar', JSON.stringify(calendar));
}

/**
 * 日付をキー文字列にフォーマット
 * @param {Date} date - 日付オブジェクト
 * @returns {string} YYYY-MM-DD形式の日付キー
 */
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 今日の学習を記録
 */
export function recordTodayStudy() {
  const today = new Date();
  const dateKey = formatDateKey(today);

  const calendar = loadCalendar();
  if (!calendar[dateKey]) {
    calendar[dateKey] = 0;
  }
  calendar[dateKey] += 1;
  saveCalendar(calendar);
}

/**
 * 連続学習日数を計算
 * @returns {number} 連続学習日数
 */
export function getCurrentStreak() {
  const calendar = loadCalendar();
  const today = new Date();
  let streak = 0;

  // 今日から過去に向かって連続チェック
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateKey = formatDateKey(checkDate);

    if (calendar[dateKey] && calendar[dateKey] > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
