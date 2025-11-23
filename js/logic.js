import { multiplicationData } from "./data.js";

/**
 * 選択されたレベル（段）に基づいて問題を生成する純粋関数
 * @param {number[]} selectedLevels - 選択された段の配列（例: [1, 2, 3]）
 * @param {string[]} completedQuestions - 既に出題された問題のキー配列
 * @returns {{question: string, answer: number, reading: string, answerReading: string, questionKey: string} | null}
 */
export function generateMultiplicationQuestion(
  selectedLevels,
  completedQuestions,
) {
  if (!selectedLevels || selectedLevels.length === 0) {
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

  // すべての問題を出題し終えたらリセット
  const remainingQuestions = availableQuestions.filter(
    (question) => !completedQuestions.includes(question),
  );

  const questionsToUse =
    remainingQuestions.length > 0 ? remainingQuestions : availableQuestions;

  const questionKey =
    questionsToUse[Math.floor(Math.random() * questionsToUse.length)];

  return {
    question: questionKey.replace("x", " × ") + " = ",
    answer: multiplicationData[questionKey].answer,
    reading: multiplicationData[questionKey].reading,
    answerReading: multiplicationData[questionKey].answerReading,
    questionKey: questionKey,
  };
}

/**
 * 選択肢を生成する純粋関数
 * @param {number} correctAnswer - 正解の数値
 * @returns {number[]} 4つの選択肢の配列
 */
export function generateChoices(correctAnswer) {
  const choices = [correctAnswer];
  const allAnswers = [];

  for (const key in multiplicationData) {
    if (multiplicationData.hasOwnProperty(key)) {
      const answer = multiplicationData[key].answer;
      if (answer !== correctAnswer) {
        allAnswers.push(answer);
      }
    }
  }

  while (choices.length < 4) {
    const randomIndex = Math.floor(Math.random() * allAnswers.length);
    const randomChoice = allAnswers[randomIndex];
    if (!choices.includes(randomChoice)) {
      choices.push(randomChoice);
    }
  }

  choices.sort(() => Math.random() - 0.5);
  return choices;
}
