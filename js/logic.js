import { multiplicationData } from "./data.js";
import {
  getWeakQuestions,
  getAdaptiveQuestion,
  getAverageAccuracy,
} from "./analytics.js";

// モジュール初期化時に全答えのユニークなリストを作成
const allAnswers = [...new Set(
  Object.values(multiplicationData).map(data => data.answer)
)];

// Fisher-Yatesシャッフルアルゴリズム
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 学習モードに応じて問題を生成
 * @param {Array} completedQuestions - 出題済み問題のリスト
 * @param {Array<number>} selectedLevels - 選択された段のリスト
 * @param {string} mode - 学習モード ("normal" | "weak" | "adaptive")
 * @returns {Object|null} 問題オブジェクト
 */
export function generateMultiplicationQuestion(
  completedQuestions,
  selectedLevels,
  mode = "normal"
) {
  if (selectedLevels.length === 0) {
    alert("少なくとも一つの段を選択してください。");
    return null;
  }

  let availableQuestions = [];
  for (const key in multiplicationData) {
    if (multiplicationData.hasOwnProperty(key)) {
      const num1 = parseInt(key.split("x")[0]);
      if (selectedLevels.includes(num1)) {
        availableQuestions.push(key);
      }
    }
  }

  if (availableQuestions.length <= completedQuestions.length) {
    completedQuestions.length = 0;
  }

  availableQuestions = availableQuestions.filter(
    (question) => !completedQuestions.includes(question),
  );

  let questionKey;

  // 学習モードに応じて問題を選択
  switch (mode) {
    case "weak":
      // 苦手克服モード: 正解率が低い問題を優先
      const weakQuestions = getWeakQuestions(availableQuestions, 5);
      if (weakQuestions.length > 0) {
        questionKey = weakQuestions[Math.floor(Math.random() * weakQuestions.length)];
      } else {
        // 苦手な問題がない場合はランダム
        questionKey =
          availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      }
      break;

    case "adaptive":
      // アダプティブラーニング: 現在の正解率に応じて難易度を調整
      const currentAccuracy = getAverageAccuracy(
        completedQuestions.slice(-10) // 直近10問の正解率を参照
      );
      // 正解率が高い場合は難しい問題、低い場合は簡単な問題を出題
      const targetAccuracy = Math.max(0.3, Math.min(0.8, currentAccuracy));
      questionKey = getAdaptiveQuestion(availableQuestions, targetAccuracy);
      break;

    default:
      // 通常モード: ランダム
      questionKey =
        availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      break;
  }

  completedQuestions.push(questionKey);

  return {
    question: questionKey.replace("x", " × ") + " = ",
    answer: multiplicationData[questionKey].answer,
    reading: multiplicationData[questionKey].reading,
    answerReading: multiplicationData[questionKey].answerReading,
    questionKey: questionKey,
  };
}

export function generateChoices(correctAnswer) {
  const choices = [correctAnswer];
  const availableAnswers = allAnswers.filter(answer => answer !== correctAnswer);

  // ランダムに3つの不正解を選択
  const shuffledAnswers = shuffleArray(availableAnswers);
  choices.push(...shuffledAnswers.slice(0, 3));

  // 最終的な選択肢をシャッフル
  return shuffleArray(choices);
}
