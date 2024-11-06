// const { createRoot } = ReactDOM; // CDN 利用時
import React from 'react';
import { createRoot } from 'react-dom/client';

// ブラウザの DOM ノード内に react コンポーネントのルートを作成
const root = createRoot(document.getElementById('root'));
// react ノードをレンダリング（＝表示）する
root.render(<h1>Hello, React!!</h1>);