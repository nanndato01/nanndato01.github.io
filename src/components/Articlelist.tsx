import { Link } from "react-router-dom";
import type { Article } from "../types/article";
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
                    <Link className="card" to={`/articles/${article.slug}`}>
                        <div className="card__image">
                            <img src={article.cover_url} alt="cover" />
                        </div>

                        <div className="card__body">
                            <h3 className="card__title">{article.title}</h3>
                            <p className="card__text">{article.excerpt}</p>

                            <div className="card__meta">
                                <ul className="card__tag-list">
                                    {article.tags?.map(tag => (
                                        <li key={tag} className="card__tag-list__item">
                                            <object>
                                                <Link to={`/tags/${tag}`} className="card__tag">
                                                    <p className="card__tag__title">{tag}</p>
                                                </Link>
                                            </object>
                                        </li>
                                    ))}
                                </ul>

                                <span className="card__meta-item">{article.author}</span>
                                <span className="card__meta-item">
                                    {article.published_at?.slice(0, 10)}
                                </span>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
