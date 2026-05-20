import globals from 'globals';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // chart.js は CDN 経由でグローバル変数 Chart として読み込まれる
        Chart: 'readonly',
      },
    },
    rules: {
      // 循環的複雑度（サイクロマティックコンプレクシティ）のチェック
      // 10以下を推奨（バグ混入率25%以下）
      // 参考: https://tbpgr.hatenablog.com/entry/2015/05/15/231825
      complexity: ['error', { max: 10 }],
    },
  },
  {
    ignores: ['node_modules/**'],
  },
  // Prettier との競合ルールを無効化（必ず配列の最後に置く）
  prettierConfig,
];
