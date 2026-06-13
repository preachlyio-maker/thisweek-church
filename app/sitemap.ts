import { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { getBenchmarkPages } from "@/lib/sampleBenchmarks";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // During build, Supabase env may not be set — return static pages only
  const base = "https://thisweek.church";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/trends`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/trends/worship`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/trends/sermons`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/trends/scripture`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/articles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/reads`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/seasonal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/data`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Article pages (live rows or sample fallback).
  const articlePages: MetadataRoute.Sitemap = (await getArticles()).map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Benchmark detail pages (curated dataset).
  const benchmarkPages: MetadataRoute.Sitemap = getBenchmarkPages().map((b) => ({
    url: `${base}/benchmarks/${b.slug}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const evergreen = [...staticPages, ...articlePages, ...benchmarkPages];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return evergreen;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: trends } = await supabase
      .from("trends")
      .select("slug, updated_at")
      .eq("status", "published");

    const trendPages: MetadataRoute.Sitemap = (trends || []).map((t) => ({
      url: `${base}/trends/${t.slug}`,
      lastModified: new Date(t.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...evergreen, ...trendPages];
  } catch {
    return evergreen;
  }
}
