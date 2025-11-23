/**
 * UIヘルパー関数 - 学習モードの説明文など
 */

const MODE_DESCRIPTIONS = {
  normal: "ランダムに問題を出題します",
  weak: "正解率が低い問題を優先的に出題します",
  adaptive: "現在の正解率に応じて難易度を自動調整します",
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
