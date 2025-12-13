export interface Article {
    slug: string;
    title: string;
    excerpt?: string | null;
    author?: string | null;
    tags?: string[] | null;
    cover_url: string;
    published: boolean;
    published_at: string;
    updated_at?: string | null;
}