import { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // During build, Supabase env may not be set — return static pages only
  const base = "https://thisweek.church";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/trends`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/seasonal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return staticPages;

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

    return [...staticPages, ...trendPages];
  } catch {
    return staticPages;
  }
}
