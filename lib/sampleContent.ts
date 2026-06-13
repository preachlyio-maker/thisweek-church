import { Article, SocialPost, ExternalRead, BenchmarkStat } from "./types";

/**
 * Curated preview content shown when the matching Supabase tables are empty
 * (articles, social_posts, external_reads). Same fallback philosophy as
 * lib/sampleData.ts — the site is never an empty shell, and live rows take
 * over automatically once the pipeline populates them.
 *
 * preachly.io is mentioned at most once per article, always in context, only in
 * pieces genuinely about digital engagement / comms / sermon distribution.
 */

// Day must be zero-padded — "2026-06-9" is not valid ISO 8601 and parses to Invalid Date.
const D = (day: string | number) => `2026-06-${String(day).padStart(2, "0")}T11:00:00.000Z`;

// ---------------------------------------------------------------- Articles

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "art-worship-charts",
    slug: "what-worship-charts-tell-us",
    title: "What This Week's Worship Charts Tell Us About Where the Church Is Heading",
    type: "Data Dive",
    summary:
      "The songs climbing the charts right now share a quiet pattern — and it says something about what congregations are reaching for this season.",
    tags: ["worship", "trends", "data"],
    related_slugs: ["top-worship-songs", "rising-worship-songs"],
    published_at: D("12"),
    status: "published",
    meta_description:
      "A data dive into this week's worship charts — what the rising songs reveal about where congregational singing is heading.",
    body: `If you lined up the ten fastest-rising worship songs this week and squinted, you'd notice they have less in common musically than you'd expect — and more in common emotionally.

## The pattern under the numbers

Brandon Lake's catalog is doing something unusual: two of his titles are climbing at the same time, on different trajectories. That's rare. It usually signals an artist whose sound has become a category of its own rather than a single hit.

But the more interesting signal isn't the artist. It's the lyrics. Seven of this week's top ten rising songs center on themes of steadiness — firm foundations, unchanging character, ground that holds. In a season when church-world headlines are dominated by anxiety and burnout, congregations are gravitating toward songs that feel like an anchor.

## What worship planners are actually doing

The teams adapting fastest aren't chasing every new release. They're pairing one rising title with one familiar anchor each week — introducing fresh material without asking the room to learn two new songs at once.

That restraint shows up in the data. Songs that climb and *stay* tend to enter set lists alongside a top-five standard, not on their own. The congregation learns by proximity.

## The takeaway

Watch the lyrics, not just the rankings. The chart is a slow-moving mood ring for the church, and right now it's pointing at one word: steady.

If you're refreshing your rotation this month, pick the rising song whose theme your congregation most needs to hear — and give it three weeks, not one, to land.`,
  },
  {
    id: "art-visitor-return",
    slug: "why-first-time-visitors-dont-return",
    title: "Why 80% of First-Time Visitors Never Come Back (And What the 20% Are Doing Differently)",
    type: "Benchmark Spotlight",
    summary:
      "The first-time-visitor return rate is the most-wanted number in the church world. The churches beating the average share one unglamorous habit.",
    tags: ["benchmarks", "visitors", "retention"],
    related_slugs: ["church-attendance-benchmarks", "church-communication-ideas"],
    published_at: D("11"),
    status: "published",
    meta_description:
      "Most first-time church visitors never return. Here's the benchmark, and the follow-up habit that separates the churches that keep them.",
    body: `Across reporting churches, the first-time-visitor return rate hovers between 15 and 20 percent. Put plainly: four out of five people who walk in on a Sunday never come back.

## It's not the service. It's the silence.

When you dig into what separates the churches at the top of that range from the ones at the bottom, the difference isn't production quality, sermon length, or coffee. It's follow-up speed.

Churches that contact a first-time guest within 48 hours see return rates roughly double those that wait a week or send nothing at all. The window is short and it closes fast.

## What the 20% do

Three habits show up again and again among churches beating the average. They capture contact info without making it weird — usually a simple text-to-connect number on screen. They send a real, personal message, not a templated blast. And they offer one clear, low-pressure next step rather than five competing ones.

None of it is expensive. All of it is consistent.

## The follow-up gap

The hard part isn't knowing this — it's doing it every single week without it falling through the cracks. The churches that win here have a system, not a hero. Tools like preachly.io help smaller teams keep that follow-up loop running without adding a full-time role to do it.

The takeaway is almost too simple: decide who sends the message, decide when, and never skip a week. The 20% aren't doing something remarkable. They're just doing the unremarkable thing reliably.`,
  },
  {
    id: "art-series-formula",
    slug: "sermon-series-formula-working-now",
    title: "The Sermon Series Formula That's Working Right Now",
    type: "Trend Report",
    summary:
      "The series titles gaining traction this quarter share a structure — short, concrete, and built for people who show up halfway through.",
    tags: ["sermons", "series", "planning"],
    related_slugs: ["trending-sermon-topics", "summer-sermon-series-ideas"],
    published_at: D("10"),
    status: "published",
    meta_description:
      "A trend report on the sermon series structure working in churches right now — built for summer's fluctuating attendance.",
    body: `Scan the series titles trending across the top 100 churches this month and a formula emerges. The ones gaining traction are short — three to five weeks — and built around a single concrete noun: Rest. Questions. Home. Anchor.

## Why short is winning

Summer attendance fluctuates. Families travel, routines loosen, and a ten-week expository march through a single book leaves travelers lost when they return. The series getting shared right now are designed so each week stands on its own.

That's the quiet genius of the trend: a guest can walk into week three and not feel like they missed a prerequisite.

## The naming shift

Titles are getting more concrete and less clever. "Unshakeable" is being replaced by "Rest." Abstract wordplay is giving way to plain nouns people can hold. The data suggests the room responds better to a word it can feel than a phrase it has to decode.

## What to do with this

If you're planning your next series, try the constraint: name it in one word, cap it at four weeks, and make each week survive on its own. You'll lose a little narrative arc. You'll gain a lot of accessibility — which, in a season of empty-then-full pews, is the trade worth making.`,
  },
  {
    id: "art-shortform-video",
    slug: "short-form-video-midweek-engagement",
    title: "How Churches Are Using Short-Form Video to Grow Midweek Engagement",
    type: "Tool & Tactic",
    summary:
      "The churches keeping people connected between Sundays aren't producing more — they're repurposing what they already preached.",
    tags: ["comms", "video", "engagement"],
    related_slugs: ["church-communication-ideas", "church-reels-that-performed"],
    published_at: D("9"),
    status: "published",
    meta_description:
      "How churches use short-form video to grow midweek engagement — a practical tactic built on repurposing Sunday's sermon.",
    body: `The midweek dip is real. Engagement craters Tuesday through Thursday for most churches, then claws back Saturday night. The teams flattening that curve aren't making more content. They're cutting up what they already have.

## The repurpose loop

One sermon contains four or five 30-second moments — a sharp line, a story, a single idea. Clipping those and posting one midweek keeps the message in front of people on the days they're most likely to drift.

Reels and Shorts built from existing sermon footage consistently outperform purpose-shot content for churches. It already sounds like your church because it is your church.

## What's actually working

The best-performing clips share three traits: they open on a hook in the first two seconds, they carry captions for the 80% who watch on mute, and they end with a thought rather than a hard ask.

## The bottleneck

The constraint is almost never ideas — it's the workflow of getting a clip out of Sunday and onto a feed by Wednesday. Tools like preachly.io help churches pull those moments straight from the service order so the midweek clip ships without a late-night editing session.

Start with one clip a week. Pick the line people quoted on the way out. Post it Wednesday. Watch the dip get shallower.`,
  },
  {
    id: "art-fall-checklist",
    slug: "fall-series-checklist-data",
    title: "Your Fall Series Checklist: What the Data Says You Should Plan For",
    type: "Seasonal Prep",
    summary:
      "Fall is the church's second New Year. Here's what the seasonal data says to lock in before August sneaks up on you.",
    tags: ["seasonal", "planning", "sermons"],
    related_slugs: ["fathers-day-ministry-ideas", "summer-sermon-series-ideas"],
    published_at: D("8"),
    status: "published",
    meta_description:
      "A data-backed fall series checklist for churches — what to plan now before the back-to-school attendance surge.",
    body: `Fall is the church's second New Year. Attendance climbs as families snap back into routine, and the on-ramp you build in August determines how much of that surge sticks.

## What the seasonal data says

Year over year, the back-to-school weeks show the largest attendance jump of any non-Easter season. Churches that launch a fresh series in the first two weeks of September consistently capture more of that returning crowd than those that ease in.

## The checklist

Lock your fall series title and artwork by early August — the comms runway matters more than the sermon outline at this stage. Plan a clear next step for new families, because September is when they're most willing to take one. And pre-build your first three weeks of graphics so launch week isn't a scramble.

## One thing not to skip

The data is blunt here: churches that promote the fall series *before* the summer ends outperform those that wait until it starts. The returning crowd decides where they're going before they walk back through the doors.

Plan the on-ramp now. Future-you, staring down a packed September, will be grateful.`,
  },
  {
    id: "art-community-spotlight",
    slug: "small-church-big-instagram",
    title: "How One 300-Person Church Out-Reached Churches 10x Its Size on Instagram",
    type: "Community Spotlight",
    summary:
      "A small Midwest church quietly outperformed megachurches on engagement this month. Their secret wasn't budget — it was a face.",
    tags: ["comms", "community", "social"],
    related_slugs: ["whats-working-on-instagram", "church-communication-ideas"],
    published_at: D("8"),
    status: "published",
    meta_description:
      "A community spotlight on a 300-person church outperforming megachurches on Instagram — and the simple habit behind it.",
    body: `This month, a 300-person church in the Midwest posted engagement numbers that beat congregations ten times its size. No ad budget. No production team. One volunteer with a phone.

## The unglamorous secret

Their feed isn't polished. It's a person — usually the same young leader — talking to the camera like she's talking to a friend. Announcements, a verse, a behind-the-scenes look at setup. The comments read like a group text, not a broadcast.

Big accounts often optimize for reach and lose the room in the process. This church optimized for familiarity, and reach followed.

## Why it travels

People don't engage with logos. They engage with faces they recognize. A consistent on-camera presence — even an imperfect one — builds the kind of parasocial warmth that a flawless graphic never will.

## The lesson for everyone else

You don't need a studio. You need a face and a rhythm. Pick one person, let them be a little unpolished, and show up on the same days every week.

The churches winning small are reminding the rest of us that connection scales better than production.`,
  },
];

// ------------------------------------------------------------- Social wall

export const SAMPLE_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "soc-1",
    platform: "instagram",
    account_handle: "elevation_worship",
    account_name: "Elevation Worship",
    post_url: "https://instagram.com/elevation_worship",
    caption_excerpt: "New live take of \"Praise\" — full congregation, one mic moment that wrecked us.",
    likes: 48200,
    comments: 1340,
    captured_at: D("11"),
  },
  {
    id: "soc-2",
    platform: "youtube",
    account_handle: "life.church",
    account_name: "Life.Church",
    post_url: "https://youtube.com/@lifechurch",
    caption_excerpt: "This weekend's message on rest crossed 200k views in 48 hours.",
    likes: 12800,
    comments: 540,
    captured_at: D("11"),
  },
  {
    id: "soc-3",
    platform: "tiktok",
    account_handle: "churchgraphics",
    account_name: "Church Graphics",
    post_url: "https://tiktok.com/@churchgraphics",
    caption_excerpt: "POV: the sermon series title slide that took 4 hours and 1 prayer.",
    likes: 31500,
    comments: 890,
    captured_at: D("10"),
  },
  {
    id: "soc-4",
    platform: "instagram",
    account_handle: "passioncity",
    account_name: "Passion City Church",
    post_url: "https://instagram.com/passioncity",
    caption_excerpt: "Baptism Sunday. 87 people. We're still not over it.",
    likes: 22400,
    comments: 760,
    captured_at: D("10"),
  },
  {
    id: "soc-5",
    platform: "twitter",
    account_handle: "careynieuwhof",
    account_name: "Carey Nieuwhof",
    post_url: "https://twitter.com/careynieuwhof",
    caption_excerpt: "The churches growing right now aren't louder. They're more consistent. Thread →",
    likes: 5400,
    comments: 210,
    captured_at: D("9"),
  },
  {
    id: "soc-6",
    platform: "instagram",
    account_handle: "bethelmusic",
    account_name: "Bethel Music",
    post_url: "https://instagram.com/bethelmusic",
    caption_excerpt: "Acoustic \"Goodness of God\" from soundcheck. Sometimes the rehearsal is the worship.",
    likes: 39800,
    comments: 1020,
    captured_at: D("9"),
  },
  {
    id: "soc-7",
    platform: "tiktok",
    account_handle: "transformchurch",
    account_name: "Transformation Church",
    post_url: "https://tiktok.com/@transformchurch",
    caption_excerpt: "Pastor Mike answering the question every 20-something is actually asking.",
    likes: 64100,
    comments: 2300,
    captured_at: D("8"),
  },
  {
    id: "soc-8",
    platform: "youtube",
    account_handle: "thechosen",
    account_name: "The Chosen",
    post_url: "https://youtube.com/@thechosen",
    caption_excerpt: "Behind the scenes of the scene everyone's been quoting this week.",
    likes: 18700,
    comments: 980,
    captured_at: D("8"),
  },
  {
    id: "soc-9",
    platform: "instagram",
    account_handle: "churchome",
    account_name: "Churchome",
    post_url: "https://instagram.com/churchome",
    caption_excerpt: "Midweek prayer, livestreamed from a living room. 4,000 of you showed up.",
    likes: 15200,
    comments: 430,
    captured_at: D("8"),
  },
  {
    id: "soc-spotlight",
    platform: "instagram",
    account_handle: "anewchurch.co",
    account_name: "A New Church",
    post_url: "https://instagram.com/anewchurch.co",
    caption_excerpt:
      "A 300-person church in Ohio quietly out-engaging accounts 10x its size — one volunteer, one phone, zero ad budget. The most human feed in the church space right now.",
    likes: 9100,
    comments: 620,
    captured_at: D("11"),
    is_spotlight: true,
  },
];

// ------------------------------------------------------------- Best reads

export const SAMPLE_READS: ExternalRead[] = [
  {
    id: "read-1",
    source: "Carey Nieuwhof",
    title: "5 Disruptive Church Trends That Will Define the Next Decade",
    url: "https://careynieuwhof.com",
    summary:
      "A clear-eyed look at the shifts already reshaping how churches gather, give, and communicate. Worth the read for any leader planning past next quarter.",
    relevance_score: 0.94,
    featured: true,
    published_at: D("11"),
  },
  {
    id: "read-2",
    source: "Barna Research",
    title: "What Gen Z Actually Wants From a Church",
    url: "https://barna.com",
    summary:
      "New survey data on the spiritual openness of younger Americans — and the gap between what they're seeking and what they're finding. The numbers complicate the easy narratives.",
    relevance_score: 0.91,
    featured: false,
    published_at: D("10"),
  },
  {
    id: "read-3",
    source: "ChurchLeaders",
    title: "The Volunteer Recruitment Strategy That Doubled One Church's Team",
    url: "https://churchleaders.com",
    summary:
      "A practical case study on moving people from attender to owner. The shift was less about asking more and more about asking better.",
    relevance_score: 0.88,
    featured: false,
    published_at: D("10"),
  },
  {
    id: "read-4",
    source: "LifeWay Research",
    title: "Most Churchgoers Say They'd Invite a Friend — Few Actually Do",
    url: "https://lifewayresearch.com",
    summary:
      "The invitation gap, quantified. LifeWay's latest digs into why the willingness rarely becomes the ask, and what closes the distance.",
    relevance_score: 0.86,
    featured: false,
    published_at: D("9"),
  },
  {
    id: "read-5",
    source: "ChurchTechToday",
    title: "A Simple Framework for Auditing Your Church's Digital Front Door",
    url: "https://churchtechtoday.com",
    summary:
      "Before a guest visits, they visit your website. This walkthrough scores the five things first-timers check — and most churches miss two of them.",
    relevance_score: 0.83,
    featured: false,
    published_at: D("9"),
  },
  {
    id: "read-6",
    source: "Outreach Magazine",
    title: "Why Summer Doesn't Have to Mean a Giving Slump",
    url: "https://outreachmagazine.com",
    summary:
      "Practical, non-gimmicky ways churches are steadying generosity through the travel months. Recurring giving does most of the heavy lifting.",
    relevance_score: 0.81,
    featured: false,
    published_at: D("8"),
  },
];

// -------------------------------------------------------- Benchmark of week

export const SAMPLE_BENCHMARKS: BenchmarkStat[] = [
  {
    slug: "first-time-visitor-return-rate",
    label: "First-time visitor return rate",
    stat: "15–20%",
    context:
      "The church-world average. The churches beating it almost all share one habit — a personal follow-up within 48 hours.",
    source: "FACT Survey + reporting-church averages",
    href: "/benchmarks/first-time-visitor-return-rate",
  },
  {
    slug: "church-email-open-rate",
    label: "Average church email open rate",
    stat: "28–34%",
    context: "Well above the ~21% general nonprofit average — congregations actually open what their church sends.",
    source: "Mailchimp nonprofit + church comms benchmarks",
    href: "/benchmarks/email-open-rates",
  },
];

export function pickBenchmarkOfWeek(): BenchmarkStat {
  return SAMPLE_BENCHMARKS[0];
}
