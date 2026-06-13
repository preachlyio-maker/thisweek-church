import { supabase } from "./supabase";
import { Article, SocialPost, ExternalRead, BenchmarkStat } from "./types";
import { SAMPLE_ARTICLES, pickBenchmarkOfWeek } from "./sampleContent";

/**
 * Data access for editorial content (articles, social wall, external reads).
 * Each reader falls back to curated sample content when its Supabase table is
 * empty, errors, or doesn't exist yet — so every homepage section renders now,
 * and live pipeline rows take over automatically.
 */

// ---------------------------------------------------------------- Articles

async function fetchArticles(): Promise<Article[] | null> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data as Article[];
  } catch {
    return null;
  }
}

export async function getArticles(limit?: number): Promise<Article[]> {
  const all = (await fetchArticles()) ?? SAMPLE_ARTICLES;
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = (await fetchArticles()) ?? SAMPLE_ARTICLES;
  return all.find((a) => a.slug === slug) ?? null;
}

// ------------------------------------------------------------- Social wall

export async function getSocialPosts(): Promise<{
  videos: SocialPost[];
  posts: SocialPost[];
  accounts: SocialPost[];
}> {
  // No fabricated fallback — each lane shows only real rows, and hides when empty.
  let all: SocialPost[] = [];
  try {
    const { data, error } = await supabase
      .from("social_posts")
      .select("*")
      .order("captured_at", { ascending: false });
    if (!error && data && data.length > 0) all = data as SocialPost[];
  } catch {
    /* leave empty */
  }
  const byKind = (k: SocialPost["kind"]) => all.filter((p) => (p.kind ?? "post") === k);
  return { videos: byKind("video"), posts: byKind("post"), accounts: byKind("account") };
}

// ------------------------------------------------------------- Best reads

export async function getReads(limit = 6): Promise<ExternalRead[]> {
  // No fabricated fallback — only real rows; the section hides when empty.
  let all: ExternalRead[] = [];
  try {
    const { data, error } = await supabase
      .from("external_reads")
      .select("*")
      .order("published_at", { ascending: false });
    if (!error && data && data.length > 0) all = data as ExternalRead[];
  } catch {
    /* leave empty */
  }
  // Featured first, then most recent.
  return [...all].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, limit);
}

// -------------------------------------------------------- Benchmark of week

export async function getBenchmarkOfWeek(): Promise<BenchmarkStat> {
  return pickBenchmarkOfWeek();
}

// ---------------------------------------------------------------- Helpers

export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}
