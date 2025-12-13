import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import { getAllArticles } from "../api/getAllArticles";
import type { Article } from "../types/article";
import "../common.css";

export default function Sidebar() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [keyword, setkeyword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const list: Article[] = getAllArticles()
        .sort((a, b) => {
            const dataA = a.published_at ? new Date(a.published_at).getTime() : 0;
            const dataB = b.published_at ? new Date(b.published_at).getTime() : 0;
            return dataB - dataA;
        });

        const allTags = list.flatMap(article => article.tags ?? []);
        const uniqueTags = Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b));
        const mlist: Article[] = list.slice(0, 5);
        setArticles(mlist);
        setTags(uniqueTags);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(keyword.trim() === "")return;
        navigate(`/search/${keyword.trim()}`);
    }

    if(!articles)return <p>Articles not found.</p>;

    return (
        <aside className="sidebar w-[250px] ml-2 pl-5 py-5 border-l border-b border-gray-400 hidden md:block">
            <ul className="sidebar__list m-0 p-0 list-none">

                <li className="sidebar__item mb-5">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setkeyword(e.target.value)}
                            placeholder="search..."
                            className="w-full p-2 border border-gray-400"
                        />
                    </form>
                </li>

                <li className="sidebar__item mb-5">
                    <h3 className="sidebar__item__title section-title text-xl">
                        new articles
                    </h3>

                    <ul className="sidebar__item__list list-none ml-2">
                        {articles.map(article => (
                            <li key={article.slug} className="sidebar__item__list__item mb-3">
                                <Link to={`/articles/${article.slug}`}>
                                    <h4 className="sidebar__item__list__item__title m-0">{article.title}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className="sidebar__item mb-5">
                    <h3 className="sidebar__item__title section-title text-xl">
                        all tags
                    </h3>

                    <ul className="sidebar__item__list list-none ml-2">
                        {tags.map(tag => (
                            <li key={tag} className="sidebar__item__list__item mb-3">
                                <Link to={`/tags/${tag}`}>
                                    <h4 className="sidebar__item__list__item__title m-0">{tag}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>

            </ul>
        </aside>
    );
}
