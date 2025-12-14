import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Links from "./pages/Links";
import About from "./pages/About";
import ArticleDetail from "./pages/ArticleDetail";
import SearchForTag from "./pages/SearchFortag";
import SearchForKeyword from "./pages/SearchForKeyword";
import Footer from "./components/Footer";

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
    <BrowserRouter basename="/homepage">
    <RedirectHandler />
      <Header/>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/articles" element={<Articles />}/>
          <Route path="/links" element={<Links />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/articles/:slug" element={<ArticleDetail />}/>
          <Route path="/tags/:tag" element={< SearchForTag />}/>
          <Route path="/search/:keyword" element={<SearchForKeyword />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;