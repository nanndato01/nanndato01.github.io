import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

import type { Article } from "../types/article";
import { getAllArticles } from "../api/getAllArticles";
import { getArticleBySlug } from "../api/getAllArticles";
import ArticleList from "../components/Articlelist";
import CodeBlock from "../components/CodeBlock";

import "../common.css";

type TocItem = {
    id: string;
    text: string;
    level: number;
};

export default function ArticleDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
    const [content, setContent] = useState<string>("");
    const [toc, setToc] = useState<TocItem[]>([]);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        if (!slug) return;
        const { article, content } = getArticleBySlug(slug);
        setArticle(article);
        setContent(content);
    }, [slug]);

    useEffect(() => {
        if(!article)return;
        const all = getAllArticles();
        const baseTags = new Set(article.tags ?? []);
        const sorted = all
        .filter(a => a.slug != article.slug)
        .map(a => {
            const tags = a.tags ?? [];
            const matchCount = tags.filter(t => baseTags.has(t)).length;
            return {article: a, matchCount};
        })
        .sort((a, b) => b.matchCount - a.matchCount)
        .filter(item => item.matchCount > 0)
        .map(item => item.article)
        .slice(0, 5);
        setRecommendedArticles(sorted);
    }, [article]);

    useEffect(() => {
        if (!content) return;

        const lines = content.split("\n");
        const tocItems: TocItem[] = [];

        lines.forEach(line => {
            const match = /^(#{1,3})\s+(.*)/.exec(line);
            if (!match) return;

            const level = match[1].length;
            const text = match[2];
            const id = text.replace(/\s+/g, "-");

            tocItems.push({ id, text, level });
        });

        setToc(tocItems);
    }, [content]);

    if (!article) return <p>Article not found.</p>;

    return (
        <div>
            <head>
                <title>{`${article.title} | nanndato01のホームページ`}</title>
                <meta name="description" content={article.excerpt ?? ""} />
            </head>

            <h1 className="text-3xl mb-4">{article.title}</h1>

            <p className="text-gray-400 mb-2">
                {article.author} / {article.published_at}{" "}
                {article.updated_at && `(最終更新日: ${article.updated_at})`}
            </p>

            <ul className="tag-list flex list-none m-0 p-0">
                {article.tags?.map((tag) => (
                    <li key={tag} className="tag-item">
                        <object>
                            <Link to={`/tags/${tag}`} className="block">
                                <p className="card__tag text-[16px] m-0 p-0"># {tag}</p>
                            </Link>
                        </object>
                    </li>
                ))}
            </ul>

            {toc.length > 0 && (
                <nav className="inline-block rounded-lg mt-4 p-4 border border-gray-400 bg-gray-50">
                    <p className="font-bold mb-2">目次</p>

                    <div className="relative">
                        <ul className="space-y-1 transition-all duration-300 overflow-hidden"
                            style={{
                                maxHeight: tocOpen ? "none" : "160px"
                            }}
                        >
                            {toc.map(item => (
                                <li key={item.id} style={{ marginLeft: (item.level - 1) * 16 }}>
                                    <a href={`#${item.id}`} className="hover:underline">{item.text}</a>
                                </li>
                            ))}
                        </ul>

                        {!tocOpen && toc.length > 6 && (
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"/>
                        )}
                    </div>

                    {toc.length > 6 && (
                        <button
                            onClick={() => setTocOpen(v => !v)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            {tocOpen ? "閉じる" : "開く"}
                        </button>
                    )}
                </nav>
            )}

            <div className="article-content prose max-w-none pt-[30px]">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1({children}){
                            const text = String(children);
                            const id = text.replace(/\s+/g, "-");
                            return <h1 id={id}>{children}</h1>
                        },
                        h2({children}){
                            const text = String(children);
                            const id = text.replace(/\s+/g, "-");
                            return <h2 id={id}>{children}</h2>
                        },
                        h3({children}){
                            const text = String(children);
                            const id = text.replace(/\s+/g, "-");
                            return <h3 id={id}>{children}</h3>
                        },
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const lang = match?.[1];

                            if (!inline && lang) {
                                return (
                                    <CodeBlock
                                        lang={lang}
                                        children={String(children)}
                                        props={props}
                                    />
                                );
                            }

                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },

                        a({ node, ...props }) {
                            return (
                                <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {recommendedArticles.length > 0 && (
                <div className="mt-[100px]">
                        <h1 className="section-title text-3xl">関連記事</h1>
                        < ArticleList articles={recommendedArticles}/>
                </div>
            )}
        </div>
    );
}
