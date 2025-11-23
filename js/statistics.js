/**
 * 学習統計モジュール
 */

import { getQuestionStats } from "./analytics.js";
import { loadHistory } from "./storage.js";

/**
 * 段ごとの正解率を計算
 */
export function calculateAccuracyByLevel() {
  const stats = getQuestionStats();
  const levelStats = {};

  for (let level = 1; level <= 9; level++) {
    levelStats[level] = {
      total: 0,
      correct: 0,
      accuracy: 0,
    };
  }

  Object.keys(stats).forEach((key) => {
    const level = parseInt(key.split("x")[0]);
    const questionStat = stats[key];

    if (levelStats[level]) {
      levelStats[level].total += questionStat.attempts;
      levelStats[level].correct += questionStat.correct;
    }
  });

  // 正解率を計算
  for (let level = 1; level <= 9; level++) {
    if (levelStats[level].total > 0) {
      levelStats[level].accuracy =
        (levelStats[level].correct / levelStats[level].total) * 100;
    }
  }

  return levelStats;
}

/**
 * 週間・月間の学習時間を計算
 */
export function calculateStudyTime() {
  const history = loadHistory();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let weekCount = 0;
  let monthCount = 0;

  history.forEach((game) => {
    const gameDate = new Date(game.date);
    if (gameDate >= weekAgo) {
      weekCount++;
    }
    if (gameDate >= monthAgo) {
      monthCount++;
    }
  });

  return {
    week: weekCount,
    month: monthCount,
  };
}

/**
 * 苦手な問題トップ5を取得
 */
export function getWeakestQuestions() {
  const stats = getQuestionStats();
  const questions = [];

  Object.keys(stats).forEach((key) => {
    const questionStat = stats[key];
    if (questionStat.attempts > 0) {
      const accuracy = (questionStat.correct / questionStat.attempts) * 100;
      questions.push({
        question: key.replace("x", " × "),
        accuracy: accuracy,
        attempts: questionStat.attempts,
      });
    }
  });

  // 正解率が低い順にソート、試行回数が3回以上のものを対象
  return questions
    .filter((q) => q.attempts >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);
}

/**
 * 日別の学習履歴を取得
 */
export function getDailyHistory(days = 7) {
  const history = loadHistory();
  const now = new Date();
  const dailyData = {};

  // 過去N日分の日付を初期化
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = date.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    });
    dailyData[dateKey] = {
      games: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
    };
  }

  // ゲーム履歴を集計
  history.forEach((game) => {
    const gameDate = new Date(game.date);
    const dateKey = gameDate.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    });

    if (dailyData[dateKey]) {
      dailyData[dateKey].games++;
      dailyData[dateKey].totalQuestions += game.totalQuestions;
      dailyData[dateKey].correctAnswers += game.correctAnswers;
    }
  });

  // 正解率を計算
  Object.keys(dailyData).forEach((dateKey) => {
    const data = dailyData[dateKey];
    if (data.totalQuestions > 0) {
      data.accuracy = (data.correctAnswers / data.totalQuestions) * 100;
    }
  });

  return dailyData;
}

/**
 * 時間帯別の正解率を計算
 */
export function getAccuracyByTimeOfDay() {
  const history = loadHistory();
  const timeSlots = {
    morning: { total: 0, correct: 0, label: "朝 (6-12時)" },
    afternoon: { total: 0, correct: 0, label: "昼 (12-18時)" },
    evening: { total: 0, correct: 0, label: "夜 (18-24時)" },
    night: { total: 0, correct: 0, label: "深夜 (0-6時)" },
  };

  history.forEach((game) => {
    const gameDate = new Date(game.date);
    const hour = gameDate.getHours();
    let slot;

    if (hour >= 6 && hour < 12) {
      slot = "morning";
    } else if (hour >= 12 && hour < 18) {
      slot = "afternoon";
    } else if (hour >= 18 && hour < 24) {
      slot = "evening";
    } else {
      slot = "night";
    }

    timeSlots[slot].total += game.totalQuestions;
    timeSlots[slot].correct += game.correctAnswers;
  });

  return timeSlots;
}
