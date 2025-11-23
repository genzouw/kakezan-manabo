import { multiplicationData } from "./data.js";

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
