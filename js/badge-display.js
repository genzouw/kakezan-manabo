/**
 * バッジ表示UI
 */

import { BADGES, getEarnedBadges, getAchievementStats } from "./badges.js";

/**
 * バッジコレクション画面を表示
 */
export function displayBadgeCollection() {
  const badgesDiv = document.getElementById("badges");
  if (!badgesDiv) return;

  const earnedBadges = getEarnedBadges();
  const stats = getAchievementStats();

  badgesDiv.innerHTML = "";

  const container = document.createElement("div");
  container.className = "badge-collection";

  Object.values(BADGES).forEach((badge) => {
    const isEarned = earnedBadges.includes(badge.id);
    const badgeElement = document.createElement("div");
    badgeElement.className = `badge-card ${isEarned ? "earned" : "locked"}`;

    badgeElement.innerHTML = `
      <div class="badge-emoji">${isEarned ? badge.emoji : "🔒"}</div>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-description">${badge.description}</div>
      ${!isEarned ? '<div class="badge-locked-text">未獲得</div>' : ""}
    `;

    container.appendChild(badgeElement);
  });

  // 統計情報を表示
  const statsElement = document.createElement("div");
  statsElement.className = "achievement-stats";
  statsElement.innerHTML = `
    <h3>あなたの記録</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">${stats.gamesPlayed || 0}</div>
        <div class="stat-label">プレイ回数</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.perfectGames || 0}</div>
        <div class="stat-label">全問正解</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.maxStreak || 0}</div>
        <div class="stat-label">最高連続正解</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.consecutiveDays || 0}</div>
        <div class="stat-label">連続学習日数</div>
      </div>
    </div>
  `;

  badgesDiv.appendChild(statsElement);
  badgesDiv.appendChild(container);
}
