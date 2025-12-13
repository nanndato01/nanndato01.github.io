import { useEffect, useState } from "react";
import type { Article } from "../types/article";

import { getAllArticles } from "../api/getAllArticles";
import ArticleList from "../components/Articlelist";
import "../common.css";

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const list: Article[] = getAllArticles()
        .sort((a, b) => {
            const dataA = a.published_at ? new Date(a.published_at).getTime() : 0;
            const dataB = b.published_at ? new Date(b.published_at).getTime() : 0;
            return dataB - dataA;
        });

        setArticles(list);
    }, []);


    if(!articles)return <p>Articles not found.</p>;

    return (
        <div className="category-list">
            <section className="category">
                <h2 className="category__title section-title text-3xl">all articles</h2>

                < ArticleList articles={articles}/>
            </section>
        </div>
    );
}
