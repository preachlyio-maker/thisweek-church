import { BenchmarkPage } from "./types";

/**
 * Church engagement benchmarks. These are "static / semi-static from published
 * reports" (per spec) — curated here rather than scraped, and cite their
 * sources. Figures are representative ranges drawn from the named reports;
 * refine against the latest editions as they publish.
 */

const UPDATED = "2026-06-08T09:00:00.000Z";

export const BENCHMARK_PAGES: BenchmarkPage[] = [
  {
    slug: "first-time-visitor-return-rate",
    title: "First-Time Visitor Return Rate",
    label: "First-time visitor return rate",
    hero_stat: "15–20%",
    hero_caption:
      "The most-wanted number in the church world. Four of five first-timers never come back — and the gap between the best and worst churches is almost entirely follow-up.",
    summary:
      "What share of first-time guests return for a second visit, why most don't, and the follow-up habit that separates the top quartile.",
    comparisons: [
      { label: "Church-world average", value: "15–20%", highlight: true },
      { label: "Top-quartile churches", value: "30–40%" },
      { label: "With a personal 48-hour follow-up", value: "~2× baseline" },
    ],
    by_size: [
      { tier: "Under 200", value: "22%", note: "Relational advantage" },
      { tier: "200–500", value: "19%" },
      { tier: "500–2,000", value: "17%" },
      { tier: "2,000+", value: "15%", note: "Hardest to feel known" },
    ],
    common_factors: [
      "A personal contact within 48 hours — a text or call, not a mass email",
      "One clear next step, not five competing ones",
      "Low-friction info capture, usually a text-to-connect number on screen",
    ],
    preachly:
      "Churches without a large follow-up team often lean on tools like preachly.io to make sure every first-time guest gets a timely, personal next step.",
    sources: [
      { label: "Faith Communities Today (FACT) survey" },
      { label: "Pushpay State of Church Giving" },
      { label: "Reporting-church averages" },
    ],
    related_slugs: ["church-attendance", "sermon-stream-numbers"],
    updated_at: UPDATED,
    meta_description:
      "The church first-time visitor return rate is 15–20%. Here's the benchmark by church size and the 48-hour follow-up habit that doubles it.",
  },
  {
    slug: "email-open-rates",
    title: "Church Email Open Rates",
    label: "Average church email open rate",
    hero_stat: "28–34%",
    hero_caption:
      "Churches beat almost every other sector on email opens. Congregations actually want to hear from you — the trick is not wasting it.",
    summary:
      "How church email open rates compare to nonprofit and retail benchmarks, the breakdown by church size, and the subject lines and send times that lift opens.",
    comparisons: [
      { label: "Church average", value: "31%", highlight: true },
      { label: "General nonprofit", value: "21%" },
      { label: "Retail / e-commerce", value: "17%" },
    ],
    by_size: [
      { tier: "Under 200", value: "36%", note: "Highest intimacy" },
      { tier: "200–500", value: "32%" },
      { tier: "500–2,000", value: "29%" },
      { tier: "2,000+", value: "26%" },
    ],
    common_factors: [
      "Sent from a person's name, not a generic 'info@' address",
      "One clear call to action per email, not a newsletter of ten",
      "A consistent weekly cadence the congregation comes to expect",
    ],
    tips: [
      "Subject lines under six words consistently lift opens",
      "Tuesday and Thursday mornings outperform Mondays",
      "A Sunday 6am \"here's what's happening today\" email over-indexes",
    ],
    sources: [
      { label: "Mailchimp nonprofit email benchmarks" },
      { label: "Church Communications Group research" },
    ],
    related_slugs: ["online-giving", "social-media-engagement"],
    updated_at: UPDATED,
    meta_description:
      "Church email open rates average 28–34% — well above nonprofit and retail. See the benchmark by church size plus subject-line and send-time tips.",
  },
  {
    slug: "online-giving",
    title: "Online Giving Benchmarks",
    label: "Share of giving that happens online",
    hero_stat: "60–67%",
    hero_caption: "Digital is now the default offering plate. The question is no longer whether people give online — it's whether they give on a schedule.",
    summary:
      "The digital share of church giving, mobile vs. desktop, recurring vs. one-time, average gift size, and how it breaks down by church size.",
    comparisons: [
      { label: "Given online", value: "63%", highlight: true },
      { label: "Recurring share of online gifts", value: "38%" },
      { label: "Mobile share of online giving", value: "58%" },
      { label: "Average one-time online gift", value: "$112" },
    ],
    by_size: [
      { tier: "Under 200", value: "48%", note: "More cash & check" },
      { tier: "200–500", value: "58%" },
      { tier: "500–2,000", value: "66%" },
      { tier: "2,000+", value: "74%" },
    ],
    common_factors: [
      "Recurring giving prompted directly — a bulletin line or an on-screen QR code",
      "A giving link in the footer of every email",
      "Text-to-give available for spontaneous, in-the-moment generosity",
    ],
    sources: [
      { label: "Pushpay State of Church Giving" },
      { label: "Nonprofits Source giving statistics" },
      { label: "Giving USA annual report" },
    ],
    related_slugs: ["email-open-rates", "church-attendance"],
    updated_at: UPDATED,
    meta_description:
      "Around 63% of church giving now happens online. See mobile vs. desktop, recurring vs. one-time, average gift size, and the breakdown by church size.",
  },
  {
    slug: "church-attendance",
    title: "Church Attendance Benchmarks",
    label: "Weekend attendance vs. 2019",
    hero_stat: "85–95%",
    hero_caption:
      "Most churches have recovered to near pre-2020 in-person levels — but the shape of attendance changed more than the size of it.",
    summary:
      "In-person recovery vs. 2019, the rise of total digital reach, multisite growth, and how recovery breaks down by church size.",
    comparisons: [
      { label: "In-person vs. 2019", value: "~89%", highlight: true },
      { label: "Total reach incl. online vs. 2019", value: "+12%" },
      { label: "Multisite churches, YoY growth", value: "+8%" },
    ],
    by_size: [
      { tier: "Under 200", value: "82%", note: "Slowest to recover" },
      { tier: "200–500", value: "88%" },
      { tier: "500–2,000", value: "93%" },
      { tier: "2,000+", value: "98%", note: "Fastest rebound" },
    ],
    common_factors: [
      "A clear next step beyond the Sunday service",
      "Consistent, multi-week series planning people can follow",
      "Strong first-time guest follow-up that turns visitors into regulars",
    ],
    sources: [
      { label: "Faith Communities Today (FACT) survey" },
      { label: "Barna Research" },
      { label: "Lifeway Research" },
    ],
    related_slugs: ["first-time-visitor-return-rate", "sermon-stream-numbers"],
    updated_at: UPDATED,
    meta_description:
      "Most churches have recovered to 85–95% of 2019 in-person attendance, with total reach up. See the breakdown by church size and what the leaders share.",
  },
  {
    slug: "social-media-engagement",
    title: "Church Social Media Engagement",
    label: "Average engagement rate, church Instagram",
    hero_stat: "2.5–4%",
    hero_caption:
      "Church accounts punch well above typical brand engagement. Faces and community beat polish — and the smaller your following, the harder it works.",
    summary:
      "Average engagement rates for church Instagram, Facebook, and TikTok accounts, broken down by follower-count tier, plus what the top accounts do differently.",
    comparisons: [
      { label: "Church Instagram average", value: "~3.2%", highlight: true },
      { label: "Nonprofit average", value: "~1.6%" },
      { label: "General brand average", value: "~1.0%" },
    ],
    by_size: [
      { tier: "Under 1k followers", value: "6.1%", note: "Highest engagement" },
      { tier: "1k–10k", value: "3.8%" },
      { tier: "10k–50k", value: "2.4%" },
      { tier: "50k+", value: "1.5%" },
    ],
    common_factors: [
      "A recurring on-camera human the audience recognizes",
      "Reels and short-form over static announcement graphics",
      "Replying in the comments like it's a conversation, not a billboard",
    ],
    tips: [
      "Posting 3–4× a week beats daily-but-thin",
      "Carousels and Reels outperform single images",
      "Caption the first two seconds for the 80% watching on mute",
    ],
    sources: [
      { label: "Church Communications Group research" },
      { label: "ChurchSocial hashtag monitoring" },
    ],
    related_slugs: ["email-open-rates", "app-engagement"],
    updated_at: UPDATED,
    meta_description:
      "Church Instagram accounts average 2.5–4% engagement — well above brand norms. See the breakdown by follower tier and what the top accounts do.",
  },
  {
    slug: "app-engagement",
    title: "Church App Engagement",
    label: "Congregation using a church app weekly",
    hero_stat: "18–26%",
    hero_caption:
      "Most congregations engage digitally between Sundays — but a dedicated app isn't the only way to reach them, and it isn't always the most cost-effective.",
    summary:
      "Weekly church app usage, push notification open rates, and sermon replay rates — with the breakdown by church size and what drives midweek opens.",
    comparisons: [
      { label: "Weekly app users (of attendance)", value: "~22%", highlight: true },
      { label: "Push notification open rate", value: "~9%" },
      { label: "Sermon replay rate (of attendance)", value: "~14%" },
    ],
    by_size: [
      { tier: "Under 200", value: "12%", note: "App often overkill" },
      { tier: "200–500", value: "18%" },
      { tier: "500–2,000", value: "24%" },
      { tier: "2,000+", value: "31%" },
    ],
    common_factors: [
      "A reason to open midweek — real content, not just announcements",
      "Push notifications used sparingly and purposefully",
      "Sermon clips that pull people back to the full message",
    ],
    preachly:
      "Tools like preachly.io help churches deliver sermon notes, clips, and follow-up to their congregation without the cost of building and maintaining a dedicated app.",
    sources: [
      { label: "Church tech platform averages" },
      { label: "Pushpay engagement data" },
    ],
    related_slugs: ["sermon-stream-numbers", "social-media-engagement"],
    updated_at: UPDATED,
    meta_description:
      "About 18–26% of a congregation uses a church app weekly, with ~9% push open rates. See the breakdown by church size and what drives midweek engagement.",
  },
  {
    slug: "volunteer-retention",
    title: "Volunteer Retention Benchmarks",
    label: "Average volunteer tenure before drop-off",
    hero_stat: "14 months",
    hero_caption:
      "The first 90 days decide whether a volunteer stays a year or quietly fades. Most churches lose people to a cold start, not to burnout.",
    summary:
      "Average volunteer tenure, the share of regulars who serve, first-90-day drop-off, and the recruitment channels that actually work.",
    comparisons: [
      { label: "Average tenure", value: "14 months", highlight: true },
      { label: "Volunteers as a share of regulars", value: "~42%" },
      { label: "First-90-day drop-off", value: "~30%" },
    ],
    by_size: [
      { tier: "Under 200", value: "55%", note: "Most hands on deck" },
      { tier: "200–500", value: "47%" },
      { tier: "500–2,000", value: "40%" },
      { tier: "2,000+", value: "33%" },
    ],
    common_factors: [
      "A real onboarding moment, not a cold drop into the deep end",
      "A named team leader who notices when someone goes missing",
      "Clear, bounded roles — with an honorable off-ramp when seasons change",
    ],
    tips: [
      "A personal ask beats a stage announcement roughly 5 to 1",
      "\"Serve once\" try-it events convert better than open calls",
      "Existing volunteers recruiting friends is the top channel",
    ],
    sources: [
      { label: "Faith Communities Today (FACT) survey" },
      { label: "Barna Research" },
      { label: "Lifeway Research" },
    ],
    related_slugs: ["church-attendance", "first-time-visitor-return-rate"],
    updated_at: UPDATED,
    meta_description:
      "Average church volunteer tenure is about 14 months, with ~30% dropping off in the first 90 days. See the data by church size and what keeps people serving.",
  },
  {
    slug: "sermon-stream-numbers",
    title: "Sermon Stream & Online Attendance",
    label: "Online-to-in-person attendance ratio",
    hero_stat: "1 : 4",
    hero_caption:
      "For every four people in the room, roughly one more is watching online — and they aren't all would-be in-person attenders. Online is its own front door.",
    summary:
      "Online vs. in-person attendance ratios post-COVID, online's share of total reach, sermon replay behavior, and how it breaks down by church size.",
    comparisons: [
      { label: "Online : in-person ratio", value: "~1 : 4", highlight: true },
      { label: "Online share of total reach", value: "~22%" },
      { label: "Replay views (after the live stream)", value: "~30% of online" },
    ],
    by_size: [
      { tier: "Under 200", value: "14%", note: "Online share of reach" },
      { tier: "200–500", value: "19%" },
      { tier: "500–2,000", value: "24%" },
      { tier: "2,000+", value: "31%" },
    ],
    common_factors: [
      "Treating online as a front door, not a fallback for the sick or away",
      "A host engaging the stream directly, by name",
      "A clear path from watching at home to belonging in person",
    ],
    sources: [
      { label: "Barna Research" },
      { label: "Pushpay engagement data" },
      { label: "Lifeway Research" },
    ],
    related_slugs: ["church-attendance", "app-engagement"],
    updated_at: UPDATED,
    meta_description:
      "Churches average roughly a 1:4 online-to-in-person attendance ratio, with online ~22% of total reach. See the breakdown by church size post-COVID.",
  },
];

export function getBenchmarkPages(): BenchmarkPage[] {
  return BENCHMARK_PAGES;
}

export function getBenchmarkPageBySlug(slug: string): BenchmarkPage | null {
  return BENCHMARK_PAGES.find((b) => b.slug === slug) ?? null;
}
