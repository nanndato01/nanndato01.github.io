import type { Article } from "../types/article";
import Card from "./Card";
import "../common.css";

interface ArticleListProps {
    articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
    if (!articles || articles.length === 0) return <p>記事が見つかりません。</p>;

    return (
        <ul className="card-list list-none p-0">
            {articles.map(article => (
                <li key={article.slug} className="card-list__item">
                    <Card
                        cover={article.cover_url}
                        link={`/articles/${article.slug}`}
                        title={article.title}
                        excerpt={article.excerpt}
                        tags={article.tags}
                        author={article.author}
                        published_at={article.published_at}
                    />
                </li>
            ))}
        </ul>
    );
}
