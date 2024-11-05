# 最低限の React の始め方
本プロジェクト `basic` は、React の基本的な概要と動作を理解するためのサブプロジェクト。
このファイルがある階層で、以下の手順を実施していくことで、サンプルコードと同様の成果物が作れる。

`basic` では、主に **環境構築** と最低限の説明に限定した内容となっており、React の基本概念に関するコーディングにおける説明は、他のサブプロジェクトで説明する。

## 前提
- インターネットに接続されていること
- Node.js がマシンにインストール済みであること
- 本記事で JavaScript を "JS" と表記することがあるため注意すること

## 事前準備

開発用のプロジェクトディレクトリを作成
```bash
mkdir demo-app
```

作成したディレクトリに移動
```bash
cd demo-app
```

package.json を生成する（ディレクトリ名を名称とし、勝手に中身ができる）
```bash
npm init -y
```

.gitignore を用意して不要なコミットをしないようにする
```bash
touch .gitignore
```

.gitignore ファイルの中身は以下の通りに書いて保存する
```
node_modules
```

## トップページの画面作成

HTML ファイルとJSファイルを用意する
```bash
touch {index.html,script.js}
```

トップページとして、以下の通りに HTML の中身を書く（インデントは「半角スペース4個分」に設定しておく）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Demo</title>
</head>
<body>
  <!-- ブラウザが JS 無効だった場合のための表示 -->
  <noscript>JavaScript が利用できないブラウザ環境です</noscript>
  <!-- React で利用するルート要素 -->
  <div id="root"></div>
  <!-- モジュラーな JavaScript として定義 (ES6 の ES モジュール宣言) -->
  <script src="./script.js" type="module"></script>
</body>
</html>
```


## React の導入（CDN 利用方式）

title の下に CDN で React の読み込みを追加する（CDN - unpkg を利用）
```html
<head>
  :
  <title>React Demo</title>
  <!-- React と ReactDOM の CDN を追加 -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
```

JS 処理を書く
```js
const { createRoot } = ReactDOM;

// ブラウザの DOM ノード内に react コンポーネントのルートを作成
const root = createRoot(document.getElementById('root'));
// react ノードをレンダリング（＝表示）する
root.render(<h1>Hello, React!!</h1>);
```


## トランスパイラの導入
react, react-dom を導入しただけでは、JSX 記法で react コンポーネントを「書く」ことはできるが、JSX をブラウザに解釈させて「動かす（＝表示させる）」ことができない。
これをブラウザが解釈できる状態に変換（＝トランスパイル）するツールを導入する。
今回は、トランスパイラとして **Babel** を採用する。

babel のコアモジュールと react 用のプリセットを導入する
```bash
# 開発用依存関係としてインストール
npm install --seve-dev @babel/core @babel/cli @babel/preset-react
# または
npm i -D @babel/core @babel/cli @babel/preset-react
```

babel の設定ファイルを用意する
```bash
touch babel.config.json
```

設定ファイルの中身を書く
```json
{
  "presets": ["@babel/preset-react"]
}
```

トランスパイルを実行する処理をスクリプト一覧に追加する
```json
"scripts": {
  // 既存のスクリプトは省略

  "trans": "babel script.js --out-file compiled.js" // 追加
}
```

実行する
```bash
npm run trans
```

画面表示の準備として、トランスパイル後の JavaScript を読み込むように、HTML ファイルのスクリプト参照を変更しておく
```html
<body>
  :
  <!-- script タグのソースを script.js から compiled.js に変更 -->
  <script src="./compiled.js" type="module"></script>
</body>
```

## ローカル用開発サーバの導入
type="module" 指定による ES Module を使う方法では、セキュリティ上の理由から、ブラウザがローカルファイルシステムからの JavaScript モジュールの読み込みを制限するためうまく動かない。
そのため、ローカルでも使用できるように開発サーバを導入する。

lite-server を導入する
```bash
npm install --save-dev lite-server
# または
npm i -D npm lite-server
```

起動処理をスクリプト一覧に追加する（`lite-server` コマンドだけでも良いが、必ず事前にトランスパイルするように定義しておく）
```json
"scripts": {
  // 既存のスクリプトは省略

  "dev": "npm run trans && lite-server" // 追加
}
```

lite-server は内部で "BrowserSync" というツールを利用しており、その動作に必要な設定ファイルを用意する

設定ファイルを以下のファイル名で用意する
```bash
touch bs-config.json
```

bs-config.json の中身を書く
```js
{
  "server": {
    "baseDir": "./"
  }
}
```

中身の書き方は、json の他に js ファイルでも用意できる（どちらかで良い）
```js
module.exports = {
  server: {
    baseDir: "./"
  }
};
```

ブラウザで表示確認する
```bash
# 開発サーバを起動
npm run dev
```

→ Web ブラウザを開いて `http://localhost:3000` にアクセスし、"Hello, React!!" と表示されていれは成功（自動で立ち上がる場合もある）

失敗している場合、ブラウザの「開発者ツール」を開いて「コンソール」表示でエラーの内容を確認し、理由や対処法をネットで検索したり、AI に尋ねたりしよう！

（Optional）独自のファイル名で bs-config を用意する場合は、以下の様に設定ファイルを指定できる
```bash
lite-server -c configs/my-bs-config.js
```

## サーバ停止方法
起動中の開発用サーバを止める場合、ターミナルのウィンドウ内で、"Control (Ctrl) + C" を押すことでサーバが停止する

## JSX ファイルに置き換える
ファイル名の末尾にある「拡張子」とは、そのファイルの中身な何であるかを伝えるためのもの。
トランスパイル前の `.js` ファイルは、実際には中身が JS ではなく JSX の記法であるため、`.jsx` の拡張子にすべきである。

対象の JS ファイルの拡張子を JSX ファイルに変更する（トランスパイル後のファイルは JS であるため変えない）
```bash
mv script.js script.jsx
```

トランスパイル時の内容も、正しい拡張子に修正する
```json
"scripts": {
  // 省略

  "trans": "babel script.jsx --out-file compiled.js", // jsx に変更
}
```

問題なく動作するか、もう一度確認する
```bash
npm run dev
```

ブラウザでの表示確認ができれば、React を動かす最低限の環境構築は問題ない（ただし、開発作業のための環境であり、本番環境で利用できるものではないことに注意する）。
