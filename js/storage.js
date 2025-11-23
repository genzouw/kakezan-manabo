export function loadSettings() {
  const storedLevels = localStorage.getItem("selectedLevels");
  if (storedLevels) {
    const selectedLevels = JSON.parse(storedLevels);
    document
      .querySelectorAll('#settings input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = selectedLevels.includes(parseInt(checkbox.value));
      });
  }

  const storedQuestionCount = localStorage.getItem("questionCount");
  if (storedQuestionCount) {
    document.getElementById("questionCount").value = storedQuestionCount;
  }

  const storedMode = localStorage.getItem("learningMode");
  if (storedMode) {
    const modeSelect = document.getElementById("learningMode");
    if (modeSelect) {
      modeSelect.value = storedMode;
    }
  }

  return {
    questionCount: storedQuestionCount ? parseInt(storedQuestionCount) : 10,
    learningMode: storedMode || "normal",
  };
}

export function saveSettings() {
  const selectedLevels = Array.from(
    document.querySelectorAll('#settings input[type="checkbox"]:checked'),
  ).map((checkbox) => parseInt(checkbox.value));
  localStorage.setItem("selectedLevels", JSON.stringify(selectedLevels));

  const questionCount = document.getElementById("questionCount").value;
  localStorage.setItem("questionCount", questionCount);

  const modeSelect = document.getElementById("learningMode");
  if (modeSelect) {
    localStorage.setItem("learningMode", modeSelect.value);
  }

  return {
    questionCount: parseInt(questionCount),
    learningMode: modeSelect ? modeSelect.value : "normal",
  };
}

export function loadHistory() {
  const storedHistory = localStorage.getItem("gameHistory");
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
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

/**
 * 間違いノートを読み込み
 * @returns {Array<{questionKey: string, consecutiveCorrect: number}>}
 */
export function loadMistakes() {
  const storedMistakes = localStorage.getItem("mistakes");
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
  localStorage.setItem("mistakes", JSON.stringify(mistakes));
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
  const storedXP = localStorage.getItem("characterXP");
  return storedXP ? parseInt(storedXP) : 0;
}

/**
 * キャラクターのXPを保存
 * @param {number} xp - 新しいXP
 */
export function saveCharacterXP(xp) {
  localStorage.setItem("characterXP", xp.toString());
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
