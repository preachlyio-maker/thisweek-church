#!/usr/bin/env node
/**
 * thisweek.church weekly pipeline
 * Run: node pipeline/run.js
 * 
 * Steps:
 * 1. fetch_data    — pull from sources (CCLI, Spotify, scrape targets)
 * 2. generate      — write/update summaries via Claude API
 * 3. sitemap_ping  — revalidate Vercel ISR pages that changed
 * 4. log_run       — write pipeline_runs entry to Supabase
 */

import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── 1. DATA SOURCES ─────────────────────────────────────────────────────────
// Each source returns: { slug, title, category, subtitle, data[], sources[] }
// data[] items: { rank, label, value?, delta?, note? }

async function fetchWorshipSongs() {
  // CCLI publishes top songs at ccli.com/top-songs
  // For now: seed data. Replace with real scraper.
  return {
    slug: "top-worship-songs-this-week",
    title: "Top Worship Songs This Week",
    subtitle: "The most-licensed and most-played worship songs across CCLI reporting churches.",
    category: "worship",
    data: [
      { rank: 1, label: "What A Beautiful Name", value: "CCLI #1", delta: "up" },
      { rank: 2, label: "Graves Into Gardens", value: "CCLI #2" },
      { rank: 3, label: "The Blessing", value: "CCLI #3", delta: "new" },
      { rank: 4, label: "Build My Life", value: "CCLI #4" },
      { rank: 5, label: "Goodness of God", value: "CCLI #5", delta: "up" },
    ],
    sources: [{ label: "CCLI Top Songs", url: "https://ccli.com/top-songs" }],
    related_slugs: ["top-sermon-topics-this-month", "most-used-scriptures"],
  };
}

async function fetchSermonTopics() {
  return {
    slug: "top-sermon-topics-this-month",
    title: "Top Sermon Topics This Month",
    subtitle: "What church leaders are preaching — based on podcast titles, series announcements, and YouVersion plan data.",
    category: "sermon",
    data: [
      { rank: 1, label: "Identity in Christ", delta: "up" },
      { rank: 2, label: "Anxiety & Peace", delta: "up", note: "Seasonal spike — post-summer" },
      { rank: 3, label: "Community & Belonging" },
      { rank: 4, label: "Prayer", delta: "new" },
      { rank: 5, label: "Generosity" },
    ],
    sources: [{ label: "YouVersion Plans Data" }, { label: "Podcast Title Analysis" }],
    related_slugs: ["top-worship-songs-this-week", "most-used-scriptures"],
  };
}

async function fetchScriptures() {
  return {
    slug: "most-used-scriptures",
    title: "Most-Preached Scriptures This Month",
    subtitle: "Bible passages appearing most frequently across sermons, plans, and devotionals.",
    category: "scripture",
    data: [
      { rank: 1, label: "Philippians 4:6-7", note: "Do not be anxious..." },
      { rank: 2, label: "Romans 8:28" },
      { rank: 3, label: "Jeremiah 29:11", delta: "up" },
      { rank: 4, label: "John 3:16" },
      { rank: 5, label: "Psalm 23", delta: "new" },
    ],
    sources: [{ label: "YouVersion Highlight Data" }, { label: "Sermon Index" }],
    related_slugs: ["top-sermon-topics-this-month"],
  };
}

async function fetchCommsTrends() {
  return {
    slug: "church-communication-trends",
    title: "Church Communication Trends",
    subtitle: "What's working in church social, email, and digital outreach right now.",
    category: "comms",
    data: [
      { rank: 1, label: "Sermon recap Reels (15–30s)", delta: "up" },
      { rank: 2, label: "Behind-the-scenes worship prep content" },
      { rank: 3, label: "Countdown graphics for series launches", delta: "new" },
      { rank: 4, label: "Midweek devotional email sequences" },
      { rank: 5, label: "Pastor Q&A Stories / Lives" },
    ],
    sources: [{ label: "Church Comms Facebook Group" }, { label: "Social trend monitoring" }],
    related_slugs: ["top-worship-songs-this-week", "church-engagement-benchmarks"],
  };
}

async function fetchEngagementBenchmarks() {
  return {
    slug: "church-engagement-benchmarks",
    title: "Church Engagement Benchmarks",
    subtitle: "What normal looks like for church digital engagement — so you know how you stack up.",
    category: "benchmark",
    data: [
      { rank: 1, label: "Email open rate", value: "28–34%", note: "Church avg vs 21% general nonprofit" },
      { rank: 2, label: "Sermon link click rate", value: "8–12%" },
      { rank: 3, label: "Instagram avg reach per post", value: "12–18% of followers" },
      { rank: 4, label: "Giving page conversion", value: "2.1%" },
      { rank: 5, label: "App weekly active users", value: "22% of congregation" },
    ],
    sources: [{ label: "Mailchimp Nonprofit Benchmarks" }, { label: "Pushpay Data Report" }],
    related_slugs: ["church-communication-trends"],
  };
}

const DATA_SOURCES = [
  fetchWorshipSongs,
  fetchSermonTopics,
  fetchScriptures,
  fetchCommsTrends,
  fetchEngagementBenchmarks,
];

// ─── 2. SUMMARY GENERATION ────────────────────────────────────────────────────

async function generateSummary(trend) {
  const dataStr = trend.data.map((d, i) => `${i + 1}. ${d.label}${d.value ? ` (${d.value})` : ""}${d.note ? ` — ${d.note}` : ""}`).join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 700,
    messages: [
      {
        role: "user",
        content: `You are writing a church trends brief for ministry communicators, worship directors, and church comms teams.

Category: ${trend.category}
Title: ${trend.title}

Data this week:
${dataStr}

Write a 350-400 word trend summary. Structure it as:
- 2-sentence opening: what the data shows overall
- 3 short paragraphs: one observation each, useful to a church communicator
- Final paragraph: "What this means for your ministry" — one practical takeaway

Tone: Barna Research meets Morning Brew. Authoritative but readable. No fluff. No AI-sounding phrases. No bullet points in the output — flowing prose only.

Output the article body only. No title, no headers.`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

// ─── 3. UPSERT TO SUPABASE ────────────────────────────────────────────────────

async function upsertTrend(trendData, summary) {
  const record = {
    slug: trendData.slug,
    title: trendData.title,
    subtitle: trendData.subtitle || null,
    category: trendData.category,
    data: trendData.data,
    summary,
    sources: trendData.sources || [],
    related_slugs: trendData.related_slugs || [],
    status: "published",
    updated_at: new Date().toISOString(),
    meta_description: `${trendData.title} — updated weekly church trend data from This Week · Church`,
  };

  const { error } = await supabase.from("trends").upsert(record, { onConflict: "slug" });

  if (error) {
    console.error(`  ✗ Failed to upsert ${trendData.slug}:`, error.message);
    return false;
  }

  console.log(`  ✓ ${trendData.slug}`);
  return true;
}

// ─── 4. VERCEL REVALIDATION ───────────────────────────────────────────────────

async function revalidatePage(slug) {
  const url = `https://thisweek.church/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/trends/${slug}`;
  try {
    await fetch(url);
  } catch {
    // Non-fatal — page will revalidate on next request anyway
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log("\n🏃 thisweek.church pipeline starting...\n");
  const startTime = Date.now();
  const errors = [];
  let pagesUpdated = 0;

  for (const fetchFn of DATA_SOURCES) {
    const name = fetchFn.name;
    console.log(`Fetching ${name}...`);

    try {
      const trendData = await fetchFn();
      console.log(`  Generating summary...`);
      const summary = await generateSummary(trendData);
      const ok = await upsertTrend(trendData, summary);
      if (ok) {
        pagesUpdated++;
        await revalidatePage(trendData.slug);
      }
    } catch (err) {
      const msg = `${name}: ${err.message}`;
      console.error("  ✗", msg);
      errors.push(msg);
    }

    // Rate limit — 1 Claude call every 2s
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Log the run
  await supabase.from("pipeline_runs").insert({
    ran_at: new Date().toISOString(),
    pages_updated: pagesUpdated,
    errors,
    summary: `Updated ${pagesUpdated} pages in ${Math.round((Date.now() - startTime) / 1000)}s`,
  });

  console.log(`\n✅ Done. ${pagesUpdated} pages updated. ${errors.length} errors.\n`);
}

run().catch(console.error);
