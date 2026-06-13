-- Run this in your Supabase SQL editor

-- Trend pages (the core table)
CREATE TABLE IF NOT EXISTS trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('worship', 'sermon', 'scripture', 'comms', 'seasonal', 'benchmark')),
  title TEXT NOT NULL,
  subtitle TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  data JSONB NOT NULL DEFAULT '[]',
  summary TEXT,
  sources JSONB DEFAULT '[]',
  related_slugs JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_description TEXT
);

-- Index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_trends_slug ON trends(slug);
CREATE INDEX IF NOT EXISTS idx_trends_status ON trends(status);
CREATE INDEX IF NOT EXISTS idx_trends_category ON trends(category);
CREATE INDEX IF NOT EXISTS idx_trends_updated ON trends(updated_at DESC);

-- Seasonal pages
CREATE TABLE IF NOT EXISTS seasonal_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  holiday TEXT NOT NULL,
  year INTEGER NOT NULL,
  content TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pipeline run log
CREATE TABLE IF NOT EXISTS pipeline_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ran_at TIMESTAMPTZ DEFAULT NOW(),
  pages_updated INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  summary TEXT
);

-- Enable Row Level Security (read-only for anon)
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonal_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_runs ENABLE ROW LEVEL SECURITY;

-- Public can read published trends
CREATE POLICY "Public read published trends"
  ON trends FOR SELECT
  USING (status = 'published');

-- Public can read seasonal pages
CREATE POLICY "Public read seasonal pages"
  ON seasonal_pages FOR SELECT
  USING (true);

-- Pipeline runs: no public access
CREATE POLICY "No public access to pipeline runs"
  ON pipeline_runs FOR SELECT
  USING (false);
