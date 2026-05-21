import { multiplicationData } from './data.js';
import {
  getWeakQuestions,
  getAdaptiveQuestion,
  getAverageAccuracy,
} from './analytics.js';

// モジュール初期化時に全答えのユニークなリストを作成
const allAnswers = [
  ...new Set(Object.values(multiplicationData).map((data) => data.answer)),
];

// 定数の定義
const WEAK_QUESTIONS_LIMIT = 5; // 苦手克服モードでの参照上限数
const RECENT_QUESTIONS_COUNT = 10; // アダプティブラーニングで直近参照する問題数
const MIN_TARGET_ACCURACY = 0.3; // 目標正解率の下限値
const MAX_TARGET_ACCURACY = 0.8; // 目標正解率の上限値
const INCORRECT_CHOICES_COUNT = 3; // 生成する不正解の選択肢数

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
  mode = 'normal',
) {
  if (selectedLevels.length === 0) {
    alert('少なくとも一つの段を選択してください。');
    return null;
  }

  let availableQuestions = Object.keys(multiplicationData).filter((key) => {
    const num1 = Number.parseInt(key.split('x')[0], 10);
    return selectedLevels.includes(num1);
  });

  if (availableQuestions.length <= completedQuestions.length) {
    completedQuestions.length = 0;
  }

  availableQuestions = availableQuestions.filter(
    (question) => !completedQuestions.includes(question),
  );

  let questionKey;

  // 学習モードに応じて問題を選択
  switch (mode) {
    case 'weak': {
      // 苦手克服モード: 正解率が低い問題を優先
      const weakQuestions = getWeakQuestions(
        availableQuestions,
        WEAK_QUESTIONS_LIMIT,
      );
      if (weakQuestions.length > 0) {
        questionKey =
          weakQuestions[Math.floor(Math.random() * weakQuestions.length)];
      } else {
        // 苦手な問題がない場合はランダム
        questionKey =
          availableQuestions[
            Math.floor(Math.random() * availableQuestions.length)
          ];
      }
      break;
    }

    case 'adaptive': {
      // アダプティブラーニング: 現在の正解率に応じて難易度を調整
      const currentAccuracy = getAverageAccuracy(
        completedQuestions.slice(-RECENT_QUESTIONS_COUNT), // 直近参照問題数
      );
      // 正解率が高い場合は難しい問題、低い場合は簡単な問題を出題
      const targetAccuracy = Math.max(
        MIN_TARGET_ACCURACY,
        Math.min(MAX_TARGET_ACCURACY, currentAccuracy),
      );
      questionKey = getAdaptiveQuestion(availableQuestions, targetAccuracy);
      break;
    }

    default:
      // 通常モード: ランダム
      questionKey =
        availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ];
      break;
  }

  completedQuestions.push(questionKey);

  return {
    question: questionKey.replace('x', ' × ') + ' = ',
    answer: multiplicationData[questionKey].answer,
    reading: multiplicationData[questionKey].reading,
    answerReading: multiplicationData[questionKey].answerReading,
    questionKey: questionKey,
  };
}

export function generateChoices(correctAnswer) {
  const choices = [correctAnswer];
  const availableAnswers = allAnswers.filter(
    (answer) => answer !== correctAnswer,
  );

  // ランダムに不正解を選択
  const shuffledAnswers = shuffleArray(availableAnswers);
  choices.push(...shuffledAnswers.slice(0, INCORRECT_CHOICES_COUNT));

  // 最終的な選択肢をシャッフル
  return shuffleArray(choices);
}
