const { createRoot } = ReactDOM;

// ブラウザの DOM ノード内に react コンポーネントのルートを作成
const root = createRoot(document.getElementById('root'));
// react ノードをレンダリング（＝表示）する
root.render(<h1>Hello, React!!</h1>);