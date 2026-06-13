import { supabase } from "./supabase";
import { TrendPage, TrendCategory } from "./types";
import { SAMPLE_TRENDS } from "./sampleData";

/**
 * Data-access helpers for trend pages.
 *
 * Every reader falls back to curated sample data when Supabase returns no
 * published rows (or errors / isn't configured). This guarantees the site
 * never renders as an empty shell. As soon as the pipeline publishes real
 * rows, those take over automatically.
 */

async function fetchPublished(): Promise<TrendPage[] | null> {
  try {
    const { data, error } = await supabase
      .from("trends")
      .select("*")
      .eq("status", "published")
      .order("updated_at", { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data as TrendPage[];
  } catch {
    return null;
  }
}

/** True when we're serving curated preview data rather than live DB rows. */
export async function isPreviewData(): Promise<boolean> {
  return (await fetchPublished()) === null;
}

export async function getAllTrends(): Promise<TrendPage[]> {
  return (await fetchPublished()) ?? SAMPLE_TRENDS;
}

export async function getLatestTrends(limit = 12): Promise<TrendPage[]> {
  const all = await getAllTrends();
  return all.slice(0, limit);
}

export async function getTrendsByCategory(category: TrendCategory): Promise<TrendPage[]> {
  const all = await getAllTrends();
  return all.filter((t) => t.category === category);
}

export async function getTrendBySlug(slug: string): Promise<TrendPage | null> {
  const live = await fetchPublished();
  if (live) return live.find((t) => t.slug === slug) ?? null;
  return SAMPLE_TRENDS.find((t) => t.slug === slug) ?? null;
}

export async function getRelatedTrends(slugs: string[]): Promise<TrendPage[]> {
  if (!slugs?.length) return [];
  const all = await getAllTrends();
  return all.filter((t) => slugs.includes(t.slug));
}
