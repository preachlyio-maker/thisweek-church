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
