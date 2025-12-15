import { useEffect, useState } from "react";
import type { Article } from "../types/article";

import { Link } from "react-router-dom";
import { getAllArticles } from "../api/getAllArticles";
import "../common.css";
import ArticleList from "../components/Articlelist";

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [notices, setNotices] = useState<Article[]>([]);

    useEffect(() => {
        const list: Article[] = getAllArticles()
        .sort((a, b) => {
            const dataA = a.published_at ? new Date(a.published_at).getTime() : 0;
            const dataB = b.published_at ? new Date(b.published_at).getTime() : 0;
            return dataB - dataA;
        });
        const n_list: Article[] = list.filter(a => {
            return a.tags?.includes("notice");
        });
        const mlist: Article[] = list.slice(0, 5);
        const mn_list: Article[] = n_list.slice(0, 5);

        setArticles(mlist);
        setNotices(mn_list);
    }, []);
    return (
        <div className="category-list">
            <section className="pb-[30px]">
                <h2 className="section-title text-3xl">
                    notice
                </h2>

                <ul className="list-none p-0 m-0">
                    {notices.map(notice => (
                        <li key={notice.slug} className="ml-[15px]">
                            <Link to={`/articles/${notice.slug}`}>
                                <p className="p-0 my-1 border-b border-black inline-block">{notice.title} ( {notice.published_at} )</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="section-title text-3xl">
                    new articles
                </h2>

                < ArticleList articles={articles}/>
            </section>
        </div>
    );
}
