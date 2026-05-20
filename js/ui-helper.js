/**
 * UIヘルパー関数 - 学習モードの説明文など
 */

const MODE_DESCRIPTIONS = {
  normal: "いろいろなもんだいがでるよ",
  weak: "にがてなもんだいをたくさんれんしゅうするよ",
  adaptive: "きみにぴったりのもんだいがでるよ",
};

/**
 * 学習モードの説明文を更新
 */
export function updateModeDescription() {
  const modeSelect = document.getElementById("learningMode");
  const descriptionSpan = document.getElementById("modeDescription");

  if (modeSelect && descriptionSpan) {
    const selectedMode = modeSelect.value;
    descriptionSpan.textContent = MODE_DESCRIPTIONS[selectedMode] || "";
  }
}

/**
 * 設定オブジェクトをDOMへ反映する
 * @param {import('./storage.js').Settings} settings
 */
export function applySettingsToDOM(settings) {
  if (settings.selectedLevels) {
    document
      .querySelectorAll('#settings input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = settings.selectedLevels.includes(
          parseInt(checkbox.value),
        );
      });
  }

  const questionCountInput = document.getElementById("questionCount");
  if (questionCountInput) {
    questionCountInput.value = String(settings.questionCount);
  }

  const modeSelect = document.getElementById("learningMode");
  if (modeSelect) {
    modeSelect.value = settings.learningMode;
  }
}

/**
 * DOMから設定オブジェクトを読み取る
 * @returns {import('./storage.js').Settings}
 */
export function readSettingsFromDOM() {
  const selectedLevels = Array.from(
    document.querySelectorAll('#settings input[type="checkbox"]:checked'),
  ).map((checkbox) => parseInt(checkbox.value));

  const questionCountInput = document.getElementById("questionCount");
  const parsedQuestionCount = Number.parseInt(
    questionCountInput?.value ?? "",
    10,
  );
  const questionCount =
    Number.isFinite(parsedQuestionCount) && parsedQuestionCount > 0
      ? parsedQuestionCount
      : 10;

  const modeSelect = document.getElementById("learningMode");
  const learningMode = modeSelect ? modeSelect.value : "normal";

  return { selectedLevels, questionCount, learningMode };
}
