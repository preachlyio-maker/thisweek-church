-- Content architecture additions for thisweek.church
-- Run this in your Supabase SQL editor (after supabase-schema.sql).
-- Until these tables are populated, the site renders curated sample content
-- from lib/sampleContent.ts (the same fallback pattern as trends).

-- ---------- Editorial articles (2x daily) ----------
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'Data Dive', 'Benchmark Spotlight', 'Trend Report',
    'Community Spotlight', 'Tool & Tactic', 'Seasonal Prep'
  )),
  summary TEXT,
  body TEXT NOT NULL DEFAULT '',
  tags JSONB DEFAULT '[]',
  related_slugs JSONB DEFAULT '[]',
  featured_image_prompt TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);

-- ---------- Social wall: "Around the Church This Week" ----------
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'twitter', 'tiktok', 'youtube')),
  account_handle TEXT NOT NULL,
  account_name TEXT,
  post_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption_excerpt TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  is_spotlight BOOLEAN DEFAULT FALSE,
  captured_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_captured ON social_posts(captured_at DESC);

-- ---------- External reads: "Best Church Reads This Week" ----------
CREATE TABLE IF NOT EXISTS external_reads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  summary TEXT,
  relevance_score NUMERIC DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reads_published ON external_reads(published_at DESC);

-- ---------- Row Level Security (public read, like trends) ----------
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles"
  ON articles FOR SELECT USING (status = 'published');

CREATE POLICY "Public read social posts"
  ON social_posts FOR SELECT USING (true);

CREATE POLICY "Public read external reads"
  ON external_reads FOR SELECT USING (true);
