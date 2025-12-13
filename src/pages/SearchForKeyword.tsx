import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAllArticles, getArticleBySlug } from "../api/getAllArticles";
import ArticleList from "../components/Articlelist";
import type { Article } from "../types/article";

export default function SearchForKeyword() {
    const { keyword } = useParams();
    const [results, setResults] = useState<Article[]>([]);

    useEffect(() => {
        if (!keyword) return;

        const term = keyword.toLowerCase();
        const all = getAllArticles();

        const found = all.filter(article => {
            const titleMatch = article.title.toLowerCase().includes(term);
            const excerptMatch = article.excerpt?.toLowerCase().includes(term) ?? false;

            const { content } = getArticleBySlug(article.slug);
            const contentMatch = content.toLowerCase().includes(term);

            return titleMatch || excerptMatch || contentMatch;
        });

        setResults(found);
    }, [keyword]);

    return (
        <div>
            <h1 className="section-title text-2xl">{`Search: ${keyword}`}</h1>

            < ArticleList articles={results} />
        </div>
    );
}
