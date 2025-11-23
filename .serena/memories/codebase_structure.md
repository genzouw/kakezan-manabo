# コードベース構造

## ディレクトリ構成
```
kakezan-manabo/
├── index.html          # メインHTMLファイル
├── main.js             # JavaScriptロジック（約398行）
├── style.css           # スタイルシート
├── correct.mp3         # 正解時の効果音
└── incorrect.mp3       # 不正解時の効果音
```

## ファイル詳細

### index.html
- アプリケーションのUI構造を定義
- 主要な要素:
  - `#question`: 問題表示エリア
  - `#choices`: 4択ボタン（`.choice-btn` × 4）
  - `#start-btn`: スタートボタン
  - `#score`: スコア表示エリア
  - `#history`: ゲーム履歴表示エリア
  - `#settings`: 設定エリア（段選択チェックボックス、問題数入力）

### main.js
主要なコンポーネント:

1. **データ定義**:
   - `multiplicationData`: 九九の問題データ（1×1～9×9の81問）
   - 各問題には `reading`（読み方）、`answer`（答え）、`answerReading`（答えの読み方）を含む

2. **問題生成ロジック**:
   - `generateMultiplicationQuestion()`: 選択された段から問題をランダム生成
   - 重複回避機能（`completedQuestions` 配列で管理）

3. **UI制御**:
   - `displayQuestion()`: 問題を画面に表示
   - `generateChoices()`: 4択の選択肢を生成（正解+3つの不正解）
   - `checkAnswer()`: 選択した答えの正誤判定と画面更新

4. **音声機能**:
   - `speakQuestion()`: 問題の読み上げ（Web Speech API使用）
   - `speakAnswer()`: 答えの読み上げ（不正解時）

5. **効果音**:
   - `playCorrectSound()`: 正解音再生
   - `playIncorrectSound()`: 不正解音再生

6. **ゲーム管理**:
   - `updateScore()`: スコア表示更新
   - `endGame()`: ゲーム終了処理とlocalStorageへの保存

7. **履歴機能**:
   - `loadHistory()`: localStorageから履歴読み込み（エラーハンドリング付き）
   - `displayHistory()`: 履歴をテーブル形式で表示
   - 日付降順でソート、メダル表示機能（🥇🥈）

8. **設定機能**:
   - `loadSettings()`: localStorageから設定読み込み
   - `saveSettings()`: 設定をlocalStorageに保存

### style.css
- レスポンシブなレイアウト（Flexbox使用）
- 大きな文字サイズで視認性を重視（問題: 4em、選択肢: 2.4em）
- 履歴テーブルのスタイリング（偶数行に背景色、テキスト配置）
- タイポグラフィ: 8行目に誤字（`tet-decoration` → `text-decoration`）

## データフロー
1. ページ読み込み → `DOMContentLoaded` イベント発火
2. `loadSettings()` と `loadHistory()` で設定と履歴を復元
3. スタートボタンクリック → ゲーム開始
4. 問題生成 → 音声読み上げ → 選択肢表示
5. 答えクリック → 正誤判定 → 効果音・視覚フィードバック
6. 次の問題へ（または終了）
7. ゲーム終了 → 履歴に保存 → 履歴表示更新
