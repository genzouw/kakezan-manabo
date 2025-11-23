export function loadSettings() {
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
  }

  const storedMode = localStorage.getItem("learningMode");
  if (storedMode) {
    const modeSelect = document.getElementById("learningMode");
    if (modeSelect) {
      modeSelect.value = storedMode;
    }
  }

  return {
    questionCount: storedQuestionCount ? parseInt(storedQuestionCount) : 10,
    learningMode: storedMode || "normal",
  };
}

export function saveSettings() {
  const selectedLevels = Array.from(
    document.querySelectorAll('#settings input[type="checkbox"]:checked'),
  ).map((checkbox) => parseInt(checkbox.value));
  localStorage.setItem("selectedLevels", JSON.stringify(selectedLevels));

  const questionCount = document.getElementById("questionCount").value;
  localStorage.setItem("questionCount", questionCount);

  const modeSelect = document.getElementById("learningMode");
  if (modeSelect) {
    localStorage.setItem("learningMode", modeSelect.value);
  }

  return {
    questionCount: parseInt(questionCount),
    learningMode: modeSelect ? modeSelect.value : "normal",
  };
}

export function loadHistory() {
  const storedHistory = localStorage.getItem("gameHistory");
  if (storedHistory) {
    try {
      return JSON.parse(storedHistory);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function saveHistory(gameHistory) {
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}
