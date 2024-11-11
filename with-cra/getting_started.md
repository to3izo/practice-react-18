# React の始め方（Create React App 編）
本プロジェクト `with-cra` は、React の基本的な概要と動作を理解するためのサブプロジェクト。
このファイルがある階層で、以下の手順を実施していくことで、サンプルコードと同様の成果物が作れる。

`with-cra` は、主に **ツール利用による環境構築の容易さ** を説明する。

## 前提
- 本リポジトリ内のサブプロジェクト `basic` 内容を理解した人を対象としている
- インターネット接続可能/Node.js インストール済みの環境であること
- 閲覧時期によっては、本手順で紹介しているツールが利用不可になっている可能性もゼロではない点を留意すること

## 全体の流れ
- 事前準備
- Create React App (CRA) の導入
- 内部構成の概要説明

## 事前準備
まず、アプリケーションのプロジェクトを作成する任意の場所を選んでおく。そして、そこに移動しておくこと

## Create React App (CRA) の導入
React の動作環境を簡単に用意できるツール Create React App (CRA) を導入する

以下のコマンドで、任意のアプリ名でプロジェクトを作成
```bash
npx create-react-app demo-app
```

もし、以下のように質問された場合は、そのまま Enter キーを押せば処理が進む
```bash
# 必要なものをインストールしていいかを訊かれる
Need to install the following packages:
create-react-app@5.0.1
Ok to proceed? (y) # Enter キーで "Yes" 回答となる

# （省略） ...

# 生成されたアプリ起動を確認するための、次の手順を示している
We suggest that you begin by typing:

  cd demo-app
  npm start

# ここまで表示されたら処理完了
Happy hacking!
```

成功すれば、プロジェクトのディレクトリごと、動作に必要なファイルがすべて生成される

生成されたプロジェクトディレクトリに移動する
```bash
cd demo-app
```

起動する
```bash
npm run start
```

## 内部構成をざっくりと把握する
まず、README.md には、生成されたアプリケーションや CRA の概要が記載されており、関連リンクやコマンドの簡単な説明等がされている

### package.json から内部構成を確認する
このファイルで注目すべきは、"dependencies" と "scripts"。
これを見れば、内部的に何が使われているのか、どんなコマンドが用意されているのかわかる。

- "dependencies"（依存関係）の部分を確認すると、このアプリを開発する際にインストールされたモジュールが確認できる
  - 以下は、React として動作するには、直接は関係ないもの
    - @testing-library: React で作られたアプリのテストに利用するツール
    - web-vitals: アプリのパフォーマンス測定に使用するツール
  - 以下は、React として動作するために必要なもの
    - react, react-dom: この２つは React として必ず必要なコアモジュール
    - react-scripts: `basic` プロジェクトで説明した際に登場した、トランスパイラ（Babel）やモジュールバンドラー（Webpack）等の一連のツールを含んだパッケージ
- つまり、CRA は、React に必要な中核のプログラム（react, react-dom）と、トランスパイラなどの動作に必要な設定や機能をあらかじめ用意した専用ツールの構成でできていることがわかる
- npm コマンドで実行できる "scripts" については以下の通り
  - `npm run start`: トランスパイラ（babel）とモジュールバンドラー（webpack, webpack-dev-server）を内部的に用いて、「ホットリロード」が効いた開発サーバが起動する、開発作業用のコマンド
  - `npm run build`: モジュールバンドラー（webpack）で、本番環境のサーバに格納するファイル群を出力する、本番用のコマンド
    - これを実行されると、`basic` の時の様な "dist" というディレクトリではなく、"build" というディレクトリを出力する（用途は同じ）
  - `npm run test`: @testing-library を用いてテストを実行し、結果を出力するコマンド（今回、これ以上の説明は割愛する）
  - `npm run eject`: CRA の隠蔽された設定ファイル（Webpack、Babel、ESLintなど）を取り出し、自分で直接編集可能にする（今回、これ以上の説明は割愛する）
    - 実際に実行すると、webpack や babel 等の各種 config ファイルが出力される
    - react-scripts は、トランスパイラやモジュールバンドラー等の設定を既にしてくれているものだが、細かく変更したい場合などに使用する

### package-lock.json から、更に内部構成を把握する
package-lock.json とは、プロジェクトの構成を説明する package.json の中で、内部的に利用しているツールを更に細かく列挙するファイルである。

具体的には、package.json の "dependencies" および "devDependencies" で利用すると示されたツール群が、その更に内部で何の外部ツールを利用しているのかを把握できる。
通常の開発作業では、そこまで確認する必要はあまりないが、今回は理解のために限定的に内容に触れる。

つまり、react-scripts が本当に、トランスパイラとして babel を、モジュールバンドラーとして webpack を使用しているのかが確認できる。

トップレベルで利用しているものは、package-lock.json ファイルの以下の部分に記載がある
```json
"packages": {
  "": {
    "name": "demo-app",
    "version": "0.1.0",
    // package.json と同じ内容
    "dependencies": {
      "@testing-library/jest-dom": "^5.17.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"
    }
  },

  :
  // 以降が、上記のツールから更に内部的に使用されているモジュール群
}
```

上記ファイルの中で、react-scripts のツールの中身は、以下の部分に記載されている
```json
"node_modules/react-scripts": {
  "version": "5.0.1",
  "resolved": "https://registry.npmjs.org/react-scripts/-/react-scripts-5.0.1.tgz",
  :
  "dependencies": {
    // babel 関連を利用していることがわかる
    "@babel/core": "^7.16.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.3",
    "@svgr/webpack": "^5.5.0",
    "babel-jest": "^27.4.2",
    "babel-loader": "^8.2.3",
    "babel-plugin-named-asset-import": "^0.3.8",
    "babel-preset-react-app": "^10.0.1",

    // ... 他の依存関係 ...

    //  webpack, webpack-dev-server, HTML 自動挿入のプラグイン等、関連技術を利用していることがわかる
    "html-webpack-plugin": "^5.5.0",
    // ... 他の依存関係 ...
    "webpack": "^5.64.4",
    "webpack-dev-server": "^4.6.0",
    "webpack-manifest-plugin": "^4.0.2",
    "workbox-webpack-plugin": "^6.4.1"
  },
  :
}
```

これによって、react-scripts は babel も webpack も（それ以外にも）内部的に使用しており、
独自のコマンドを用意することで React を簡単に利用できるようにしようとしていることがわかる。

### ソースコードの構成をざっくりと把握する
`basic` プロジェクトの時は、すべてのファイルが同一ディレクトリの直下に配置されて横並びになっていたが、本来はこのプロジェクトのように、役割・用途によってディレクトリを分けた方がわかりやすい。

- public: 最初に表示されるトップページ（index.html）など、React ではない静的なファイルなどを格納する
- src: React として開発作業を行うファイルがここにまとまっている
  - index.js: ここで React のルートコンポーネント（最初の親コンポーネント）が作成され、これが index.html に挿入される。更に内部的に App コンポーネント（App.js）を呼び出して利用している
  - App.js: １つの Web ページの構成部品（＝コンポーネント）。これが、index.js に呼び出されて、画面に表示される
  - その他のファイル: 上記のメイン動作ファイルに付随する、付属品

## まとめ
本プロジェクトでは、サブプロジェクト `basic` で紹介した React の環境を構成する要素が、ツールの利用によって容易になることを、CRA を利用して紹介した。

- サブプロジェクト `basic` で使用されていたものが、CRA のツール内でも自動的に設定されている（より詳細に、他の状況にも適用した設定もされている）
- ただし、これまで人気だった CRA は、既に公式の入門キットとしては採用されていないため、あくまで参考程度に把握されたし
