export function updateScore(currentQuestionIndex) {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `${currentQuestionIndex + 1} 問目`;
}

export function displayHistory(gameHistory) {
  const historyDiv = document.getElementById("history");
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

    const correctAnswersCell = document.createElement("td");
    correctAnswersCell.textContent = `${result.correctAnswers === result.totalQuestions ? "🥇" : result.correctAnswers === result.totalQuestions - 1 ? "🥈" : ""}${result.correctAnswers}`;
    row.appendChild(correctAnswersCell);

    const totalQuestionsCell = document.createElement("td");
    totalQuestionsCell.textContent = result.totalQuestions;
    row.appendChild(totalQuestionsCell);

    table.appendChild(row);
  });

  historyDiv.appendChild(table);
}
