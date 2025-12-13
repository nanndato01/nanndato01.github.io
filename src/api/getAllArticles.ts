import type { Article } from "../types/article";
import defaultCover from "../assets/cover/default-cover.jpg";

export function getAllArticles(): Article[] {
  const jsonModules = import.meta.glob("/src/articles/*/article.json", {
    import: "default",
    eager: true,
  });

  const coverModules = import.meta.glob("/src/articles/*/cover.*", {
    import: "default",
    eager: true,
  });

  return Object.entries(jsonModules)
    .map(([path, data]: any) => {
      const slug = path.split("/")[3];
      const coverEntry = Object.entries(coverModules).find(([p]) =>
        p.includes(`/${slug}/`)
      );
      const cover_url = coverEntry ? coverEntry[1] : defaultCover;
      return { slug, cover_url, author: data.author ?? "nanndato01", ...data } as Article;
    })
    .filter(article => article.published);
}

export function getArticleBySlug(slug: string): { article: Article | null; content: string } {
  const articles = getAllArticles();
  const article = articles.find(a => a.slug === slug) ?? null;

  if (!article) return { article: null, content: "" };

  const mdModules = import.meta.glob("/src/articles/*/content.md", {
    import: "default",
    eager: true,
    as: "raw",
  });
  const mdEntry = Object.entries(mdModules).find(([path]) =>
    path.includes(`/${slug}/`)
  );
  const content = mdEntry ? (mdEntry[1] as string) : "";

  return { article, content };
}
