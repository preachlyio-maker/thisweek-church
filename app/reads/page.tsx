import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BestReads from "@/components/BestReads";
import PreachlyCTA from "@/components/PreachlyCtA";
import { getReads } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Church Reads",
  description:
    "The best church content published elsewhere this week — worship, communication, leadership, and giving, curated and linked out. A weekly high-five to other writers.",
};

export default async function ReadsPage() {
  const reads = await getReads(12);

  return (
    <>
      <SiteHeader />
      <main>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          <section style={{ padding: "52px 0 36px", borderBottom: "2px solid #1A1A18" }}>
            <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 32, height: 1, background: "#8A8578" }} />
              Best of the web
            </p>
            <h1 className="font-type hero-h1" style={{ fontSize: 52, lineHeight: 1.05, color: "#1A1A18", marginBottom: 16, maxWidth: 760 }}>
              The best church writing this week
            </h1>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#5A5850", lineHeight: 1.7, maxWidth: 560 }}>
              We read widely so you don't have to. Each week we surface the sharpest church content published elsewhere — and send you straight to the source.
            </p>
          </section>

          <BestReads reads={reads} />

          <PreachlyCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
