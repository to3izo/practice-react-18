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
