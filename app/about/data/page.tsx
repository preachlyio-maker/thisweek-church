import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Our Data",
  description:
    "How thisweek.church sources its church data and ministry benchmarks — aggregated from churches using preachly.io plus published research from CCLI, YouVersion, Pushpay, Barna, and more. Methodology and sources.",
};

const H3: React.CSSProperties = { fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", margin: "40px 0 16px" };
const P: React.CSSProperties = { fontSize: "1.02rem", fontWeight: 300, lineHeight: 1.85, color: "var(--ink)", margin: "0 0 18px" };
const LI: React.CSSProperties = { fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--ink)", display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--rule)" };

export default function AboutDataPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <nav className="font-mono" style={{ marginBottom: 28, fontSize: "0.72rem", color: "var(--muted)" }}>
          <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <a href="/about" style={{ color: "var(--muted)", textDecoration: "none" }}>About</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <span style={{ color: "var(--ink)" }}>Our Data</span>
        </nav>

        <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", marginBottom: 18 }}>
          Methodology &amp; sources
        </p>
        <h1 className="font-type" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", lineHeight: 1.1, color: "var(--ink)", marginBottom: 32 }}>
          About Our Data
        </h1>

        <section className="speakable">
          <p style={P}>
            thisweek.church publishes weekly church data aggregated from two primary sources: churches actively using
            preachly.io for ministry communication and service planning, and publicly available research from
            organizations including CCLI, YouVersion, Pushpay, Barna Research, Generosity by Design, and Nonprofits Source.
          </p>
          <p style={P}>
            The preachly.io church network spans thousands of congregations across America of all sizes and denominations.
            When these churches plan services, track attendance, manage giving communications, and distribute sermon
            content through preachly.io, the aggregate patterns surface here — anonymized, normalized, and published every
            Monday.
          </p>
          <p style={P}>
            This gives thisweek.church something most church data sources lack: current, operational data from churches in
            active ministry, not just annual survey responses.
          </p>
        </section>

        <h2 className="font-mono" style={H3}>What we publish</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {[
            ["Worship song trends", "sourced from CCLI, Spotify, and preachly.io service-planning data"],
            ["Sermon topics", "aggregated from preachly.io service orders and RSS feeds from the 100 largest churches in America"],
            ["Giving benchmarks", "sourced from Pushpay annual reports, Generosity by Design, and preachly.io-connected church data"],
            ["Attendance trends", "sourced from FACT surveys, Barna Research, and preachly.io reporting churches"],
            ["Digital engagement", "sourced from preachly.io platform data, Mailchimp nonprofit benchmarks, and Church Communications Group research"],
          ].map(([label, detail]) => (
            <li key={label} style={LI}>
              <span style={{ color: "var(--accent)" }}>—</span>
              <span><strong style={{ fontWeight: 500 }}>{label}:</strong> {detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-mono" style={H3}>Our commitment</h2>
        <p style={P}>
          Every benchmark includes its source. Every range reflects real variance across church sizes. Every page shows
          when it was last updated. We don&apos;t publish data we can&apos;t back up.
        </p>
        <p style={P}>
          thisweek.church is maintained by the team at preachly.io — built because we kept seeing the same questions asked
          in every church comms Facebook group, and thought the answers deserved a permanent home.
        </p>

        <div style={{ marginTop: 36, paddingTop: 24, borderTop: "2px solid var(--ink)", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/benchmarks" className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none" }}>
            See the benchmarks →
          </a>
          <a href="https://preachly.io" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none" }}>
            preachly.io →
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
