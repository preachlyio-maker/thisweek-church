import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendCard from "@/components/TrendCard";
import PreachlyCTA from "@/components/PreachlyCtA";
import SocialWall from "@/components/SocialWall";
import BenchmarkSpotlight from "@/components/BenchmarkSpotlight";
import BestReads from "@/components/BestReads";
import EditorialFeed from "@/components/EditorialFeed";
import { getLatestTrends } from "@/lib/trends";
import { getArticles, getSocialPosts, getReads, getBenchmarkOfWeek } from "@/lib/content";

export const revalidate = 3600;

const CAT_LINKS = [
  { href: "/trends/worship", label: "Worship Songs" },
  { href: "/trends/sermons", label: "Sermon Topics" },
  { href: "/trends/scripture", label: "Scripture" },
  { href: "/trends?category=comms", label: "Church Comms" },
  { href: "/seasonal", label: "Seasonal" },
  { href: "/benchmarks", label: "Benchmarks" },
];

export default async function HomePage() {
  const [trends, articles, social, reads, benchmark] = await Promise.all([
    getLatestTrends(),
    getArticles(2),
    getSocialPosts(),
    getReads(6),
    getBenchmarkOfWeek(),
  ]);
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          <section style={{ padding: "78px 0 44px", borderBottom: "2px solid #1A1A18" }}>
            <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#8A8578", marginBottom: 28, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={{ display: "block", width: 28, height: 1, background: "#5C7A5F" }} />
              America&apos;s Church Data Hub
              <span style={{ color: "#C8C4B8" }}>/</span>
              Updated Every Monday
            </p>
            <h1 className="font-type hero-h1" style={{ fontSize: 84, lineHeight: 0.94, letterSpacing: "-0.01em", color: "#1A1A18", marginBottom: 28, maxWidth: 960 }}>
              What the church is <em style={{ fontStyle: "italic", color: "#5C7A5F" }}>actually</em> doing.
            </h1>
            <p style={{ fontSize: 15.5, fontWeight: 300, color: "#5A5850", lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
              Worship, preaching, scripture, giving, and engagement data — compiled from primary sources and refreshed every week. The real picture of the American church, not what it says about itself.
            </p>
            <p className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578", borderTop: "1px solid #C8C4B8", paddingTop: 18 }}>
              Worship <span style={{ color: "#5C7A5F" }}>/</span> Sermons <span style={{ color: "#5C7A5F" }}>/</span> Scripture <span style={{ color: "#5C7A5F" }}>/</span> Giving <span style={{ color: "#5C7A5F" }}>/</span> Engagement <span style={{ color: "#5C7A5F" }}>/</span> Benchmarks
            </p>
          </section>

          {/* Verbatim summary — AI engines tend to lift this as the site description. */}
          <p className="speakable-summary" style={{ padding: "20px 0 4px" }}>
            thisweek.church is America&apos;s most comprehensive weekly source for church data and ministry benchmarks,
            compiled from primary sources — CCLI, YouVersion, Barna, Pushpay, and the preachly.io church network. We track
            worship trends, sermon topics, giving statistics, attendance benchmarks, and digital engagement data every
            week — updated every Monday, cited from primary sources, and free for any ministry team to use.
          </p>
        </div>

        {/* Trends grid */}
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", padding: "28px 0 20px", display: "flex", alignItems: "center", gap: 16 }}>
            This week's trends
            <span style={{ flex: 1, height: 1, background: "#C8C4B8", display: "block" }} />
          </div>

          {trends.length === 0 ? (
            <div style={{ border: "2px solid #1A1A18", padding: "80px 40px", textAlign: "center" }}>
              <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#8A8578" }}>FRESH DATA PUBLISHES EVERY MONDAY MORNING</p>
            </div>
          ) : (
            <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18" }}>
              {trends.slice(0, 3).map((trend, i) => (
                <TrendCard key={trend.id} trend={trend} index={i} />
              ))}
            </div>
          )}

          {/* Featured + side stack */}
          {trends.length > 3 && (
            <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", borderLeft: "2px solid #1A1A18" }}>
              {/* Featured card */}
              <a href={`/trends/${trends[3]?.slug}`} style={{ display: "block", textDecoration: "none", background: "#1A1A18", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: 32, position: "relative", overflow: "hidden" }}>
                <span className="font-type" style={{ fontSize: 200, color: "rgba(255,255,255,0.03)", position: "absolute", top: -30, right: -10, lineHeight: 1, pointerEvents: "none" }}>✦</span>
                <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5C7A5F", marginBottom: 14, display: "block" }}>// {trends[3]?.category}</span>
                <h3 className="font-type" style={{ fontSize: 30, lineHeight: 1.2, color: "#EDEBE4", marginBottom: 22 }}>
                  {trends[3]?.title}
                </h3>
                <ol style={{ listStyle: "none", marginBottom: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                  {trends[3]?.data.slice(0, 4).map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, borderBottom: "1px solid #2A2A28", paddingBottom: 10 }}>
                      <span className="font-mono" style={{ fontSize: 9, color: "#3A3A38", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 13, color: "#C8C4B8", fontWeight: 300 }}>{item.label}</span>
                    </li>
                  ))}
                </ol>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F" }}>Read the full breakdown →</span>
              </a>

              {/* Side stack */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {trends.slice(4, 6).map((trend, i) => (
                  <a key={trend.id} href={`/trends/${trend.slug}`} style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: 22, flex: 1, background: "#EDEBE4", position: "relative", overflow: "hidden", display: "block" }}>
                    <span className="font-type" style={{ fontSize: 80, color: "rgba(26,26,24,0.05)", position: "absolute", bottom: -10, right: 8, lineHeight: 1, pointerEvents: "none" }}>
                      {i === 0 ? "%" : "☀"}
                    </span>
                    <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578", marginBottom: 10, display: "block" }}>{trend.category}</span>
                    <div className="font-type" style={{ fontSize: 16, lineHeight: 1.3, color: "#1A1A18", marginBottom: 10 }}>{trend.title}</div>
                    <div style={{ fontSize: 12, color: "#5A5850", fontWeight: 300 }}>{trend.data[0]?.label}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Around the Church This Week — YouTube wall, trending, accounts */}
          <SocialWall videos={social.videos} posts={social.posts} accounts={social.accounts} />

          {/* Where This Data Comes From — provenance, not a pitch */}
          <section style={{ borderTop: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: "32px 0", margin: "32px 0 0" }}>
            <h2 className="font-type" style={{ fontSize: 26, lineHeight: 1.15, color: "#1A1A18", marginBottom: 14 }}>
              Where this data comes from
            </h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#5A5850", lineHeight: 1.75, maxWidth: 620, marginBottom: 18 }}>
              thisweek.church compiles data from CCLI, YouVersion, Barna, Pushpay, and the preachly.io church network —
              each an equal, cited source. Every number traces back to one of them. Everything updates Monday morning.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <a href="/about/data" className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", textDecoration: "none" }}>
                About our data →
              </a>
              <a href="https://preachly.io" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", textDecoration: "none" }}>
                preachly.io →
              </a>
            </div>
          </section>

          {/* Benchmark of the Week */}
          <BenchmarkSpotlight benchmark={benchmark} />

          {/* This Week's Best Reads */}
          <BestReads reads={reads} />

          {/* From Our Editorial Team */}
          <EditorialFeed articles={articles} />

          {/* Category pills */}
          <div style={{ padding: "32px 0 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CAT_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="font-mono cat-pill" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid #1A1A18", padding: "6px 14px", background: "transparent", color: "#1A1A18", textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>

          <PreachlyCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
