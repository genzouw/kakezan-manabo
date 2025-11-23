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
