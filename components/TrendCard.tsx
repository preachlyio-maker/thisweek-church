import Link from "next/link";
import { TrendPage } from "@/lib/types";
import { format } from "date-fns";

const CATEGORY_LABELS: Record<string, string> = {
  worship: "Worship", sermon: "Sermon", scripture: "Scripture",
  comms: "Comms", seasonal: "Seasonal", benchmark: "Benchmarks",
};

export default function TrendCard({ trend, index }: { trend: TrendPage; index: number }) {
  const topItems = trend.data.slice(0, 3);

  return (
    <Link href={`/trends/${trend.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="trend-card"
        style={{
          borderRight: "2px solid #0A0A0A",
          borderBottom: "2px solid #0A0A0A",
          padding: 24,
          position: "relative",
          overflow: "hidden",
          background: "#FEF3D5",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Ghost number */}
        <span className="font-type" style={{ fontSize: 130, color: "rgba(26,26,24,0.05)", position: "absolute", top: -16, right: -4, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
          {index + 1}
        </span>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", border: "1px solid #0A0A0A", padding: "3px 7px", color: "#7A5E14" }}>
            {CATEGORY_LABELS[trend.category]}
          </span>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.1em", background: "#FDF0D0", color: "#3A6A3E", padding: "3px 7px", display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F50E00", display: "inline-block" }} />
            {format(new Date(trend.updated_at), "MMM d")}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-type" style={{ fontSize: 17, lineHeight: 1.3, color: "#0A0A0A" }}>
          {trend.title}
        </h2>

        {/* Ranked items */}
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {topItems.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="font-mono" style={{ fontSize: 9, color: "#8A7A50", letterSpacing: "0.06em", minWidth: 16 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 12, color: "#2A2620", lineHeight: 1.3 }}>{item.label}</span>
              {item.delta === "new" && (
                <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.1em", background: "#F50E00", color: "#FEF3D5", padding: "1px 5px" }}>new</span>
              )}
              {item.delta === "up" && (
                <span className="font-mono" style={{ fontSize: 10, color: "#F50E00" }}>↑</span>
              )}
            </li>
          ))}
        </ol>

        <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A5E14", marginTop: "auto" }}>
          Full list →
        </div>
      </article>
    </Link>
  );
}
