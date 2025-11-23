import { multiplicationData } from "./data.js";

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

export function generateMultiplicationQuestion(completedQuestions, selectedLevels) {
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

  const questionKey =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

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
