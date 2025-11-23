# 推奨コマンド

このプロジェクトは純粋なHTML/CSS/JavaScriptで構成されており、ビルドやテストのコマンドは存在しません。

## 開発環境でのテスト
```bash
# ローカルサーバーを起動（Python 3を使用）
python3 -m http.server 8000

# または、Node.jsのhttp-serverを使用（グローバルインストール済みの場合）
npx http-server -p 8000
```

その後、ブラウザで `http://localhost:8000` にアクセスしてテストします。

## ファイル操作
```bash
# ファイル一覧表示
ls -la

# ファイル検索
find . -name "*.js"
find . -name "*.html"
find . -name "*.css"

# ファイル内容確認
cat main.js
cat index.html
cat style.css

# パターン検索
grep -r "function" .
grep -r "addEventListener" .
```

## Gitコマンド
```bash
# 状態確認
git status

# 変更内容確認
git diff

# ステージング
git add .

# コミット
git commit -m "feat: 🎸 新機能追加"

# プッシュ
git push origin main
```

## ブラウザ開発者ツール
- **コンソール**: JavaScriptのエラーやログを確認
- **ネットワークタブ**: リソース読み込みを確認
- **アプリケーションタブ**: localStorageの内容を確認・編集
- **要素タブ**: HTML/CSSをリアルタイムで編集・確認

## macOS固有のコマンド
```bash
# ファイルをFinderで開く
open .

# ブラウザでHTMLファイルを直接開く
open index.html
```
