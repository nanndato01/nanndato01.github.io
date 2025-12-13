import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Article } from "../types/article";
import { getAllArticles } from "../api/getAllArticles";
import ArticleList from "../components/Articlelist";
import "../common.css";

export default function SearchForTag() {
    const {tag} = useParams();
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        if(!tag)return;
        const list: Article[] = getAllArticles()
        .filter(article => article.tags?.includes(tag))
        .sort((a, b) => {
            const dataA = a.published_at ? new Date(a.published_at).getTime() : 0;
            const dataB = b.published_at ? new Date(b.published_at).getTime() : 0;
            return dataB - dataA;
        });

        setArticles(list);
    }, [tag]);

    return (
        <div>
            <h1 className="section-title text-2xl">{`Tag: ${tag}`}</h1>

            <ArticleList articles={articles}/>
        </div>
    );
}