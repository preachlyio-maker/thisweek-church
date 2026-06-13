import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { BenchmarkStat } from "@/lib/types";

/** "Benchmark of the Week" — a single big-number stat spotlight. */
export default function BenchmarkSpotlight({ benchmark }: { benchmark: BenchmarkStat }) {
  return (
    <section>
      <SectionHeading label="Benchmark of the Week" action={{ href: "/benchmarks", label: "All benchmarks" }} />

      <Link
        href={benchmark.href}
        className="bench-grid"
        style={{
          textDecoration: "none",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) 1.1fr",
          border: "2px solid #1A1A18",
          background: "#1A1A18",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "40px 32px", borderRight: "2px solid #2A2A28" }}>
          <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5C7A5F", display: "block", marginBottom: 16 }}>
            // {benchmark.label}
          </span>
          <div className="font-type hero-h1" style={{ fontSize: 72, lineHeight: 0.95, color: "#EDEBE4" }}>
            {benchmark.stat}
          </div>
        </div>

        <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 300, color: "#C8C4B8", lineHeight: 1.7 }}>
            {benchmark.context}
          </p>
          <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "#8A8578" }}>
            Source: {benchmark.source}
          </span>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F" }}>
            See the breakdown →
          </span>
        </div>
      </Link>
    </section>
  );
}
