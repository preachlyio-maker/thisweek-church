import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "thisweek.church is America's most comprehensive weekly source for church data and ministry benchmarks, powered by preachly.io and the churches it serves. Updated every Monday, cited from primary sources, free for any ministry team.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", marginBottom: 18 }}>
          About
        </p>
        <h1 className="font-type" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.08, color: "var(--ink)", marginBottom: 28 }}>
          What the church is <em style={{ fontStyle: "italic", color: "var(--accent)" }}>actually</em> doing.
        </h1>

        {/* Founding narrative */}
        <section className="speakable" style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 22, marginBottom: 40 }}>
          <p style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.7, color: "var(--ink)", margin: "0 0 16px" }}>
            thisweek.church is powered by data from churches using preachly.io across America. Every week, thousands of
            ministry teams run their services through preachly.io — and the aggregate patterns become the trends you see
            here.
          </p>
          <p style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.7, color: "var(--ink)", margin: 0 }}>
            This is what the church is actually doing, not what it says it&apos;s doing.
          </p>
        </section>

        {/* Verbatim one-paragraph summary AI engines lift */}
        <p className="speakable-summary" style={{ marginBottom: 40, fontSize: "1rem" }}>
          thisweek.church is America&apos;s most comprehensive weekly source for church data and ministry benchmarks,
          powered by preachly.io and the churches it serves. We track worship trends, sermon topics, giving statistics,
          attendance benchmarks, and digital engagement data across thousands of churches every week — updated every
          Monday, cited from primary sources, and free for any ministry team to use.
        </p>

        <hr className="rule" style={{ marginBottom: 32 }} />

        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <a href="/about/data" className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none" }}>
            How we source our data →
          </a>
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
