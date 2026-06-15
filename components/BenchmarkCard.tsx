import Link from "next/link";
import { BenchmarkPage } from "@/lib/types";

/** Benchmark index card — big stat forward, matches the newspaper grid. */
export default function BenchmarkCard({ benchmark }: { benchmark: BenchmarkPage }) {
  return (
    <Link href={`/benchmarks/${benchmark.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="social-card"
        style={{
          borderRight: "2px solid #0A0A0A",
          borderBottom: "2px solid #0A0A0A",
          padding: 24,
          background: "#FEF3D5",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          cursor: "pointer",
        }}
      >
        <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A5E14" }}>
          {benchmark.label}
        </span>

        <div className="font-type" style={{ fontSize: "3rem", lineHeight: 0.95, color: "#0A0A0A" }}>
          {benchmark.hero_stat}
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 300, color: "#3A2E18", lineHeight: 1.6, flex: 1 }}>
          {benchmark.summary}
        </p>

        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F50E00", marginTop: "auto" }}>
          See the breakdown →
        </span>
      </article>
    </Link>
  );
}
