/**
 * 段選択リスト用のデータ。
 * 表示名（label）も含めてここで一元管理することで、
 * UI側のテンプレートは「データを当てはめるだけ」になる。
 * 将来的にアイコンや難易度などのメタ情報を追加する際も、
 * 各要素にプロパティを足すだけで UI に反映される。
 */
export const LEVELS = [
  { id: 1, label: '1のだん', icon: '🐶' },
  { id: 2, label: '2のだん', icon: '🐱' },
  { id: 3, label: '3のだん', icon: '🐰' },
  { id: 4, label: '4のだん', icon: '🐻' },
  { id: 5, label: '5のだん', icon: '🦊' },
  { id: 6, label: '6のだん', icon: '🐼' },
  { id: 7, label: '7のだん', icon: '🐯' },
  { id: 8, label: '8のだん', icon: '🦁' },
  { id: 9, label: '9のだん', icon: '🐵' },
];
