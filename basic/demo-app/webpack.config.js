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
        // 拡張子 jsx のファイル（正規表現）
        test: /\.jsx?$/,
        // ローダーの指定
        loader: "babel-loader",
      },
    ],
  },
};