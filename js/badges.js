/**
 * バッジ・トロフィーシステム
 */

// バッジの定義
export const BADGES = {
  firstWin: {
    id: "firstWin",
    name: "はじめの一歩",
    description: "初めてのゲームをクリア",
    emoji: "🎯",
    condition: (stats) => stats.gamesPlayed >= 1,
  },
  perfectGame: {
    id: "perfectGame",
    name: "パーフェクト",
    description: "全問正解を達成",
    emoji: "🏆",
    condition: (stats) => stats.perfectGames >= 1,
  },
  streakMaster: {
    id: "streakMaster",
    name: "連続正解マスター",
    description: "10問連続で正解",
    emoji: "🔥",
    condition: (stats) => stats.maxStreak >= 10,
  },
  dedicated: {
    id: "dedicated",
    name: "継続は力なり",
    description: "3日連続で学習",
    emoji: "📅",
    condition: (stats) => stats.consecutiveDays >= 3,
  },
  weekWarrior: {
    id: "weekWarrior",
    name: "1週間の戦士",
    description: "7日連続で学習",
    emoji: "⭐",
    condition: (stats) => stats.consecutiveDays >= 7,
  },
  hundredQuestions: {
    id: "hundredQuestions",
    name: "百問突破",
    description: "累計100問に挑戦",
    emoji: "💯",
    condition: (stats) => stats.totalQuestions >= 100,
  },
  speedster: {
    id: "speedster",
    name: "スピードマスター",
    description: "10問を2分以内でクリア",
    emoji: "⚡",
    condition: (stats) => stats.hasSpeedRecord,
  },
  allRounder: {
    id: "allRounder",
    name: "オールラウンダー",
    description: "全ての段を練習",
    emoji: "🌟",
    condition: (stats) => stats.practiceAllLevels,
  },
};

/**
 * 統計情報を取得
 */
export function getAchievementStats() {
  const stats = localStorage.getItem("achievementStats");
  if (stats) {
    try {
      return JSON.parse(stats);
    } catch (e) {
      return createDefaultStats();
    }
  }
  return createDefaultStats();
}

/**
 * デフォルトの統計情報を作成
 */
function createDefaultStats() {
  return {
    gamesPlayed: 0,
    perfectGames: 0,
    maxStreak: 0,
    currentStreak: 0,
    consecutiveDays: 0,
    lastPlayDate: null,
    totalQuestions: 0,
    hasSpeedRecord: false,
    practiceAllLevels: false,
    practicesLevels: new Set(),
  };
}

/**
 * 統計情報を保存
 */
function saveAchievementStats(stats) {
  // Setオブジェクトは配列に変換して保存
  const statsToSave = {
    ...stats,
    practicesLevels: Array.from(stats.practicesLevels),
  };
  localStorage.setItem("achievementStats", JSON.stringify(statsToSave));
}

/**
 * practicesLevelsフィールドをSet型に正規化
 * @param {Object} stats - 統計オブジェクト
 * @returns {Set} 正規化されたSet
 */
function normalizePracticesLevels(practicesLevels) {
  if (Array.isArray(practicesLevels)) {
    return new Set(practicesLevels);
  }
  if (!practicesLevels) {
    return new Set();
  }
  return practicesLevels;
}

/**
 * 連続学習日数を計算
 * @param {string|null} lastPlayDate - 最後にプレイした日付
 * @param {number} currentConsecutiveDays - 現在の連続日数
 * @returns {number} 更新された連続日数
 */
function calculateConsecutiveDays(lastPlayDate, currentConsecutiveDays) {
  const today = new Date().toDateString();
  if (!lastPlayDate) {
    return 1;
  }
  const lastDate = new Date(lastPlayDate);
  const diffTime = new Date(today) - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return currentConsecutiveDays + 1;
  }
  if (diffDays > 1) {
    return 1;
  }
  return currentConsecutiveDays;
}

/**
 * 練習した段を記録
 * @param {Set} practicesLevels - 練習済み段のSet
 * @param {Array} questions - 問題キーの配列
 */
function recordPracticedLevels(practicesLevels, questions) {
  if (!questions || questions.length === 0) {
    return;
  }
  questions.forEach((questionKey) => {
    const level = parseInt(questionKey.split("x")[0]);
    practicesLevels.add(level);
  });
}

/**
 * スピード記録を達成したか判定
 * @param {Object} gameResult - ゲーム結果
 * @returns {boolean} スピード記録を達成した場合true
 */
function hasAchievedSpeedRecord(gameResult) {
  const SPEED_RECORD_QUESTIONS = 10;
  const SPEED_RECORD_TIME_MS = 120000;
  return (
    gameResult.totalQuestions === SPEED_RECORD_QUESTIONS &&
    gameResult.duration &&
    gameResult.duration <= SPEED_RECORD_TIME_MS
  );
}

/**
 * ゲーム終了時に統計を更新
 * @param {Object} gameResult - ゲーム結果
 */
export function updateAchievementStats(gameResult) {
  const stats = getAchievementStats();
  stats.practicesLevels = normalizePracticesLevels(stats.practicesLevels);

  stats.gamesPlayed++;
  stats.totalQuestions += gameResult.totalQuestions;

  if (gameResult.correctAnswers === gameResult.totalQuestions) {
    stats.perfectGames++;
  }

  stats.consecutiveDays = calculateConsecutiveDays(
    stats.lastPlayDate,
    stats.consecutiveDays
  );
  stats.lastPlayDate = new Date().toDateString();

  recordPracticedLevels(stats.practicesLevels, gameResult.questions);
  stats.practiceAllLevels = stats.practicesLevels.size >= 9;

  if (hasAchievedSpeedRecord(gameResult)) {
    stats.hasSpeedRecord = true;
  }

  saveAchievementStats(stats);
  return stats;
}

/**
 * 連続正解数を更新
 * @param {boolean} isCorrect - 正解したかどうか
 */
export function updateStreak(isCorrect) {
  const stats = getAchievementStats();

  // 配列からSetに変換
  if (Array.isArray(stats.practicesLevels)) {
    stats.practicesLevels = new Set(stats.practicesLevels);
  }

  if (isCorrect) {
    stats.currentStreak++;
    if (stats.currentStreak > stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    }
  } else {
    stats.currentStreak = 0;
  }

  saveAchievementStats(stats);
}

/**
 * 獲得済みバッジを取得
 */
export function getEarnedBadges() {
  const earned = localStorage.getItem("earnedBadges");
  if (earned) {
    try {
      return JSON.parse(earned);
    } catch (e) {
      return [];
    }
  }
  return [];
}

/**
 * バッジを獲得
 * @param {string} badgeId - バッジID
 */
function earnBadge(badgeId) {
  const earnedBadges = getEarnedBadges();
  if (!earnedBadges.includes(badgeId)) {
    earnedBadges.push(badgeId);
    localStorage.setItem("earnedBadges", JSON.stringify(earnedBadges));
    return true;
  }
  return false;
}

/**
 * 新しく獲得したバッジをチェック
 * @returns {Array<Object>} 新しく獲得したバッジのリスト
 */
export function checkNewBadges() {
  const stats = getAchievementStats();
  const earnedBadges = getEarnedBadges();
  const newBadges = [];

  Object.values(BADGES).forEach((badge) => {
    if (!earnedBadges.includes(badge.id) && badge.condition(stats)) {
      if (earnBadge(badge.id)) {
        newBadges.push(badge);
      }
    }
  });

  return newBadges;
}

/**
 * バッジ獲得モーダルを表示
 * @param {Array<Object>} badges - 獲得したバッジのリスト
 */
export function showBadgeModal(badges) {
  if (badges.length === 0) return;

  const modal = document.createElement("div");
  modal.className = "badge-modal";
  modal.innerHTML = `
    <div class="badge-modal-content">
      <h2>🎉 バッジをゲットしたよ！</h2>
      <div class="badge-list">
        ${badges
          .map(
            (badge) => `
          <div class="badge-item">
            <div class="badge-emoji">${badge.emoji}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
          </div>
        `
          )
          .join("")}
      </div>
      <button class="badge-close-btn">とじる</button>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".badge-close-btn");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  // 3秒後に自動で閉じる
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 5000);
}
