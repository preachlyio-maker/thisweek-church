#!/usr/bin/env node
/**
 * thisweek.church pipeline
 *
 * Run once:        node --env-file=.env.local pipeline/run.js
 * Run articles 2x/day (6am, 2pm) + the weekly data refresh via cron/CI.
 *
 * Steps run in order; each is wrapped so one failure never aborts the run.
 * Sources that aren't automated yet (CCLI scrape, social APIs) are safe,
 * clearly-logged stubs using seed data — swap in real fetchers as they land.
 */

import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const ARTICLE_MODEL = process.env.ARTICLE_MODEL || "claude-sonnet-4-6";
const AUTOPUBLISH = process.env.ARTICLE_AUTOPUBLISH === "true";

const supabase = SUPABASE_URL && SERVICE_KEY ? createClient(SUPABASE_URL, SERVICE_KEY) : null;
const anthropic = ANTHROPIC_KEY ? new Anthropic({ apiKey: ANTHROPIC_KEY }) : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
const ymd = () => new Date().toISOString().slice(0, 10).replace(/-/g, "");

function claudeText(message) {
  const block = message?.content?.find((b) => b.type === "text");
  return block ? block.text : "";
}

function extractJson(text) {
  // Tolerate code fences / prose around the JSON.
  const match = text.match(/[[{][\s\S]*[}\]]/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function toIso(value) {
  const d = new Date(value || Date.now());
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// ─── Trend sources (seed data until live scrapers land) ──────────────────────

const TREND_SEEDS = {
  worship: {
    slug: "top-worship-songs-this-week",
    title: "Top Worship Songs This Week",
    subtitle: "The most-licensed and most-played worship songs across CCLI reporting churches.",
    category: "worship",
    data: [
      { rank: 1, label: "Gratitude — Brandon Lake", value: "CCLI #1", delta: "up" },
      { rank: 2, label: "Praise — Elevation Worship", value: "CCLI #2", delta: "up" },
      { rank: 3, label: "Holy Forever — Chris Tomlin", value: "CCLI #3", delta: "down" },
      { rank: 4, label: "Firm Foundation — Cody Carnes", value: "CCLI #4" },
      { rank: 5, label: "Goodness of God — Bethel Music", value: "CCLI #5" },
    ],
    sources: [{ label: "CCLI Top Songs", url: "https://us.ccli.com/top-100" }],
    related_slugs: ["top-sermon-topics-this-month", "most-preached-scriptures"],
  },
  sermon: {
    slug: "top-sermon-topics-this-month",
    title: "Top Sermon Topics This Month",
    subtitle: "What church leaders are preaching — based on sermon RSS feeds, series announcements, and plan data.",
    category: "sermon",
    data: [
      { rank: 1, label: "Rest & Sabbath", delta: "up", note: "Seasonal spike — summer" },
      { rank: 2, label: "Anxiety & Peace", delta: "up" },
      { rank: 3, label: "Identity in Christ", delta: "new" },
      { rank: 4, label: "Generosity & Stewardship" },
      { rank: 5, label: "Prayer" },
    ],
    sources: [{ label: "Top-100 church sermon feeds" }, { label: "YouVersion plans" }],
    related_slugs: ["top-worship-songs-this-week", "most-preached-scriptures"],
  },
  scripture: {
    slug: "most-preached-scriptures",
    title: "Most-Preached Scriptures This Month",
    subtitle: "Bible passages appearing most frequently across sermons, plans, and devotionals.",
    category: "scripture",
    data: [
      { rank: 1, label: "Matthew 11:28-30", note: "Come to me, all who are weary", delta: "up" },
      { rank: 2, label: "Philippians 4:6-7", delta: "up" },
      { rank: 3, label: "Psalm 23" },
      { rank: 4, label: "Romans 8:28", delta: "new" },
      { rank: 5, label: "Joshua 1:9" },
    ],
    sources: [{ label: "YouVersion highlight data" }, { label: "Sermon index" }],
    related_slugs: ["top-sermon-topics-this-month"],
  },
  comms: {
    slug: "church-communication-trends",
    title: "Church Communication Trends",
    subtitle: "What's working in church social, email, and digital outreach right now.",
    category: "comms",
    data: [
      { rank: 1, label: "Sermon recap Reels (15–30s)", delta: "up" },
      { rank: 2, label: "Sunday-morning text reminders", delta: "up" },
      { rank: 3, label: "\"Bring a friend\" summer invites", delta: "new" },
      { rank: 4, label: "QR codes for giving & connect cards" },
      { rank: 5, label: "Weekly email digest (one CTA)" },
    ],
    sources: [{ label: "Church Comms Facebook Group" }, { label: "Social trend monitoring" }],
    related_slugs: ["top-worship-songs-this-week"],
  },
  benchmark: {
    slug: "church-engagement-benchmarks",
    title: "Church Engagement Benchmarks",
    subtitle: "What normal looks like for church digital engagement — so you know how you stack up.",
    category: "benchmark",
    data: [
      { rank: 1, label: "Email open rate", value: "28–34%", note: "vs ~21% general nonprofit" },
      { rank: 2, label: "Online share of giving", value: "60–67%" },
      { rank: 3, label: "Instagram engagement rate", value: "2.5–4%" },
      { rank: 4, label: "First-time visitor return rate", value: "15–20%" },
      { rank: 5, label: "App weekly active users", value: "~22% of congregation" },
    ],
    sources: [{ label: "Mailchimp nonprofit benchmarks" }, { label: "Pushpay data report" }],
    related_slugs: ["church-communication-trends"],
  },
};

async function generateTrendSummary(trend) {
  if (!anthropic) return trend.summary || "";
  const dataStr = trend.data
    .map((d, i) => `${i + 1}. ${d.label}${d.value ? ` (${d.value})` : ""}${d.note ? ` — ${d.note}` : ""}`)
    .join("\n");
  const message = await anthropic.messages.create({
    model: ARTICLE_MODEL,
    max_tokens: 700,
    messages: [
      {
        role: "user",
        content: `You are writing a church trends brief for ministry communicators, worship directors, and church comms teams.

Category: ${trend.category}
Title: ${trend.title}

Data this week:
${dataStr}

Write a 320–380 word trend summary: a 2-sentence opening on what the data shows, three short observation paragraphs useful to a church communicator, and a final "What this means for your ministry" paragraph with one practical takeaway.

Tone: Barna Research meets Morning Brew — authoritative, warm, never preachy. No bullet points, flowing prose only. Output the body only, no title.`,
      },
    ],
  });
  return claudeText(message);
}

async function upsertTrend(trend, ctx) {
  if (!supabase) return;
  const summary = await generateTrendSummary(trend);
  const record = {
    slug: trend.slug,
    title: trend.title,
    subtitle: trend.subtitle || null,
    category: trend.category,
    data: trend.data,
    summary,
    sources: trend.sources || [],
    related_slugs: trend.related_slugs || [],
    status: "published",
    updated_at: new Date().toISOString(),
    meta_description: `${trend.title} — updated weekly church trend data from This Week · Church`,
  };
  const { error } = await supabase.from("trends").upsert(record, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  ctx.pagesUpdated++;
  ctx.changedPaths.add(`/trends/${trend.slug}`);
  console.log(`  ✓ trends/${trend.slug}`);
  await sleep(1500); // gentle on the Claude rate limit
}

// ─── Steps ───────────────────────────────────────────────────────────────────

async function fetchWorshipCharts(ctx) {
  // TODO: scrape ccli.com/top-100 + Spotify/Apple/YouTube charts. Seed for now.
  await upsertTrend(TREND_SEEDS.worship, ctx);
}

async function fetchSermonTopics(ctx) {
  // TODO: aggregate sermon RSS feeds from the top-100 churches. Seed for now.
  await upsertTrend(TREND_SEEDS.sermon, ctx);
}

async function fetchScriptureData(ctx) {
  // TODO: YouVersion + Bible Gateway trending, cross-referenced with sermons. Seed for now.
  await upsertTrend(TREND_SEEDS.scripture, ctx);
}

async function fetchBenchmarkData(ctx) {
  // Benchmarks are mostly static (lib/sampleBenchmarks.ts); this keeps the
  // /trends benchmark card fresh from published reports.
  await upsertTrend(TREND_SEEDS.benchmark, ctx);
}

async function fetchCommsTrends(ctx) {
  // TODO: Church Comms FB group + IG/TikTok monitoring. Seed for now.
  await upsertTrend(TREND_SEEDS.comms, ctx);
}

// Leadership/preaching YouTube channels for the "Watch This Week" wall.
const YT_CHANNELS = [
  ["The Gospel Coalition", "UCQMwm-DeHyFK5VPp6KySR5Q"],
  ["Life.Church Open Network", "UCGDGRcOQeYgcHcGl0xUoTSQ"],
  ["Andy Stanley", "UCZWmksterrOcTNh1ljvs6Hg"],
];

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}

async function fetchSocialPosts(ctx) {
  // Auto-refreshes the YouTube video wall (kind="video") with the MOST-VIEWED
  // RECENT leadership videos — so the wall trends and feels fresh each week.
  // Accounts + trending posts are curated via /admin/seed. Needs a YouTube key.
  if (!supabase) return;
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    console.log("  · YOUTUBE_API_KEY not set — skipping video refresh (seeded videos stay live)");
    return;
  }

  // 1) Gather candidate video IDs: most-viewed videos from the last 45 days
  //    across the curated leadership channels.
  const publishedAfter = new Date(Date.now() - 45 * 86400000).toISOString();
  const candidates = new Map(); // videoId -> channelName
  for (const [name, channelId] of YT_CHANNELS) {
    try {
      const url =
        `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}` +
        `&part=snippet&type=video&order=viewCount&maxResults=5&publishedAfter=${encodeURIComponent(publishedAfter)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      for (const it of json.items || []) {
        if (it.id?.videoId) candidates.set(it.id.videoId, name);
      }
      console.log(`  · ${name}: ${(json.items || []).length} candidates`);
    } catch (err) {
      console.log(`  · ${name}: skipped (${err.message})`);
    }
  }
  const ids = [...candidates.keys()];
  if (ids.length === 0) return;

  // 2) Pull real statistics (view/comment counts) for the candidates.
  let rows = [];
  try {
    const statUrl =
      `https://www.googleapis.com/youtube/v3/videos?key=${key}` +
      `&part=snippet,statistics&id=${ids.slice(0, 50).join(",")}`;
    const res = await fetch(statUrl, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    rows = (json.items || []).map((it) => {
      const sn = it.snippet || {};
      const st = it.statistics || {};
      return {
        platform: "youtube",
        kind: "video",
        account_handle: sn.channelId || "youtube",
        account_name: sn.channelTitle || candidates.get(it.id) || "",
        caption_excerpt: decodeEntities(sn.title || ""),
        post_url: `https://www.youtube.com/watch?v=${it.id}`,
        thumbnail_url:
          (sn.thumbnails?.high || sn.thumbnails?.medium || {}).url ||
          `https://img.youtube.com/vi/${it.id}/hqdefault.jpg`,
        likes: parseInt(st.viewCount || "0", 10), // we surface views in the "likes" column
        comments: parseInt(st.commentCount || "0", 10),
        captured_at: new Date().toISOString(),
      };
    });
  } catch (err) {
    console.log(`  · stats lookup failed (${err.message})`);
    return;
  }

  // 3) Rank by views, keep the top 8.
  rows.sort((a, b) => b.likes - a.likes);
  rows = rows.slice(0, 8);
  if (rows.length === 0) return;

  // Replace just the video lane; leaves curated accounts/posts untouched.
  await supabase.from("social_posts").delete().eq("kind", "video");
  const { error } = await supabase.from("social_posts").insert(rows);
  if (error) throw new Error(error.message);
  ctx.changedPaths.add("/");
  console.log(`  ✓ refreshed ${rows.length} trending videos`);
}

// Broad curated set of reputable church sources, skewed to PASTORS & LEADERSHIP.
// Broken/unreachable feeds are skipped automatically — over-inclusion is safe.
const RSS_FEEDS = [
  // Leadership / pastoral
  ["Carey Nieuwhof", "https://careynieuwhof.com/feed"],
  ["Church Answers", "https://churchanswers.com/feed"],
  ["The Unstuck Group", "https://theunstuckgroup.com/feed"],
  ["unSeminary", "https://unseminary.com/feed"],
  ["Eric Geiger", "https://ericgeiger.com/feed"],
  ["Ron Edmondson", "https://ronedmondson.com/feed"],
  ["Brian Dodd on Leadership", "https://briandoddonleadership.com/feed"],
  ["Chuck Lawless", "https://chucklawless.com/feed"],
  ["Sam Rainer", "https://samrainer.com/feed"],
  ["Karl Vaters", "https://karlvaters.com/feed"],
  ["The Malphurs Group", "https://malphursgroup.com/feed"],
  ["Vanderbloemen", "https://www.vanderbloemen.com/blog/rss.xml"],
  ["Tony Morgan", "https://tonymorganlive.com/feed"],
  // Preaching
  ["Preaching.com", "https://www.preaching.com/feed"],
  ["Pro Preacher", "https://propreacher.com/feed"],
  ["SermonCentral", "https://www.sermoncentral.com/pastors-preaching-articles.rss"],
  // Theology / discipleship
  ["The Gospel Coalition", "https://www.thegospelcoalition.org/feed"],
  ["Desiring God", "https://www.desiringgod.org/feed"],
  ["9Marks", "https://www.9marks.org/feed"],
  ["Crossway", "https://www.crossway.org/articles/feed/"],
  // Research / data
  ["Lifeway Research", "https://research.lifeway.com/feed"],
  ["Barna Group", "https://www.barna.com/feed"],
  ["Hartford Institute", "https://hartfordinstitute.org/feed"],
  // Growth / outreach / general
  ["Outreach Magazine", "https://outreachmagazine.com/feed"],
  ["ChurchLeaders", "https://churchleaders.com/feed"],
  ["Exponential", "https://exponential.org/feed"],
  ["Christianity Today", "https://www.christianitytoday.com/feed/"],
  ["RELEVANT", "https://relevantmagazine.com/feed"],
];

// Weighted toward the topics a lead/teaching/executive pastor cares about.
const RELEVANCE_KEYWORDS = {
  "lead pastor": 4, "senior pastor": 4, "executive pastor": 4,
  leadership: 3, preaching: 3, discipleship: 3, "church growth": 3,
  "church planting": 3, revitalization: 3, pastoral: 3, shepherd: 3, eldership: 3,
  pastor: 2, sermon: 2, vision: 2, strategy: 2, leader: 2, succession: 2,
  burnout: 2, team: 2, staff: 2, board: 2, calling: 2, theology: 2, gospel: 2,
  disciple: 2, attendance: 2, giving: 2, elders: 2,
  church: 1, ministry: 1, faith: 1, engagement: 1, growth: 1, outreach: 1,
  volunteer: 1, community: 1, prayer: 1, culture: 1, congregation: 1,
};

function stripTags(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#x27;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<(item|entry)[\s\S]*?<\/\1>/gi) || [];
  for (const block of blocks) {
    const tag = (name) => {
      const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
      return m ? stripTags(m[1]) : "";
    };
    const title = tag("title");
    let link = tag("link");
    if (!link) {
      const lm = block.match(/<link[^>]*href="([^"]+)"/i);
      link = lm ? lm[1] : "";
    }
    const description = tag("description") || tag("summary") || tag("content:encoded") || tag("content");
    const pubDate = tag("pubDate") || tag("published") || tag("updated");
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function scoreItem(item) {
  const hay = `${item.title} ${item.description}`.toLowerCase();
  let score = 0;
  for (const [kw, weight] of Object.entries(RELEVANCE_KEYWORDS)) {
    if (hay.includes(kw)) score += weight;
  }
  return score;
}

async function fetchExternalReads(ctx) {
  if (!supabase) return;
  const collected = [];
  for (const [source, url] of RSS_FEEDS) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "thisweek.church pipeline" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const items = parseFeed(xml).slice(0, 5);
      for (const it of items) collected.push({ source, ...it, score: scoreItem(it) });
      console.log(`  · ${source}: ${items.length} items`);
    } catch (err) {
      console.log(`  · ${source}: skipped (${err.message})`);
    }
  }

  const top = collected
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (top.length === 0) {
    console.log("  · no relevant reads found — leaving existing reads in place");
    return;
  }

  // One Claude call to write 2-sentence editorial summaries (never reproduce content).
  const summaries = {};
  if (anthropic) {
    const listing = top
      .map((it, i) => `${i}. [${it.source}] ${it.title}\n   ${it.description.slice(0, 240)}`)
      .join("\n");
    try {
      const msg = await anthropic.messages.create({
        model: ARTICLE_MODEL,
        max_tokens: 900,
        messages: [
          {
            role: "user",
            content: `For each church-content item below, write a warm, 2-sentence editorial summary that makes a reader want to click through. Summarize and high-five the writer — never reproduce their article.

${listing}

Respond ONLY with JSON: an array of objects {"index": number, "summary": string}.`,
          },
        ],
      });
      const parsed = extractJson(claudeText(msg));
      if (Array.isArray(parsed)) {
        for (const row of parsed) {
          if (typeof row.index === "number" && typeof row.summary === "string") summaries[row.index] = row.summary;
        }
      }
    } catch (err) {
      console.log(`  · summary generation skipped (${err.message})`);
    }
  }

  const rows = top.map((it, i) => ({
    source: it.source,
    title: it.title,
    url: it.link,
    summary: summaries[i] || it.description.slice(0, 200),
    relevance_score: it.score,
    featured: i === 0,
    published_at: toIso(it.pubDate),
  }));

  // Replace the weekly set (only now that we have fresh picks in hand, so a
  // failed fetch can never leave the section empty).
  await supabase.from("external_reads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("external_reads").insert(rows);
  if (error) throw new Error(error.message);
  ctx.readsCreated += rows.length;
  ctx.changedPaths.add("/reads");
  console.log(`  ✓ replaced reads with ${rows.length} fresh picks`);
}

const ARTICLE_TYPES = [
  "Data Dive", "Benchmark Spotlight", "Trend Report",
  "Community Spotlight", "Tool & Tactic", "Seasonal Prep",
];

async function buildTrendContext() {
  if (!supabase) return "No live trend data available.";
  const { data } = await supabase
    .from("trends")
    .select("title, category, data")
    .eq("status", "published")
    .order("updated_at", { ascending: false })
    .limit(6);
  if (!data || data.length === 0) return "No live trend data available.";
  return data
    .map((t) => {
      const top = (t.data || []).slice(0, 4).map((d) => d.label).join(", ");
      return `- ${t.title} (${t.category}): ${top}`;
    })
    .join("\n");
}

async function generateDailyArticles(ctx) {
  if (!anthropic || !supabase) {
    console.log("  · Anthropic/Supabase not configured — skipping article generation");
    return;
  }
  const context = await buildTrendContext();
  // Rotate two types per run based on the day so the mix varies.
  const dayIndex = Math.floor(Date.now() / 86400000);
  const picks = [ARTICLE_TYPES[(dayIndex * 2) % 6], ARTICLE_TYPES[(dayIndex * 2 + 1) % 6]];

  for (const type of picks) {
    try {
      const msg = await anthropic.messages.create({
        model: ARTICLE_MODEL,
        max_tokens: 2000,
        system:
          "You are a senior editor at a church trends publication. Your primary readers are lead, teaching, and executive pastors and church leaders. Write to their concerns — preaching, leadership, discipleship, church growth and health, and the research behind ministry strategy — at churches of all sizes.",
        messages: [
          {
            role: "user",
            content: `Article type: ${type}
Data context (this week's trends):
${context}

Target length: 600–800 words.
Tone: Barna Research meets Morning Brew — authoritative, warm, never preachy, never corporate.
Structure: Hook -> Data -> Insight -> Practical takeaway -> Actionable close.

Rules:
- Never use the phrase "In today's digital age".
- Never use "game-changer" or "leverage".
- Write like a human who goes to church and reads fast.
- One stat per paragraph max.
- End with something actionable.
- Use "## " for any subheadings in the body. Plain text, blank lines between paragraphs.

Data-source framing — attribute data naturally, like a researcher citing a dataset:
- Operational data (song choices, sermon topics, service timing): "churches using preachly.io" or "the preachly.io church network".
- Published benchmarks (Barna, Pushpay, YouVersion): "[Source name] research".
- Trends we aggregate ourselves: "thisweek.church tracking".
Always write the brand as "preachly.io" — never bare "Preachly", never "the leading platform". Use a preachly.io attribution at most once, and only when it genuinely fits (operational/engagement/communication data). It must read as a citation, not an ad.
Example: "Among churches using preachly.io, the most-planned worship song this month was What A Beautiful Name." Never: "preachly.io, the leading church communication platform…"

Respond ONLY with JSON:
{"title": string, "summary": string (1 sentence), "body": string, "tags": string[] (3-5)}`,
          },
        ],
      });
      const parsed = extractJson(claudeText(msg));
      if (!parsed || !parsed.title || !parsed.body) {
        console.log(`  · ${type}: model returned no usable article, skipping`);
        continue;
      }
      const slug = `${slugify(parsed.title)}-${ymd()}`;
      const record = {
        slug,
        title: parsed.title,
        type,
        summary: parsed.summary || "",
        body: parsed.body,
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        related_slugs: [],
        meta_description: parsed.summary || parsed.title,
        status: AUTOPUBLISH ? "published" : "draft",
        published_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("articles").upsert(record, { onConflict: "slug" });
      if (error) throw new Error(error.message);
      ctx.articlesCreated++;
      ctx.changedPaths.add("/articles");
      ctx.changedPaths.add(`/articles/${slug}`);
      console.log(`  ✓ ${AUTOPUBLISH ? "published" : "draft"}: ${type} — ${parsed.title}`);
      await sleep(1500);
    } catch (err) {
      console.log(`  · ${type}: ${err.message}`);
    }
  }
}

async function updateSitemap() {
  // The sitemap is generated dynamically by app/sitemap.ts on each request,
  // so there's nothing to write here. Revalidation refreshes its cache.
  console.log("  · sitemap is generated dynamically by Next — nothing to write");
}

async function revalidateChangedPages(ctx) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    console.log("  · REVALIDATE_SECRET not set — skipping (pages revalidate on next request)");
    return;
  }
  const always = ["/", "/trends", "/articles", "/reads", "/benchmarks"];
  const paths = new Set([...always, ...ctx.changedPaths]);
  for (const path of paths) {
    try {
      await fetch(
        `https://thisweek.church/api/revalidate?secret=${encodeURIComponent(secret)}&path=${encodeURIComponent(path)}`
      );
    } catch {
      /* non-fatal */
    }
  }
  console.log(`  ✓ revalidated ${paths.size} paths`);
}

async function logRun(ctx) {
  if (!supabase) return;
  const seconds = Math.round((Date.now() - ctx.startTime) / 1000);
  await supabase.from("pipeline_runs").insert({
    ran_at: new Date().toISOString(),
    pages_updated: ctx.pagesUpdated,
    errors: ctx.errors,
    summary: `${ctx.pagesUpdated} trends, ${ctx.articlesCreated} articles, ${ctx.readsCreated} reads in ${seconds}s`,
  });
  console.log(`  ✓ logged run`);
}

const PIPELINE_STEPS = [
  fetchWorshipCharts,
  fetchSermonTopics,
  fetchScriptureData,
  fetchBenchmarkData,
  fetchCommsTrends,
  fetchSocialPosts,
  fetchExternalReads,
  generateDailyArticles,
  updateSitemap,
  revalidateChangedPages,
  logRun,
];

async function run() {
  console.log("\n🏃 thisweek.church pipeline starting…\n");
  if (!supabase) {
    console.error("✗ Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — aborting.");
    process.exit(1);
  }
  if (!anthropic) console.warn("⚠ ANTHROPIC_API_KEY not set — summaries and articles will be skipped.\n");

  const ctx = {
    startTime: Date.now(),
    errors: [],
    changedPaths: new Set(),
    pagesUpdated: 0,
    articlesCreated: 0,
    readsCreated: 0,
  };

  for (const step of PIPELINE_STEPS) {
    console.log(`▶ ${step.name}`);
    try {
      await step(ctx);
    } catch (err) {
      const m = `${step.name}: ${err.message}`;
      console.error("  ✗", m);
      ctx.errors.push(m);
    }
  }

  console.log(
    `\n✅ Done. ${ctx.pagesUpdated} trends · ${ctx.articlesCreated} articles · ${ctx.readsCreated} reads · ${ctx.errors.length} errors.\n`
  );
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
