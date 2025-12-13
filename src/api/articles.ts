import { supabase } from "../lib/supabase";

export async function fetchArticles() {
    const {data, error} = await supabase
    .from("articles")
    .select("*")
    .order("published_at", {ascending: false});

    if(error){
        console.error("ERROR: ", error);
        throw error;
    }

    return data;
}

export async function fecthArticlebySlug(slug: string) {
    const {data, error} = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

    if(error){
        console.log("ERROR: ", error);
        throw error;
    }

    return data;
}