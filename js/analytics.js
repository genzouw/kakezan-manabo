/**
 * 学習分析モジュール - 問題ごとの正解率や学習傾向を管理
 */

/**
 * 問題ごとの統計情報を取得
 */
export function getQuestionStats() {
  const stats = localStorage.getItem("questionStats");
  if (stats) {
    try {
      return JSON.parse(stats);
    } catch (e) {
      return {};
    }
  }
  return {};
}

/**
 * 問題の統計情報を更新
 * @param {string} questionKey - 問題のキー（例: "2x3"）
 * @param {boolean} isCorrect - 正解したかどうか
 */
export function updateQuestionStats(questionKey, isCorrect) {
  const stats = getQuestionStats();

  if (!stats[questionKey]) {
    stats[questionKey] = {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      lastAttempt: null,
    };
  }

  stats[questionKey].attempts++;
  if (isCorrect) {
    stats[questionKey].correct++;
  } else {
    stats[questionKey].incorrect++;
  }
  stats[questionKey].lastAttempt = new Date().toISOString();

  localStorage.setItem("questionStats", JSON.stringify(stats));
}

/**
 * 問題の正解率を計算
 * @param {string} questionKey - 問題のキー
 * @returns {number} 正解率（0-1の範囲）
 */
export function getQuestionAccuracy(questionKey) {
  const stats = getQuestionStats();
  const questionStat = stats[questionKey];

  if (!questionStat || questionStat.attempts === 0) {
    return 0.5; // 未回答の場合は中立的な値
  }

  return questionStat.correct / questionStat.attempts;
}

/**
 * 苦手な問題を取得（正解率が低い順）
 * @param {Array<string>} availableQuestions - 利用可能な問題のリスト
 * @param {number} limit - 取得する問題数
 * @returns {Array<string>} 苦手な問題のリスト
 */
export function getWeakQuestions(availableQuestions, limit = 10) {
  return availableQuestions
    .map(key => ({
      key,
      accuracy: getQuestionAccuracy(key),
      attempts: (getQuestionStats()[key] || {}).attempts || 0,
    }))
    .sort((a, b) => {
      // 正解率が低い順、同じ場合は試行回数が多い順
      if (Math.abs(a.accuracy - b.accuracy) < 0.01) {
        return b.attempts - a.attempts;
      }
      return a.accuracy - b.accuracy;
    })
    .slice(0, limit)
    .map(item => item.key);
}

/**
 * 難易度に応じた問題を取得（アダプティブラーニング）
 * @param {Array<string>} availableQuestions - 利用可能な問題のリスト
 * @param {number} targetAccuracy - 目標正解率（0-1の範囲）
 * @returns {string} 選択された問題のキー
 */
export function getAdaptiveQuestion(availableQuestions, targetAccuracy = 0.7) {
  const questionsWithStats = availableQuestions.map(key => ({
    key,
    accuracy: getQuestionAccuracy(key),
    attempts: (getQuestionStats()[key] || {}).attempts || 0,
  }));

  // 目標正解率に近い問題を優先的に選択
  questionsWithStats.sort((a, b) => {
    const diffA = Math.abs(a.accuracy - targetAccuracy);
    const diffB = Math.abs(b.accuracy - targetAccuracy);

    // 差が小さい方を優先、同じ場合は試行回数が少ない方を優先
    if (Math.abs(diffA - diffB) < 0.05) {
      return a.attempts - b.attempts;
    }
    return diffA - diffB;
  });

  // 上位30%からランダムに選択（完全に固定化しないため）
  const topCandidates = questionsWithStats.slice(
    0,
    Math.max(1, Math.floor(questionsWithStats.length * 0.3))
  );

  return topCandidates[Math.floor(Math.random() * topCandidates.length)].key;
}

/**
 * 現在の学習者の平均正解率を計算
 * @param {Array<string>} questionKeys - 対象の問題キーのリスト
 * @returns {number} 平均正解率（0-1の範囲）
 */
export function getAverageAccuracy(questionKeys) {
  if (questionKeys.length === 0) return 0.5;

  const accuracies = questionKeys.map(key => getQuestionAccuracy(key));
  return accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
}
