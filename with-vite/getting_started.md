# React の始め方（Vite 編）
本プロジェクト `with-vite` は、React の基本的な概要と動作を理解するためのサブプロジェクト。
このファイルがある階層で、以下の手順を実施していくことで、サンプルコードと同様の成果物が作れる。

`with-vite` は、主に **ツール利用による環境構築の容易さ** と **React の基本的な書き方** を説明する。

## 前提
- 本リポジトリ内のサブプロジェクト `basic` 内容を理解した人を対象としている
- 同様に React の環境構築を容易にする「Create React App」を利用した方法との違いに通いても言及することがある
- インターネット接続可能/最新の安定版(LTS版)のバージョンで Node.js がインストール済みの環境であること
- 閲覧時期によっては、バージョン更新や情報の最新化により、本内容が陳腐化する可能性がある

## 全体の流れ
- 事前準備
- Vite を利用したプロジェクトの作成

## 事前準備
まず、アプリケーションのプロジェクトを作成する任意の場所を選んでおく。そして、そこに移動しておくこと

## Vite の導入とアプリのテンプレート作成
React の動作環境を簡単に用意できるツール Vite を導入する。それと同時に、アプリケーションの雛形の作成も同時に完了させる。

尚、過去に人気の React 入門キットであった「Create React App（CRA）」と違い、Vite は React の入門キットとしてのツールではない。
あくまでその一部として、React の環境構築を容易にする機能が提供されており、今回はそれを利用する。

以下のコマンドで、任意のアプリ名でプロジェクトを作成
```bash
npm create vite@latest demo-app -- --template react
```

初めて実行する場合、以下のように質問されることがある。その場合は、そのまま Enter キーを押せば処理が進む
```bash
# 必要なものをインストールしていいかを訊かれる
Need to install the following packages:
create-vite@5.5.5
Ok to proceed? (y) # Enter キーで "Yes" 回答となり、自動生成がスタートする

# 内部的に npx でコマンドを実行している
> npx
> create-vite demo-app --template react


Scaffolding project in /{ローカルマシンのアプリが生成される場所}

# # ここまで表示されたら処理完了（次の手順が示される）
Done. Now run:

  cd demo-app
  npm install
  npm run dev
```

補足：`npx` コマンドは、`npm` と違い、実際に node モジュールをインストールせず、一時的に実行してプログラム自体はマシン内に残さない方法を取るコマンド（上記では、create-vite を一時的に実行するが、これ自体は依存関係としてインストールされていない）。`npm create` コマンドは、内部的に `npx` コマンドを実行する、Node.js が提供する機能の１つ。

成功すれば、プロジェクトのディレクトリごと、動作に必要なファイルがすべて生成される

生成されたプロジェクトディレクトリに移動する
```bash
cd demo-app
```

node_modules ディレクトリがまだ無いはずなので、依存関係があるモジュールをすべてインストールする
```bash
npm i
```

起動する
```bash
npm run dev
```

以下のような起動結果がコンソールに表示される
```bash
  VITE v5.4.11  ready in 487 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

デフォルトでは、自動で Web ブラウザ画面は立ち上がらないので、指定された URL（今回なら `http://localhost:5173/`）をブラウザで表示する

自動でブラウザを立ち上げたい場合は、package.json の vite の起動コマンドに `--open` オプションをつける
```json
"scripts": {
  "dev": "vite --open", // --open を追加
  :
},
```

修正後、起動すると自動でブラウザも立ち上がる
```bash
npm run dev
```