import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // 循環的複雑度（サイクロマティックコンプレクシティ）のチェック
      // 10以下を推奨（バグ混入率25%以下）
      // 参考: https://tbpgr.hatenablog.com/entry/2015/05/15/231825
      complexity: ["error", { max: 10 }],
    },
  },
  {
    ignores: ["node_modules/**"],
  },
];
