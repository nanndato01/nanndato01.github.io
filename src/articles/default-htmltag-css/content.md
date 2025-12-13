# 前置き

このサイトは主にReact + Vite + Tailwindで構成されています。

TailwindはスタイルをclassNameで指定するため、CSSより簡単にスタイルを適用できます。

しかし、Tailwindをimportすると、<h1>や<ul>などの主要なHTMLタグのスタイルが消え、全て<p>のような見た目になります。回避する方法はありますが、どれを試しても失敗したため、地道に基本的なHTMLタグのスタイルをCSSで再定義することにしました。

# 実際のコード

```css
h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 1.5rem 0 1rem;
    padding-bottom: 0.5rem;
    line-height: 1.3;
    border-bottom: 1px solid lightgray;
}

h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1.2rem 0 0.8rem;
    padding-bottom: 0.5rem;
    line-height: 1.35;
    border-bottom: 1px solid lightgray;
}

h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1rem 0 0.6rem;
    line-height: 1.4;
}

h4 {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0.8rem 0 0.5rem;
    line-height: 1.45;
}

h5 {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.6rem 0 0.4rem;
    line-height: 1.5;
}

h6 {
    font-size: 0.9rem;
    font-weight: bold;
    margin: 0.4rem 0 0.3rem;
    line-height: 1.5;
    color: #555;
}

p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0.8rem 0;
}

img {
    max-width: 500px;
    max-height: 500px;
    margin: 0 auto;
}

ul, ol {
    list-style: inside;
}

ul ul, ul ol, ol ul, ol ol {
    list-style: circle;
    margin-left: 2rem;
}

li {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0.4rem 0;
}

blockquote {
    border-left: 4px solid #ccc;
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    color: #555;
    background: #f9f9f9;
    font-style: italic;
}

pre {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1rem 0;
    font-family: Consolas, "Courier New", monospace;
    font-size: 0.95rem;
    line-height: 1.4;
}

pre code {
    background: none;
    padding: 0;
    font-size: inherit;
}

code {
    background: #eee;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
    font-size: 0.95rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 1.1rem;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.6rem 0.8rem;
    text-align: left;
}

th {
    background: #f0f0f0;
    font-weight: bold;
}

a {
    color: #0066cc;
    text-decoration: underline;
}

a:hover {
    color: #004c99;
}

strong {
    font-weight: bold;
}

em {
    font-style: italic;
}

del {
    text-decoration: line-through;
}

```

# おわりに

[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) を使用する場合、`pre`と`pre code`は必要ないため、コメントアウトした方がよいです。