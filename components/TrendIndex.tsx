import Link from "next/link";
import TrendCard from "@/components/TrendCard";
import PreachlyCTA from "@/components/PreachlyCtA";
import { TrendPage } from "@/lib/types";

type Filter = { href: string; label: string; active?: boolean };

/**
 * Shared listing layout for the /trends, /seasonal and /benchmarks pages.
 * Keeps the editorial grid + framing consistent across every index route.
 */
export default function TrendIndex({
  eyebrow,
  title,
  intro,
  trends,
  filters,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  trends: TrendPage[];
  filters?: Filter[];
}) {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
      {/* Page header */}
      <section style={{ padding: "52px 0 36px", borderBottom: "2px solid #0A0A0A" }}>
        <p
          className="font-mono"
          style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A5E14", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}
        >
          <span style={{ display: "block", width: 32, height: 1, background: "#7A5E14" }} />
          {eyebrow}
        </p>
        <h1 className="font-type hero-h1" style={{ fontSize: 52, lineHeight: 1.05, color: "#0A0A0A", marginBottom: 16, maxWidth: 760 }}>
          {title}
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, color: "#3A2E18", lineHeight: 1.7, maxWidth: 560 }}>{intro}</p>
      </section>

      {/* Filters */}
      {filters && filters.length > 0 && (
        <div style={{ padding: "22px 0 4px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              className="font-mono cat-pill"
              style={{
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "1px solid #0A0A0A",
                padding: "6px 14px",
                textDecoration: "none",
                background: active ? "#0A0A0A" : "transparent",
                color: active ? "#FEF3D5" : "#0A0A0A",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      {trends.length === 0 ? (
        <div style={{ border: "2px solid #0A0A0A", padding: "72px 40px", textAlign: "center", marginTop: 24 }}>
          <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#7A5E14", textTransform: "uppercase" }}>
            No entries in this category yet — check back Monday
          </p>
        </div>
      ) : (
        <div
          className="trends-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #0A0A0A", borderLeft: "2px solid #0A0A0A", marginTop: 24 }}
        >
          {trends.map((trend, i) => (
            <TrendCard key={trend.id} trend={trend} index={i} />
          ))}
        </div>
      )}

      <PreachlyCTA />
    </div>
  );
}
