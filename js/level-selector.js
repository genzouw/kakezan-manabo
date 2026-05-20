/**
 * 段選択チェックボックス UI のレンダリングを担う。
 * - HTML 側の <template id="level-checkbox-template"> をクローンして組み立てる
 * - LEVELS データ配列を元に DocumentFragment 経由で一括追加し DOM 操作を最小化
 */

import { LEVELS } from './level-data.js';

/**
 * 段選択チェックボックス群を生成して `.level-selection-grid` に挿入する
 * @returns {void}
 */
export function renderLevelCheckboxes() {
  const grid = document.querySelector('.level-selection-grid');
  const template = document.getElementById('level-checkbox-template');
  if (!grid || !template) {
    return;
  }

  grid.innerHTML = '';

  const fragment = document.createDocumentFragment();
  LEVELS.forEach((level) => {
    fragment.appendChild(createLevelCheckbox(template, level));
  });
  grid.appendChild(fragment);
}

/**
 * 1段分のチェックボックス要素を template から生成する（内部利用）
 * @param {HTMLTemplateElement} template
 * @param {{ id: number, label: string }} level
 * @returns {DocumentFragment}
 */
function createLevelCheckbox(template, level) {
  const node = template.content.cloneNode(true);

  const label = node.querySelector('.level-checkbox');
  label.dataset.level = String(level.id);

  const input = node.querySelector('input[type="checkbox"]');
  input.id = `level${level.id}`;
  input.value = String(level.id);

  const span = node.querySelector('span');
  span.textContent = level.label;

  return node;
}
