import { getCurrentLevel, getProgressToNextLevel } from "./character.js";

export function updateQuestionProgress(currentQuestionIndex) {
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

/**
 * まちがいノートを表示
 * @param {Array<{questionKey: string, consecutiveCorrect: number}>} mistakes
 */
export function displayMistakeNotebook(mistakes) {
  const notebookDiv = document.getElementById("mistake-notebook");
  if (!notebookDiv) {
    return;
  }

  notebookDiv.innerHTML = "";

  if (mistakes.length === 0) {
    notebookDiv.textContent = "まだ間違えた問題はありません。がんばっています！";
    return;
  }

  const container = document.createElement("div");
  container.classList.add("mistake-cards");

  mistakes.forEach((mistake) => {
    const card = document.createElement("div");
    card.classList.add("mistake-card");

    const questionText = document.createElement("div");
    questionText.classList.add("mistake-question");
    const parts = mistake.questionKey.split("x");
    questionText.textContent = `${parts[0]} × ${parts[1]}`;
    card.appendChild(questionText);

    const progress = document.createElement("div");
    progress.classList.add("mistake-progress");
    const stars = "⭐".repeat(mistake.consecutiveCorrect) + "☆".repeat(3 - mistake.consecutiveCorrect);
    progress.textContent = `れんぞくせいかい: ${stars}`;
    card.appendChild(progress);

    const helpText = document.createElement("div");
    helpText.classList.add("mistake-help");
    helpText.textContent = "3回つづけてせいかいすると、そつぎょうできるよ！";
    card.appendChild(helpText);

    container.appendChild(card);
  });

  notebookDiv.appendChild(container);
}

/**
 * キャラクターを表示
 * @param {number} xp - 現在のXP
 */
export function displayCharacter(xp) {
  const characterDiv = document.getElementById("character");
  if (!characterDiv) {
    return;
  }

  const currentLevel = getCurrentLevel(xp);
  const progress = getProgressToNextLevel(xp);

  characterDiv.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("character-container");

  // キャラクターの絵文字表示
  const emojiDiv = document.createElement("div");
  emojiDiv.classList.add("character-emoji");
  emojiDiv.textContent = currentLevel.emoji;
  container.appendChild(emojiDiv);

  // レベル名表示
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("character-name");
  nameDiv.textContent = currentLevel.name;
  container.appendChild(nameDiv);

  // XP表示
  const xpDiv = document.createElement("div");
  xpDiv.classList.add("character-xp");
  xpDiv.textContent = `XP: ${xp}`;
  container.appendChild(xpDiv);

  // 進捗バー
  if (progress.nextLevel) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("character-progress-bar");

    const progressFill = document.createElement("div");
    progressFill.classList.add("character-progress-fill");
    progressFill.style.width = `${progress.progress}%`;
    progressBar.appendChild(progressFill);

    container.appendChild(progressBar);

    const progressText = document.createElement("div");
    progressText.classList.add("character-progress-text");
    progressText.textContent = `つぎのレベルまで: あと ${progress.remainingXP} XP`;
    container.appendChild(progressText);
  } else {
    const maxLevelText = document.createElement("div");
    maxLevelText.classList.add("character-max-level");
    maxLevelText.textContent = "さいこうレベル！";
    container.appendChild(maxLevelText);
  }

  characterDiv.appendChild(container);
}

/**
 * レベルアップモーダルを表示
 * @param {Object} newLevel - 新しいレベル情報
 */
export function showLevelUpModal(newLevel) {
  // 既存のモーダルを削除
  const existingModal = document.getElementById("levelup-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "levelup-modal";
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content", "levelup-content");

  const title = document.createElement("h2");
  title.textContent = "🎉 レベルアップ！";
  modalContent.appendChild(title);

  const emoji = document.createElement("div");
  emoji.classList.add("levelup-emoji");
  emoji.textContent = newLevel.emoji;
  modalContent.appendChild(emoji);

  const levelName = document.createElement("div");
  levelName.classList.add("levelup-name");
  levelName.textContent = newLevel.name;
  modalContent.appendChild(levelName);

  const message = document.createElement("div");
  message.classList.add("levelup-message");
  message.textContent = newLevel.message;
  modalContent.appendChild(message);

  const closeButton = document.createElement("button");
  closeButton.textContent = "やったね！";
  closeButton.classList.add("modal-close-btn");
  modalContent.appendChild(closeButton);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // 3秒後に自動的に閉じる
  const MODAL_AUTO_CLOSE_DELAY_MS = 3000;
  const timeoutId = setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, MODAL_AUTO_CLOSE_DELAY_MS);

  // 閉じるボタンの処理
  closeButton.onclick = () => {
    clearTimeout(timeoutId);
    modal.remove();
  };
}
