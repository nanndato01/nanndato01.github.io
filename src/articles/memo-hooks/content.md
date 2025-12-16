# レンダリング
* JSXの計算
* 純粋であるべき

# 初期レンダリング
* コンポーネントがマウント
* renderメソッドや関数コンポーネントを実行し、結果を仮想DOMに描画
* 実際のDOMと比較し、必要な変更を実際のDOMに反映(commit)

# 再レンダリング
* state,props,contextの変更、親の再レンダリングが起こったときに再度実行
* 変更された部分だけが仮想DOMに再描画され、必要な変更を実際のDOMに反映

# 副作用
* コンポーネントの表示に直接関係しないが必要な処理を行う
* コンポーネントのマウント後、依存する値の変更後に実行
* fetch、setTimeoutなど

# useState

* 再レンダリングを起こすトリガー
* render確定後、renderの結果として依存値が変わっていた場合に実行

```ts
const [state, setState] = useState(init);
```

## useStateにすべきもの

render外で変わる恐れがあり、その変化を描画に反映させたいもの

* 非同期で後から来る
* ユーザーの操作で変わる

# useEffect

* renderが確定した後、または依存する値が変更された後に実行される
* renderの結果に対する後処理

## render確定後に一度だけ実行
```ts
useEffect(() => {
    // hoge
}, []);
```

## 依存する値が変更された後に実行
```ts
useEffect(() => {
    // hoge
}, [..., fuga]);
```

## useEffectにすべきもの

副作用

# 例

## render後に来る情報を取得し再レンダリング

```ts
const [state, setState] = useState(init);

useEffect(() => {
    fetch().then(data => setState(data));
}, []);
```

## render後に変更される値を検知し実行
```ts
useEffect(() => {
    // hoge
}, [fuga])
```