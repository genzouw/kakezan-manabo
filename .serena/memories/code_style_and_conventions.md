# コードスタイルと規約

## JavaScript
- **変数宣言**: `const` と `let` を使用（`var` は不使用）
- **命名規則**:
  - キャメルケース（camelCase）を使用
  - 定数オブジェクトは `multiplicationData` のような名前
  - DOM要素の変数名には `Div`, `Button` などの接尾辞を使用
- **インデント**: スペース2個
- **文字列**: ダブルクォート使用
- **関数**: 従来の関数宣言（`function functionName() {}`）と無名関数を併用
- **非同期処理**: `async/await` と `Promise` を使用
- **コメント**: 日本語でコメントを記述
- **コード構造**:
  - グローバル変数は最小限に抑える（`multiplicationData`, `totalQuestions`）
  - DOMContentLoadedイベント内で主要なロジックを実装
  - イベントリスナーを適切に登録

## HTML
- **DOCTYPE**: HTML5 (`<!doctype html>`)
- **言語**: 日本語 (`lang="ja"`)
- **セマンティックHTML**: 適切なタグを使用
- **ID命名**: ハイフン区切り（kebab-case）: `start-btn`, `question-count`
- **クラス命名**: ハイフン区切り（kebab-case）: `choice-btn`, `history-table`

## CSS
- **セレクタ**: ID、クラス、タグセレクタを適切に使用
- **プロパティ順序**: 特定の順序なし（機能ごとにグループ化）
- **単位**: `em`（相対単位）と`px`（固定単位）を併用
- **色**: カラーネーム（`lightgreen`, `pink`）と16進数カラーコード（`#f0f0f0`）を併用
- **レイアウト**: Flexboxを使用

## ベストプラクティス
- ローカルストレージの読み込み時は例外処理を実施
- イベントリスナーは適切なタイミングで登録
- DOM操作は必要最小限に
- 関数は単一責任の原則に従う
