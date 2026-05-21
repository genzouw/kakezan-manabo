/**
 * キャラクター育成システム
 * 学習を進めるとペットキャラクターが成長する
 */

// キャラクターのレベル定義
export const CHARACTER_LEVELS = [
  {
    level: 0,
    name: 'たまご',
    requiredXP: 0,
    emoji: '🥚',
    message: 'たまごからうまれるよ！',
  },
  {
    level: 1,
    name: 'あかちゃん',
    requiredXP: 10,
    emoji: '🐣',
    message: 'あかちゃんがうまれたよ！',
  },
  {
    level: 2,
    name: 'こども',
    requiredXP: 30,
    emoji: '🐥',
    message: 'こどもにせいちょうしたよ！',
  },
  {
    level: 3,
    name: 'おとな',
    requiredXP: 60,
    emoji: '🐔',
    message: 'おとなになったよ！すごい！',
  },
  {
    level: 4,
    name: 'マスター',
    requiredXP: 100,
    emoji: '🦅',
    message: 'マスターになったよ！かんぺき！',
  },
];

/**
 * 現在のXPから対応するレベルを取得
 * @param {number} xp - 現在の経験値
 * @returns {Object} レベル情報
 */
export function getCurrentLevel(xp) {
  for (let i = CHARACTER_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= CHARACTER_LEVELS[i].requiredXP) {
      return CHARACTER_LEVELS[i];
    }
  }
  return CHARACTER_LEVELS[0];
}

/**
 * 次のレベルまでに必要なXPを計算
 * @param {number} xp - 現在の経験値
 * @returns {Object} { currentLevel, nextLevel, remainingXP, progress }
 */
export function getProgressToNextLevel(xp) {
  const currentLevel = getCurrentLevel(xp);
  const currentLevelIndex = CHARACTER_LEVELS.findIndex(
    (l) => l.level === currentLevel.level,
  );

  // 最大レベルの場合
  if (currentLevelIndex === CHARACTER_LEVELS.length - 1) {
    return {
      currentLevel,
      nextLevel: null,
      remainingXP: 0,
      progress: 100,
    };
  }

  const nextLevel = CHARACTER_LEVELS[currentLevelIndex + 1];
  const xpInCurrentLevel = xp - currentLevel.requiredXP;
  const xpNeededForNextLevel = nextLevel.requiredXP - currentLevel.requiredXP;
  const progress = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  return {
    currentLevel,
    nextLevel,
    remainingXP: nextLevel.requiredXP - xp,
    progress: Math.min(progress, 100),
  };
}

/**
 * レベルアップしたかチェック
 * @param {number} oldXP - 前回のXP
 * @param {number} newXP - 新しいXP
 * @returns {boolean} レベルアップしたか
 */
export function hasLeveledUp(oldXP, newXP) {
  const oldLevel = getCurrentLevel(oldXP);
  const newLevel = getCurrentLevel(newXP);
  return newLevel.level > oldLevel.level;
}

/**
 * 正解数に応じたXPを計算
 * @param {boolean} isCorrect - 正解したか
 * @returns {number} 獲得XP
 */
export function calculateXP(isCorrect) {
  return isCorrect ? 1 : 0;
}
