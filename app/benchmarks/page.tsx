import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BenchmarkCard from "@/components/BenchmarkCard";
import PreachlyCTA from "@/components/PreachlyCtA";
import { getBenchmarkPages } from "@/lib/sampleBenchmarks";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ministry Benchmarks",
  description:
    "The numbers church leaders actually want — attendance, online giving, email open rates, social engagement, app usage, volunteer retention, and first-time visitor return rate, with breakdowns by church size.",
};

export default async function BenchmarksPage() {
  const benchmarks = getBenchmarkPages();

  return (
    <>
      <SiteHeader />
      <main>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          <section style={{ padding: "52px 0 36px", borderBottom: "2px solid #1A1A18" }}>
            <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 32, height: 1, background: "#8A8578" }} />
              Ministry benchmarks
            </p>
            <h1 className="font-type hero-h1" style={{ fontSize: 52, lineHeight: 1.05, color: "#1A1A18", marginBottom: 16, maxWidth: 760 }}>
              How does your church compare?
            </h1>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#5A5850", lineHeight: 1.7, maxWidth: 580 }}>
              Real numbers from published research — attendance, giving, email, social, apps, volunteers, and visitor return — each with a breakdown by church size. Context for reading your own numbers, not a scoreboard.
            </p>
          </section>

          <div
            className="trends-3"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18", marginTop: 24 }}
          >
            {benchmarks.map((b) => (
              <BenchmarkCard key={b.slug} benchmark={b} />
            ))}
          </div>

          <PreachlyCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
