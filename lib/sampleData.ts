import { TrendPage } from "./types";

/**
 * Curated preview data shown when the Supabase `trends` table is empty
 * (e.g. before the Monday pipeline has run, or in local dev without keys).
 *
 * The moment real published rows exist, the live data takes over — this is a
 * fallback only, so the site never renders as an empty shell. Content is
 * illustrative and representative of what the pipeline produces.
 */

// Most recent Monday relative to the build — keeps "Updated …" feeling fresh.
const UPDATED = "2026-06-08T09:00:00.000Z";

export const SAMPLE_TRENDS: TrendPage[] = [
  {
    id: "sample-worship-top",
    slug: "top-worship-songs",
    category: "worship",
    title: "Top 10 Worship Songs Churches Are Singing",
    subtitle: "The most-scheduled congregational songs across reporting churches this week.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "The top worship songs churches are singing this week, ranked by how often they appear in Sunday service plans.",
    data: [
      { rank: 1, label: "Gratitude — Brandon Lake", value: "1", note: "5 weeks at #1" },
      { rank: 2, label: "Praise — Elevation Worship", value: "2", delta: "up" },
      { rank: 3, label: "Holy Forever — Chris Tomlin", value: "3", delta: "down" },
      { rank: 4, label: "Firm Foundation (He Won't) — Cody Carnes", value: "4", delta: "up" },
      { rank: 5, label: "Goodness of God — Bethel Music", value: "5" },
      { rank: 6, label: "I Thank God — Maverick City", value: "6", delta: "up" },
      { rank: 7, label: "King of Kings — Hillsong Worship", value: "7", delta: "down" },
      { rank: 8, label: "Same God — Elevation Worship", value: "8" },
      { rank: 9, label: "Build My Life — Pat Barrett", value: "9", delta: "new" },
      { rank: 10, label: "Living Hope — Phil Wickham", value: "10", delta: "down" },
    ],
    summary:
      "Brandon Lake's \"Gratitude\" holds the top spot for a fifth straight week, while \"Praise\" continues to climb as more churches add it to their summer set lists.\n\nFor worship planners: the songs rising fastest this month share a common trait — singable, anthemic choruses with a clear congregational hook. If your team is refreshing its rotation, pair one rising title with one familiar anchor to keep the congregation engaged without overloading them with new material.",
    sources: [
      { label: "CCLI Top 100", url: "https://us.ccli.com/top-100" },
      { label: "PraiseCharts trending" },
    ],
    related_slugs: ["rising-worship-songs", "trending-sermon-topics"],
  },
  {
    id: "sample-sermon-topics",
    slug: "trending-sermon-topics",
    category: "sermon",
    title: "Trending Sermon Topics This Week",
    subtitle: "Themes pastors are preaching as summer begins.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "The sermon topics and themes trending in churches this week, from anxiety and rest to identity and discipleship.",
    data: [
      { rank: 1, label: "Rest & Sabbath", value: "+18%", delta: "up", note: "Summer slowdown driver" },
      { rank: 2, label: "Anxiety & Peace", value: "+12%", delta: "up" },
      { rank: 3, label: "Identity in Christ", value: "—", delta: "new" },
      { rank: 4, label: "Fatherhood & Family", value: "+9%", delta: "up", note: "Father's Day season" },
      { rank: 5, label: "Generosity & Stewardship", value: "stable" },
      { rank: 6, label: "Prayer", value: "stable" },
      { rank: 7, label: "Spiritual Disciplines", value: "-4%", delta: "down" },
    ],
    summary:
      "As the calendar turns to summer, messages on rest, Sabbath, and managing anxiety are spiking — a familiar seasonal pattern as families travel and routines loosen.\n\nFor teaching pastors: \"Identity in Christ\" is emerging as a fresh series candidate this month. It pairs naturally with a summer slowdown, giving congregations a steady anchor when attendance ebbs and flows.",
    sources: [{ label: "Sermon search trends" }, { label: "Preachly topic index" }],
    related_slugs: ["summer-sermon-series-ideas", "most-referenced-scripture"],
  },
  {
    id: "sample-scripture",
    slug: "most-referenced-scripture",
    category: "scripture",
    title: "Most-Referenced Scripture This Week",
    subtitle: "The passages showing up most often in sermons and service plans.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "The Bible passages churches are preaching and referencing most this week, ranked by frequency.",
    data: [
      { rank: 1, label: "Matthew 11:28–30", value: "Come to me…", delta: "up" },
      { rank: 2, label: "Philippians 4:6–7", value: "Do not be anxious", delta: "up" },
      { rank: 3, label: "Psalm 23", value: "The Lord is my shepherd" },
      { rank: 4, label: "Proverbs 3:5–6", value: "Trust in the Lord", delta: "down" },
      { rank: 5, label: "Romans 8:28", value: "All things work together", delta: "new" },
      { rank: 6, label: "Joshua 1:9", value: "Be strong and courageous" },
      { rank: 7, label: "Jeremiah 29:11", value: "Plans to prosper you" },
    ],
    summary:
      "Matthew 11:28–30 leads the list, mirroring this week's surge in rest-and-Sabbath messaging. Philippians 4:6–7 follows closely as anxiety-and-peace themes climb.\n\nFor communicators: these are the verses most likely to resonate in your graphics, social posts, and bulletin this week — meeting people where the broader church is already focused.",
    sources: [{ label: "YouVersion popular verses" }, { label: "Bible Gateway trends" }],
    related_slugs: ["trending-sermon-topics", "church-communication-ideas"],
  },
  {
    id: "sample-rising-worship",
    slug: "rising-worship-songs",
    category: "worship",
    title: "Fastest-Rising Worship Songs",
    subtitle: "New and climbing titles worth adding to your rotation.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "The fastest-rising worship songs this week — newer titles gaining traction in church set lists.",
    data: [
      { rank: 1, label: "That's the Power — Brandon Lake", value: "+41%", delta: "up" },
      { rank: 2, label: "Hard Fought Hallelujah — Brandon Lake", value: "+33%", delta: "new" },
      { rank: 3, label: "Holy Ground — Passion", value: "+27%", delta: "up" },
      { rank: 4, label: "Be Still — Hillsong", value: "+19%", delta: "new" },
      { rank: 5, label: "I Speak Jesus — Charity Gayle", value: "+14%", delta: "up" },
    ],
    summary:
      "Brandon Lake dominates the rising chart again this week, with two titles gaining fast. \"Holy Ground\" from Passion is the strongest non-Lake mover.\n\nFor worship leaders: rising songs are easiest to introduce when attendance is steady. Teach one now, before the summer dip, so it's familiar by the time fall programming ramps back up.",
    sources: [{ label: "PraiseCharts new releases" }],
    related_slugs: ["top-worship-songs"],
  },
  {
    id: "sample-comms",
    slug: "church-communication-ideas",
    category: "comms",
    title: "Church Communication Ideas That Are Working",
    subtitle: "What's driving opens, clicks, and follow-through right now.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "Church communication and outreach ideas that are working this week, from text reminders to summer invite cards.",
    data: [
      { rank: 1, label: "Sunday-morning text reminders", value: "Top open rate", delta: "up" },
      { rank: 2, label: "Short-form sermon clips (Reels/Shorts)", value: "Rising", delta: "up" },
      { rank: 3, label: "\"Bring a friend\" summer invite cards", value: "Seasonal", delta: "new" },
      { rank: 4, label: "QR codes for giving & connect cards", value: "Stable" },
      { rank: 5, label: "Weekly email digest (one CTA)", value: "Stable" },
    ],
    summary:
      "Same-day text reminders continue to outperform every other channel for service attendance, especially through the summer when routines slip.\n\nFor comms teams: keep each message to a single, clear call to action. The churches seeing the best follow-through this week are sending fewer, sharper messages rather than longer newsletters.",
    sources: [{ label: "Church comms benchmarks" }],
    related_slugs: ["most-referenced-scripture", "online-giving-benchmarks"],
  },
  {
    id: "sample-benchmark-attendance",
    slug: "church-attendance-benchmarks",
    category: "benchmark",
    title: "Church Attendance & Engagement Benchmarks",
    subtitle: "Typical ranges reporting churches are seeing this season.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "Current church attendance and engagement benchmarks — typical ranges for in-person, online, and first-time guests.",
    data: [
      { rank: 1, label: "In-person vs. pre-summer baseline", value: "-6%", delta: "down", note: "Seasonal travel dip" },
      { rank: 2, label: "Online / livestream share", value: "22%", delta: "up" },
      { rank: 3, label: "First-time guests per week", value: "1.8% of attendance" },
      { rank: 4, label: "Guest-to-return rate", value: "31%" },
      { rank: 5, label: "Volunteer participation", value: "42% of regulars" },
    ],
    summary:
      "Early-summer attendance is softening as expected, with the slack picked up partly by livestream viewing — now averaging just over a fifth of total reach.\n\nFor church leaders: a 6% in-person dip in June is normal, not a crisis. Watch your guest-to-return rate instead; it's the metric that best predicts fall growth, and it holds steady through the summer at well-organized churches.",
    sources: [{ label: "Reporting church averages" }],
    related_slugs: ["online-giving-benchmarks", "church-communication-ideas"],
  },
  {
    id: "sample-benchmark-giving",
    slug: "online-giving-benchmarks",
    category: "benchmark",
    title: "Online Giving Benchmarks",
    subtitle: "How digital giving is trending across reporting churches.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "Online giving benchmarks for churches — digital share of giving, recurring gift adoption, and average gift size.",
    data: [
      { rank: 1, label: "Digital share of total giving", value: "63%", delta: "up" },
      { rank: 2, label: "Recurring / scheduled gifts", value: "38%", delta: "up" },
      { rank: 3, label: "Text-to-give adoption", value: "17%", delta: "new" },
      { rank: 4, label: "Average one-time online gift", value: "$112" },
      { rank: 5, label: "Summer giving vs. spring", value: "-8%", delta: "down" },
    ],
    summary:
      "Digital giving keeps climbing as a share of the total, and recurring gifts — the most reliable predictor of summer stability — are up again this week.\n\nFor finance teams: churches that prompt recurring giving directly (a single line in the bulletin or a QR code on screen) weather the summer dip noticeably better than those relying on one-time gifts.",
    sources: [{ label: "Digital giving platform averages" }],
    related_slugs: ["church-attendance-benchmarks"],
  },
  {
    id: "sample-summer-series",
    slug: "summer-sermon-series-ideas",
    category: "sermon",
    title: "Summer Sermon Series Ideas",
    subtitle: "Flexible, drop-in-friendly series for the months people travel.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "Summer sermon series ideas built for fluctuating attendance — standalone-friendly themes guests can join any week.",
    data: [
      { rank: 1, label: "\"Rest\" — a study of Sabbath", value: "Most planned", delta: "up" },
      { rank: 2, label: "Psalms of Summer", value: "Rising", delta: "up" },
      { rank: 3, label: "Questions God Asks", value: "New", delta: "new" },
      { rank: 4, label: "The Parables (standalone weeks)", value: "Evergreen" },
      { rank: 5, label: "Fruit of the Spirit", value: "Evergreen" },
    ],
    summary:
      "The strongest summer series share one design principle: each week stands on its own, so travelers and first-time guests are never lost walking in mid-series.\n\nFor teaching teams: a Sabbath or Psalms series fits the season's mood and lets you pre-plan well ahead, freeing your calendar during the busiest travel weeks.",
    sources: [{ label: "Preachly series planner" }],
    related_slugs: ["trending-sermon-topics", "fathers-day-ministry-ideas"],
  },
  {
    id: "sample-fathers-day",
    slug: "fathers-day-ministry-ideas",
    category: "seasonal",
    title: "Father's Day Ministry Ideas (2026)",
    subtitle: "Ideas churches are using for the weekend of June 21.",
    updated_at: UPDATED,
    status: "published",
    meta_description:
      "Father's Day 2026 ministry ideas for churches — service elements, outreach, and sensitive-pastoring tips for June 21.",
    data: [
      { rank: 1, label: "Blessing / prayer over dads & father figures", value: "Most used", delta: "up" },
      { rank: 2, label: "Men's ministry next-step invite", value: "Rising", delta: "up" },
      { rank: 3, label: "Testimony from a dad in the church", value: "High impact", delta: "new" },
      { rank: 4, label: "Acknowledge the hurting (a pastoral note)", value: "Recommended" },
      { rank: 5, label: "Practical resource giveaway (book/devotional)", value: "Popular" },
    ],
    summary:
      "Father's Day lands on June 21 this year. The most-used service element remains a corporate blessing over dads and father figures — broadened intentionally to include men who mentor and stand in the gap.\n\nFor pastors: a brief, sensitive acknowledgment of those for whom the day is painful — estranged relationships, loss, or longing for children — consistently lands as the most appreciated moment of the service. Plan that line in advance rather than improvising it.",
    sources: [{ label: "Seasonal ministry planner" }],
    related_slugs: ["summer-sermon-series-ideas", "trending-sermon-topics"],
  },
];
