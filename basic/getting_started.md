# 最低限の React の始め方
本プロジェクト `basic` は、React の基本的な概要と動作を理解するためのサブプロジェクト。
このファイルがある階層で、以下の手順を実施していくことで、サンプルコードと同様の成果物が作れる。

`basic` では、主に **環境構築** と最低限の説明に限定した内容となっており、React の基本概念に関するコーディングにおける説明は、他のサブプロジェクトで説明する。

## 前提
- HTML/CSS/JS の基礎・入門的な内容を理解した人を対象としている
- インターネットに接続されていること
- Node.js がマシンにインストール済みであること
- 本記事で JavaScript を "JS" と表記することがあるため注意すること

## 全体の流れ
- 事前準備（エディタの初期設定と、作業ファイルの準備）
- 最低限の HTML ファイルと JS ファイルの用意
- React の導入方法
- React 独自の書き方をブラウザに理解させ、画面に表示させる方法（トランスパイル）
- 複数分かれた開発用ファイルを、キレイにまとめて動作させる方法（バンドル）
- 効率的な React 開発環境の準備方法（ホットリロード）

## 事前準備

エディタの「インデント（字下げ）」の設定は、デフォルトの「半角スペース4個分」から「半角スペース2個分」に変更しておく（任意）。
本プロジェクトをローカルマシンにクローンすれば、`.vscode` によって自動的にそのような設定になるはず。
インデントの設定方法が不明な場合は、手間ではあるが、ファイル１つ１つのスペース設定を都度変更すること。

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

HTML ファイルと JS ファイルを用意する
```bash
touch {index.html,script.js}
```

トップページとして、以下の通りに HTML の中身を書く
```html:index.html
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
```html:index.html
<head>
  :
  <title>React Demo</title>
  <!-- React と ReactDOM の CDN を追加 -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
```

JS 処理を書く
```js:script.js
const { createRoot } = ReactDOM;

// ブラウザの DOM ノード内に react コンポーネントのルートを作成
const root = createRoot(document.getElementById('root'));
// react ノードをレンダリング（＝表示）する
root.render(<h1>Hello, React!!</h1>);
```


## トランスパイラの導入
React では「JSX」という、JavaScript の中に HTML を直接記載できるような記法を採用している。

react, react-dom を導入しただけでは、JSX 記法によって react コンポーネントを「書く」ことはできるが、JSX を理解できない Web ブラウザに、これを解釈させて「動かす（＝表示させる）」ことができない。
前述の例の中では、JavaScript の render 関数を実行しようとした時に、JavaScript の書き方が間違っているとして、以下の様なエラーがブラウザコンソールに表示されるはず。

```bash
# コンソールで表示されるシンタックス（構文）エラー
script.js:6 Uncaught SyntaxError: Unexpected token '<'
```

これをブラウザが解釈できる状態（JavaScript）に変換（＝トランスパイル）するツール、「トランスパイラ」を導入する。
今回は、トランスパイラとして **Babel** を採用する。

babel のコアモジュールと react 用のプリセットを導入する
```bash
# 開発用依存関係としてインストール
npm install --save-dev @babel/core @babel/cli @babel/preset-react
```

または、省略形コマンド
```bash
npm i -D @babel/core @babel/cli @babel/preset-react
```

babel の設定ファイルを用意する
```bash
touch babel.config.json
```

設定ファイルの中身を書く
```json:babel.config.json
{
  "presets": ["@babel/preset-react"]
}
```

トランスパイルを実行する処理を package.json のスクリプト一覧に追加する
```json:package.json
"scripts": {
  // 既存のスクリプトは省略

  "trans": "babel script.js --out-file compiled.js" // 追加
}
```

出力されるファイル群は成果物であり、手作業で開発するファイルではないため、git のバージョン監視対象外としておくために `.gitignore` に以下を追記する
```
compiled.js
```

実行する
```bash
npm run trans
```

画面表示の準備として、トランスパイル後の JavaScript を読み込むように、HTML ファイルのスクリプト参照を変更しておく
```html:index.html
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
```

または、省略形コマンド
```bash
npm i -D lite-server
```

起動処理を package.json のスクリプト一覧に追加する（`lite-server` コマンドだけでも良いが、必ず事前にトランスパイルするように定義しておく）
```json:package.json
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
```js:bs-config.json
{
  "server": {
    "baseDir": "./"
  }
}
```

中身の書き方は、json の他に js ファイルでも用意できる（どちらかで良い）
```js:bs-config.js
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
```json:package.json
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


## React の導入（node モジュール利用方式）

HTML の title の下に書いていた CDN の読み込みを削除する（コメントアウトでもOK）
```html:index.html
<head>
  :
  <title>React Demo</title>
  <!-- ↓↓ 以下を２つとも削除、または、コメントアウト ↓↓ -->
  <!-- <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script> -->
  <!-- <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->
</head>
```

react のコアモジュールを、node モジュールとして npm でインストール

最新のバージョンが v19 以降になった時のために `@18` で明示的にバージョンを指定する（未指定の場合は最新のバージョンとなる）
```bash
npm install react@18 react-dom@18
```

または、省略形コマンド
```bash
npm i react@18 react-dom@18
```

JS 処理を修正する（CDN の ReactDOM を削除し、node モジュールの ReactDOM を利用する）
```js:script.jsx
// const { createRoot } = ReactDOM; // ← CDN で利用していた１行を削除、または、コメントアウト
import React from 'react'; // 追加
import { createRoot } from 'react-dom/client'; // 追加

// ブラウザの DOM ノード内に react コンポーネントのルートを作成
const root = createRoot(document.getElementById('root'));
// react ノードをレンダリング（＝表示）する
root.render(<h1>Hello, React!!</h1>);
```


## モジュールバンドラーの導入
node モジュールを利用して React のコードを書く場合、import 文を使用して node_modules から目的のモジュールを呼び出す。
しかし、現在のブラウザ環境では ES6 モジュールの構文を解釈できるものの、`react-dom/client` のような Node.js 形式のモジュール解決を行えないために、以下のようなエラーが発生する。

```bash
Uncaught TypeError: Failed to resolve module specifier "react-dom/client". Relative references must start with either "/", "./", or "../".
```

上記の解決をするために、複数の分割された JavaScript モジュールを１つのファイルへ束ねる（＝バンドルする）ことができるツール、「モジュールバンドラー」を導入する。
今回は、そのモジュールバンドラーとして **webpack** を採用する。

webpack のコアモジュールと react 用のプリセットを導入する
```bash
npm install --save-dev webpack webpack-cli
```

または、省略形コマンド
```bash
npm i -D webpack webpack-cli
```

webpack 単体であれば上記のみで良いが、今回は babel も使用しているため、webpack で babel を使用するためのローダー（loader）も導入する
```bash
npm install --save-dev babel-loader
```

または、省略形コマンド
```bash
npm i -D babel-loader
```

webpack の設定ファイルを用意する
```bash
touch webpack.config.js
```

設定ファイルの中身を書く（今は中身を理解できなくても良い）
```js:webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',  // 開発モードを明示的に設定
  entry: './script.jsx',  // エントリーポイントを設定
  // 出力内容を設定
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // 処理対象を指定
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // 拡張子 js, jsx のファイルを指定（正規表現）
        test: /\.jsx?$/,
        // ローダーの指定（内部的に babal でトランスパイルも実行する）
        loader: "babel-loader",
      },
    ],
  },
};
```

webpack はデフォルトで本番用（mode = production）で実行しようとするため、今回はあえて開発用であることを明示した。
上記の設定により、バンドルを実行すると、成果物を dist というディレクトリの中に、bundle.js というファイル名で作ることになる。

バンドルを実行する処理を package.json のスクリプト一覧に追加する
```json:package.json
"scripts": {
  // 既存のスクリプトは省略

  "build": "webpack", // バンドルを実行するコマンドを追加
  "dev": "npm run build && lite-server" // トランスパイル後ではなく、バンドル後に起動するコマンドに変更
}
```

出力されるファイル群は成果物であり、手作業で開発するファイルではないため、git のバージョン監視対象外としておくために `.gitignore` に以下を追記する
```
/dist
```

画面表示には、最終的にバンドルされた JavaScript を読み込むため、HTML のスクリプト参照先を変更しておく
```html:index.html
<body>
  :
  <!-- script タグのソースを compiled.js から dist/bundle.js に変更 -->
  <script src="./dist/bundle.js" type="module"></script>
</body>
```

問題なく動作するか、もう一度確認する
```bash
npm run dev
```

## ホットリロード機能を追加してみる
本手順は、React の動作に必要な内容ではなく、開発作業を効率化するための機能追加の実践である

開発サーバが起動中にソースコードを変更しても、そこからトランスパイルやバンドルが完了したものが表示されているため、変更内容は再起動するまで画面に反映されない。
しかし、変更の保存と同時に、該当箇所の表示や処理内容をリアルタイムに反映する機能を追加することが出来、こういった機能は一般には「ホットリロード」などと呼ばれる。
開発作業において、変更をリアルタイムに確認できることは非常に便利であり、これが無いと非効率なものとなってしまう。

Webpack では、Hot Module Replacement (HMR) という技術がこれに該当し、公式の DevServer モジュールを追加することでホットリロードを実現できる。
尚、「リロード」と言っても、ページ全体を再読込しているのではなく、該当箇所だけに変更を反映するように効率的な変更が行われる。

webpack-dev-server を導入する
```bash
npm install --save-dev webpack-dev-server
```

または、省略形コマンド
```bash
npm i -D webpack-dev-server
```

webpack.config.js に設定を追加する
```js:webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './script.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // 起動する度に dist をクリーンアップする
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  // 以下を追加
  devServer: {
    static: {
      directory: path.join(__dirname), // index.html がある場所を指定
    },
    devMiddleware: {
      writeToDisk: true,
    },
    hot: true,  // HMR を有効化
    port: 3001, // 起動時のポート番号を指定（任意の番号） 
    open: true, // 起動時に自動でブラウザ表示
  }
};
```

具体的な変更点は以下

- devServer プロパティを一式追加する
- devServer.devMiddleware.writeToDisk を有効にすることで、初回起動時に dist 内にファイルを自動生成する
  - webpack-dev-server は、デフォルトでは、勝手にファイルを生成したりしない最低限の機能に制限されているため、dist に対象ファイルがないと機能しない
- output.clean を追加し、起動時に dist を初期化する設定を追加
  - writeToDisk の利用によって、変更保存の度に dist 内に新しいファイルが毎回生成されてしまうため

webpack-dev-server で起動する専用コマンドを package.json のスクリプト一覧に追加する
```json:package.json
"scripts": {
  // 既存のスクリプトは省略

  "serve": "webpack serve" // 追加
}
```

実際に起動し、動作確認する
```bash
npm run serve
```

script.jsx の ファイルの H1 タグの中身を任意の内容に変更し、保存後に画面へ自動で反映されたら成功。

## HMR 機能をインメモリで動作させる
現在の HTML ファイルは、React で作られたコンポーネントを画面に表示するために、script タグで dist 内のファイルを参照するように書いている。
これは、（ディスク上の）物理ファイルを参照するため、ファイルが存在しないと機能しない。

そのため、前述の方法では、物理ファイルが存在しなければ、自動で bandle.js を作成するようにファイル書き込み機能（writeToDisk）を有効にした。
しかし、これでは、ホットリロードは実現できるが、毎回不要なファイルを生成してしまう。

これを回避するために、まず、バンドル後の JS の出力先を、ディスク上の物理ファイルではなく、メモリ上に出力されるデータに変更し、HTML 上でファイルを直接指定することをやめる。
更に、バンドルされた最終的な JS ファイルが、自動的に HTML に挿入されるような設定に変更する。

webpack-dev-server は、本来、上記のように「インメモリ（メモリ上）」で動作させることが通常の利用方法である。
インメモリでホットリロードを実現する主なメリットは、特に以下の２点。

- 不要な実ファイルを生成しない
- 簡潔：JS の実ファイル指定を明記せずに自動化できるため、HTML をより簡潔に書ける
- 高速：メモリ利用の方法は、ディスクI/O（物理ファイルの読み書き）が発生する方法よりも動作が速い

上記を実現するプラグイン html-webpack-plugin を導入する
```bash
npm install --save-dev html-webpack-plugin
```

または、省略形コマンド
```bash
npm i -D html-webpack-plugin
```

webpack.config.js の設定を修正する
```js:webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 追加

module.exports = {
  mode: 'development', // 開発モードを明示的に設定
  entry: './script.jsx', // エントリーポイントを設定
  // 出力内容を設定
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // clean: true, // 削除
  },
  // 処理対象を指定
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // 拡張子 jsx のファイル（正規表現）
        test: /\.jsx?$/,
        // ローダーの指定
        loader: "babel-loader",
      },
    ],
  },
  // プラグインと対象 HTML のパスを追加
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname), // index.html がある場所を指定
    },
    // 以下の設定を削除
    // devMiddleware: {
    //   writeToDisk: true,
    // },
    hot: true,  // HMR を有効化
    port: 3001, // 起動時のポート番号を指定（任意の番号） 
    open: true, // 起動時に自動でブラウザ表示
  }
};
```

具体的な変更点は以下

- html-webpack-plugin をインポート
- plugins プロパティを追加し、インストールしたプラグインを設定
  - 対象の HTML ファイルも指定
- 以下の設定は不要となるので削除
  - output.clean
  - devServer.devMiddleware

HTML ファイルのスクリプトタグは不要となるため削除する
```html:index.html
<body>
  :
  <div id="root"></div>
  <!-- ↓↓ 以下を削除、または、コメントアウト ↓↓ -->
  <!-- <script src="./dist/bundle.js" type="module"></script> -->
</body>
```

実際に起動し、動作確認する
```bash
npm run serve
```

## まとめ
本プロジェクトでは、React 自体の概要を解説する前に、そもそも動作する環境を構築する方法と、そのための最低限の知識を紹介した。
初心者には聞きなれないツールやキーワードが登場したが、重要なことは、React の動作に必要な要素が何であるかを、抽象的に把握することにある。

- React は、既存の HTML/JS ファイルに簡単に導入できる便利なライブラリである
- React には独自の書き方がある（JSX 記法）
- 画面に表示させるには、Web ブラウザに独自の書き方を理解させる必要がある（トランスパイル）
- React の様に複数の部品で構成された Web ページを開発する場合、複数のファイルをまとめる必要がある（バンドル）
- 実際に開発をする場合、効率的に作業するために作業内容をリアルタイムに観測できる技術を導入した方が良い（ホットリロード）

Babel や Webpack といったツール群は、あくまで上記を実現するため一例にすぎず、他の技術で代替することも可能である。
React という技術が Web ページで動作する際の、（私個人が思う）最低限の流れを上記に示すとともに、他のサブプロジェクトにて React の基礎概要について、より理解が深まれば幸いである。
