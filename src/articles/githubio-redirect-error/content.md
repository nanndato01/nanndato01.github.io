`username.github.io/hoge/`をルートディレクトリとしている場合、

`/hoge/fuga`にアクセスすると、

`/hoge/fuga/index.html`を探そうとして404エラーになります。

# 解決方法

## /vite.confic.ts

```ts
import ...

export default defineConfig({
  // ...
  base: "/hoge/",
  // ...
})
```

## /public/404.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <script>
    const basename = '/hoge';
    let path =
      window.location.pathname +
      window.location.search +
      window.location.hash;
    if (path.startsWith(basename)) {
      path = path.slice(basename.length) || '/';
    }
    sessionStorage.setItem('redirect', path);
    window.location.replace(basename + '/');
  </script>
</head>
<body></body>
</html>
```

## /App.tsx

```tsx
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return(
    <BrowserRouter basename="/hoge">
    <RedirectHandler />
        {/* <Route>など */}
    </BrowserRouter>
  );
}

export default App;
```

`npm run build`等でビルドし、githubにpushします。

# おわりに

これの解決に数時間かけてかなりしんどかったです。