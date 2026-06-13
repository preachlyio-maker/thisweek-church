export type TrendCategory =
  | "worship"
  | "sermon"
  | "scripture"
  | "comms"
  | "seasonal"
  | "benchmark";

export type TrendStatus = "draft" | "published" | "archived";

export interface TrendItem {
  rank: number;
  label: string;
  value?: string | number;
  delta?: "up" | "down" | "new";
  note?: string;
}

export interface TrendPage {
  id: string;
  slug: string;
  category: TrendCategory;
  title: string;
  subtitle?: string;
  updated_at: string;
  data: TrendItem[];
  summary: string;
  sources: { label: string; url?: string }[];
  related_slugs: string[];
  status: TrendStatus;
  meta_description?: string;
}

export interface SeasonalPage {
  id: string;
  slug: string;
  holiday: string;
  year: number;
  content: string;
  published_at: string;
}

export interface PipelineRun {
  id: string;
  ran_at: string;
  pages_updated: number;
  errors: string[];
  summary: string;
}

// ---------- Editorial articles (2x daily) ----------

export type ArticleType =
  | "Data Dive"
  | "Benchmark Spotlight"
  | "Trend Report"
  | "Community Spotlight"
  | "Tool & Tactic"
  | "Seasonal Prep";

export interface Article {
  id: string;
  slug: string;
  title: string;
  type: ArticleType;
  summary: string;
  /** Plain text. Blank lines separate paragraphs; lines starting with "## " are subheads. */
  body: string;
  tags: string[];
  related_slugs: string[];
  featured_image_prompt?: string;
  published_at: string;
  status: TrendStatus;
  meta_description?: string;
}

// ---------- "Around the Church This Week" social wall ----------

export type SocialPlatform = "instagram" | "twitter" | "tiktok" | "youtube";

/** Which lane a row belongs to on the social wall. Defaults to "post". */
export type SocialKind = "video" | "post" | "account";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  kind?: SocialKind;
  account_handle: string;
  account_name?: string;
  post_url: string;
  thumbnail_url?: string;
  caption_excerpt: string;
  likes: number;
  comments: number;
  captured_at: string;
  /** Legacy flag, no longer used by the wall. */
  is_spotlight?: boolean;
}

// ---------- "Best Reads" — external content we high-five ----------

export interface ExternalRead {
  id: string;
  source: string;
  title: string;
  url: string;
  summary: string;
  published_at: string;
  relevance_score: number;
  featured: boolean;
}

// ---------- Benchmark-of-the-week spotlight ----------

export interface BenchmarkStat {
  slug: string;
  label: string;
  /** The headline figure, e.g. "28–34%". */
  stat: string;
  /** One line of comparison/context. */
  context: string;
  source: string;
  href: string;
}

// ---------- Full benchmark detail pages ----------

export interface BenchmarkComparison {
  label: string;
  value: string;
  /** The church figure — rendered emphasized. */
  highlight?: boolean;
}

export interface BenchmarkTier {
  tier: string;
  value: string;
  note?: string;
}

export interface BenchmarkPage {
  slug: string;
  title: string;
  /** Short label above the hero stat, e.g. "Average church email open rate". */
  label: string;
  /** Headline figure, e.g. "28–34%". */
  hero_stat: string;
  hero_caption: string;
  summary: string;
  comparisons: BenchmarkComparison[];
  /** Breakdown across the four church-size tiers. */
  by_size: BenchmarkTier[];
  /** The 3 things above-average churches share. */
  common_factors: string[];
  tips?: string[];
  /** Optional one-sentence, in-context Preachly mention. */
  preachly?: string;
  sources: { label: string; url?: string }[];
  related_slugs: string[];
  updated_at: string;
  meta_description?: string;
}
