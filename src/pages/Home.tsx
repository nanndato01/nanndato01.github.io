import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import type { Article } from "../types/article";
import { getAllArticles } from "../api/getAllArticles";
import "../common.css";
import ArticleList from "../components/Articlelist";

export default function Home() {
    const list: Article[] = getAllArticles()
    .sort((a, b) => {
        const dataA = a.published_at ? new Date(a.published_at).getTime() : 0;
        const dataB = b.published_at ? new Date(b.published_at).getTime() : 0;
        return dataB - dataA;
    });
    const n_list: Article[] = list.filter(a => {
        return a.tags?.includes("notice");
    });
    const articles: Article[] = list.slice(0, 5);
    const notices: Article[] = n_list.slice(0, 5);

    return (
        <div>
            <Helmet>
                <title>nanndato01のホームページ</title>
            </Helmet>

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
        </div>
    );
}
