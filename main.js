const multiplicationData = {
  "1x1": { reading: "いんいちが", answer: 1, answerReading: "いち" },
  "1x2": { reading: "いんにが", answer: 2, answerReading: "に" },
  "1x3": { reading: "いんさんが", answer: 3, answerReading: "さん" },
  "1x4": { reading: "いんしが", answer: 4, answerReading: "し" },
  "1x5": { reading: "いんごが", answer: 5, answerReading: "ご" },
  "1x6": { reading: "いんろくが", answer: 6, answerReading: "ろく" },
  "1x7": { reading: "いんしちが", answer: 7, answerReading: "しち" },
  "1x8": { reading: "いんはちが", answer: 8, answerReading: "はち" },
  "1x9": { reading: "いんくが", answer: 9, answerReading: "く" },
  "2x1": { reading: "にいちが", answer: 2, answerReading: "に" },
  "2x2": { reading: "ににんが", answer: 4, answerReading: "し" },
  "2x3": { reading: "にさんが", answer: 6, answerReading: "ろく" },
  "2x4": { reading: "にしが", answer: 8, answerReading: "はち" },
  "2x5": { reading: "にご", answer: 10, answerReading: "じゅう" },
  "2x6": { reading: "にろく", answer: 12, answerReading: "じゅうに" },
  "2x7": { reading: "にしち", answer: 14, answerReading: "じゅうし" },
  "2x8": { reading: "にはち", answer: 16, answerReading: "じゅうろく" },
  "2x9": { reading: "にく", answer: 18, answerReading: "じゅうはち" },
  "3x1": { reading: "さんいちが", answer: 3, answerReading: "さん" },
  "3x2": { reading: "さんにが", answer: 6, answerReading: "ろく" },
  "3x3": { reading: "さざんが", answer: 9, answerReading: "く" },
  "3x4": { reading: "さんし", answer: 12, answerReading: "じゅうに" },
  "3x5": { reading: "さんご", answer: 15, answerReading: "じゅうご" },
  "3x6": { reading: "さぶろく", answer: 18, answerReading: "じゅうはち" },
  "3x7": { reading: "さんしち", answer: 21, answerReading: "にじゅういち" },
  "3x8": { reading: "さんぱ", answer: 24, answerReading: "にじゅうし" },
  "3x9": { reading: "さんく", answer: 27, answerReading: "にじゅうしち" },
  "4x1": { reading: "しいちが", answer: 4, answerReading: "し" },
  "4x2": { reading: "しにが", answer: 8, answerReading: "はち" },
  "4x3": { reading: "しさん", answer: 12, answerReading: "じゅうに" },
  "4x4": { reading: "しし", answer: 16, answerReading: "じゅうろく" },
  "4x5": { reading: "しご", answer: 20, answerReading: "にじゅう" },
  "4x6": { reading: "しろく", answer: 24, answerReading: "にじゅうし" },
  "4x7": { reading: "ししち", answer: 28, answerReading: "にじゅうはち" },
  "4x8": { reading: "しは", answer: 32, answerReading: "さんじゅうに" },
  "4x9": { reading: "しく", answer: 36, answerReading: "さんじゅうろく" },
  "5x1": { reading: "ごいちが", answer: 5, answerReading: "ご" },
  "5x2": { reading: "ごに", answer: 10, answerReading: "じゅう" },
  "5x3": { reading: "ごさん", answer: 15, answerReading: "じゅうご" },
  "5x4": { reading: "ごし", answer: 20, answerReading: "にじゅう" },
  "5x5": { reading: "ごご", answer: 25, answerReading: "にじゅうご" },
  "5x6": { reading: "ごろく", answer: 30, answerReading: "さんじゅう" },
  "5x7": { reading: "ごしち", answer: 35, answerReading: "さんじゅうご" },
  "5x8": { reading: "ごは", answer: 40, answerReading: "よんじゅう" },
  "5x9": { reading: "ごく", answer: 45, answerReading: "よんじゅうご" },
  "6x1": { reading: "ろくいちが", answer: 6, answerReading: "ろく" },
  "6x2": { reading: "ろくに", answer: 12, answerReading: "じゅうに" },
  "6x3": { reading: "ろくさん", answer: 18, answerReading: "じゅうはち" },
  "6x4": { reading: "ろくし", answer: 24, answerReading: "にじゅうし" },
  "6x5": { reading: "ろくご", answer: 30, answerReading: "さんじゅう" },
  "6x6": { reading: "ろくろく", answer: 36, answerReading: "さんじゅうろく" },
  "6x7": { reading: "ろくしち", answer: 42, answerReading: "よんじゅうに" },
  "6x8": { reading: "ろくは", answer: 48, answerReading: "よんじゅうはち" },
  "6x9": { reading: "ろっく", answer: 54, answerReading: "ごじゅうし" },
  "7x1": { reading: "しちいちが", answer: 7, answerReading: "しち" },
  "7x2": { reading: "しちに", answer: 14, answerReading: "じゅうし" },
  "7x3": { reading: "しちさん", answer: 21, answerReading: "にじゅういち" },
  "7x4": { reading: "しちし", answer: 28, answerReading: "にじゅうはち" },
  "7x5": { reading: "しちご", answer: 35, answerReading: "さんじゅうご" },
  "7x6": { reading: "しちろく", answer: 42, answerReading: "よんじゅうに" },
  "7x7": { reading: "しちしち", answer: 49, answerReading: "よんじゅうく" },
  "7x8": { reading: "しちは", answer: 56, answerReading: "ごじゅうろく" },
  "7x9": { reading: "しちく", answer: 63, answerReading: "ろくじゅうさん" },
  "8x1": { reading: "はちいちが", answer: 8, answerReading: "はち" },
  "8x2": { reading: "はちに", answer: 16, answerReading: "じゅうろく" },
  "8x3": { reading: "はちさん", answer: 24, answerReading: "にじゅうし" },
  "8x4": { reading: "はちし", answer: 32, answerReading: "さんじゅうに" },
  "8x5": { reading: "はちご", answer: 40, answerReading: "よんじゅう" },
  "8x6": { reading: "はちろく", answer: 48, answerReading: "よんじゅうはち" },
  "8x7": { reading: "はちしち", answer: 56, answerReading: "ごじゅうろく" },
  "8x8": { reading: "はっぱ", answer: 64, answerReading: "ろくじゅうし" },
  "8x9": { reading: "はちく", answer: 72, answerReading: "ななじゅうに" },
  "9x1": { reading: "くいちが", answer: 9, answerReading: "く" },
  "9x2": { reading: "くに", answer: 18, answerReading: "じゅうはち" },
  "9x3": { reading: "くさん", answer: 27, answerReading: "にじゅうしち" },
  "9x4": { reading: "くし", answer: 36, answerReading: "さんじゅうろく" },
  "9x5": { reading: "くご", answer: 45, answerReading: "よんじゅうご" },
  "9x6": { reading: "くろく", answer: 54, answerReading: "ごじゅうし" },
  "9x7": { reading: "くしち", answer: 63, answerReading: "ろくじゅうさん" },
  "9x8": { reading: "くは", answer: 72, answerReading: "ななじゅうに" },
  "9x9": { reading: "くく", answer: 81, answerReading: "はちじゅういち" },
};
let totalQuestions = 10;

document.addEventListener("DOMContentLoaded", function () {
  const questionDiv = document.getElementById("question");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const startButton = document.getElementById("start-btn");
  const scoreDiv = document.getElementById("score");
  const historyDiv = document.getElementById("history");

  let currentQuestion;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  const completedQuestions = [];
  const gameHistory = [];

  function generateMultiplicationQuestion() {
    const selectedLevels = Array.from(
      document.querySelectorAll('#settings input[type="checkbox"]:checked'),
    ).map((checkbox) => parseInt(checkbox.value));

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

  function displayQuestion() {
    currentQuestion = generateMultiplicationQuestion();
    if (currentQuestion === null) {
      return;
    }
    questionDiv.textContent = currentQuestion.question;
    speakQuestion(currentQuestion.reading);
    generateChoices();
    choiceButtons.forEach((button) => {
      button.style.backgroundColor = "#f0f0f0";
      button.style.opacity = 1;
    });
  }

  function speakQuestion(questionReading) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = questionReading;
      utterance.voice = speechSynthesis.getVoices().filter(function (n) {
        return n.name == "Google 日本語";
      })[0];
      utterance.lang = "ja-JP";
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });
  }

  function generateChoices() {
    const correctAnswer = currentQuestion.answer;
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
    choiceButtons.forEach((button, index) => {
      button.textContent = choices[index];
      button.onclick = () => checkAnswer(choices[index]);
    });
  }

  function speakAnswer(answerReading) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = answerReading;
    utterance.voice = speechSynthesis.getVoices().filter(function (n) {
      return n.name == "Google 日本語";
    })[0];
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  }

  function checkAnswer(selectedAnswer) {
    choiceButtons.forEach((button) => {
      button.disabled = true;
    });
    const selectedButton = Array.from(choiceButtons).find(
      (button) => button.textContent == selectedAnswer,
    );
    const correctAnswer = currentQuestion.answer;
    const correctAnswerButton = Array.from(choiceButtons).find(
      (button) => button.textContent == correctAnswer,
    );

    correctAnswerButton.style.backgroundColor = "lightgreen";
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      playCorrectSound();
    } else {
      selectedButton.style.backgroundColor = "pink";
      playIncorrectSound();
      speakAnswer(currentQuestion.answerReading);
    }

    setTimeout(async () => {
      currentQuestionIndex++;
      updateScore();
      choiceButtons.forEach((button) => {
        button.disabled = false;
      });
      if (currentQuestionIndex < totalQuestions) {
        await displayQuestion();
      } else {
        endGame();
      }
    }, 2000);
  }

  function playCorrectSound() {
    const correctSound = new Audio("correct.mp3");
    correctSound.play();
  }

  function playIncorrectSound() {
    const incorrectSound = new Audio("incorrect.mp3");
    incorrectSound.play();
  }

  function updateScore() {
    scoreDiv.textContent = `${currentQuestionIndex + 1} 問目`;
  }

  function endGame() {
    const gameResult = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleString(),
      questions: gameHistory.map((history) => history.question),
    };

    gameHistory.push(gameResult);
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
    displayHistory();
    questionDiv.textContent = `正解数は ${correctAnswers} でした！`;
    choiceButtons.forEach((button) => (button.style.display = "none"));
    startButton.style.display = "inline-block";
  }

  function loadHistory() {
    const storedHistory = localStorage.getItem("gameHistory");
    if (storedHistory) {
      // 例外発生時には空の配列を返す
      try {
        gameHistory = JSON.parse(storedHistory);
      } catch (e) {
        gameHistory = [];
      }
    }
  }

  function displayHistory() {
    // 一度領域をすべてクリアする
    historyDiv.innerHTML = "";
    const filteredHistory = gameHistory
      .filter((result) => result.date !== undefined)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    if (filteredHistory.length === 0) {
      historyDiv.textContent = "まだ履歴はありません。";
      return;
    }

    const table = document.createElement("table");
    table.classList.add("history-table");
    const headerRow = document.createElement("tr");
    // TODO: 問題の範囲を表示する
    // const headers = ["日付", "正解数", "問題数", "問題の範囲"];
    const headers = ["日付", "正解数", "問題数"];
    headers.forEach((headerText) => {
      const header = document.createElement("th");
      header.textContent = headerText;
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    filteredHistory.forEach((result) => {
      const row = document.createElement("tr");

      const formattedDate = new Date(result.date)
        .toLocaleString("ja-JP", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(/\//g, "/");
      const dateCell = document.createElement("td");
      dateCell.textContent = formattedDate;
      row.appendChild(dateCell);

      row.appendChild(dateCell);

      const correctAnswersCell = document.createElement("td");
      correctAnswersCell.textContent = `${result.correctAnswers === result.totalQuestions ? "🥇" : result.correctAnswers === result.totalQuestions - 1 ? "🥈" : ""}${result.correctAnswers}`;
      row.appendChild(correctAnswersCell);

      const totalQuestionsCell = document.createElement("td");
      totalQuestionsCell.textContent = result.totalQuestions;
      row.appendChild(totalQuestionsCell);

      // TODO: 問題の範囲を表示する
      // const questionsCell = document.createElement("td");
      // questionsCell.textContent = "";
      // row.appendChild(questionsCell);

      table.appendChild(row);
    });

    historyDiv.appendChild(table);
  }

  startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    startButton.style.display = "none";
    choiceButtons.forEach((button) => (button.style.display = "inline-block"));
    displayQuestion();
    updateScore();
  });

  loadSettings();
  loadHistory();
  displayHistory();
  document
    .querySelectorAll('#settings input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", saveSettings);
    });
  document
    .getElementById("questionCount")
    .addEventListener("change", saveSettings);
});

function loadSettings() {
  const storedLevels = localStorage.getItem("selectedLevels");
  if (storedLevels) {
    const selectedLevels = JSON.parse(storedLevels);
    document
      .querySelectorAll('#settings input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = selectedLevels.includes(parseInt(checkbox.value));
      });
  }

  const storedQuestionCount = localStorage.getItem("questionCount");
  if (storedQuestionCount) {
    document.getElementById("questionCount").value = storedQuestionCount;
    totalQuestions = parseInt(storedQuestionCount);
  }
}

function saveSettings() {
  const selectedLevels = Array.from(
    document.querySelectorAll('#settings input[type="checkbox"]:checked'),
  ).map((checkbox) => parseInt(checkbox.value));
  localStorage.setItem("selectedLevels", JSON.stringify(selectedLevels));

  const questionCount = document.getElementById("questionCount").value;
  localStorage.setItem("questionCount", questionCount);
  totalQuestions = parseInt(questionCount);
}
