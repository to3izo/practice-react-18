const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.jsx?$/,
        loader: "babel-loader", // ローダーの指定 (Babel)
      },
    ],
  },
  // html-webpack-plugin 設定
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  // webpack-dev-server 設定
  devServer: {
    static: {
      directory: path.join(__dirname), // index.html がある場所を指定
    },
    hot: true,  // HMR を有効化
    port: 3001, // 起動時のポート番号を指定（任意の番号） 
    open: true, // 起動時に自動でブラウザ表示
  }
};