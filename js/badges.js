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
 * ゲーム終了時に統計を更新
 * @param {Object} gameResult - ゲーム結果
 */
export function updateAchievementStats(gameResult) {
  let stats = getAchievementStats();

  // 配列からSetに変換
  if (Array.isArray(stats.practicesLevels)) {
    stats.practicesLevels = new Set(stats.practicesLevels);
  } else if (!stats.practicesLevels) {
    stats.practicesLevels = new Set();
  }

  // ゲーム数をカウント
  stats.gamesPlayed++;

  // 全問正解チェック
  if (gameResult.correctAnswers === gameResult.totalQuestions) {
    stats.perfectGames++;
  }

  // 問題数を累計
  stats.totalQuestions += gameResult.totalQuestions;

  // 連続学習日数を更新
  const today = new Date().toDateString();
  if (stats.lastPlayDate) {
    const lastDate = new Date(stats.lastPlayDate);
    const diffTime = new Date(today) - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      stats.consecutiveDays++;
    } else if (diffDays > 1) {
      stats.consecutiveDays = 1;
    }
  } else {
    stats.consecutiveDays = 1;
  }
  stats.lastPlayDate = today;

  // 練習した段を記録
  if (gameResult.questions && gameResult.questions.length > 0) {
    gameResult.questions.forEach((questionKey) => {
      const level = parseInt(questionKey.split("x")[0]);
      stats.practicesLevels.add(level);
    });
  }

  // 全ての段を練習したかチェック
  stats.practiceAllLevels = stats.practicesLevels.size >= 9;

  // スピード記録チェック（10問を2分以内）
  if (
    gameResult.totalQuestions === 10 &&
    gameResult.duration &&
    gameResult.duration <= 120000
  ) {
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
      <h2>🎉 バッジ獲得！</h2>
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
      <button class="badge-close-btn">閉じる</button>
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
