import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PreachlyCTA from "@/components/PreachlyCtA";
import CategoryGrid from "@/components/CategoryGrid";
import VideoGallery from "@/components/VideoGallery";
import BestReads from "@/components/BestReads";
import { getLatestTrends } from "@/lib/trends";
import { getSocialPosts, getReads } from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const [trends, social, reads] = await Promise.all([
    getLatestTrends(),
    getSocialPosts(),
    getReads(5),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          {/* Hero */}
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

          {/* Browse by area — the organizing hub */}
          <CategoryGrid trends={trends} />

          {/* Video & Streaming */}
          <VideoGallery videos={social.videos} />

          {/* This Week's Best Reads */}
          <BestReads reads={reads} />

          {/* Where this data comes from — provenance */}
          <section style={{ borderTop: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: "32px 0", margin: "44px 0 0" }}>
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

          <PreachlyCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
