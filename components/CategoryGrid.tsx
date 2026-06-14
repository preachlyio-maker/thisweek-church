import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { TrendPage, TrendCategory } from "@/lib/types";

type Area = {
  name: string;
  blurb: string;
  href: string;
  category: TrendCategory | null;
  ghost: string;
};

const AREAS: Area[] = [
  { name: "Worship", blurb: "Songs & set lists churches are using", href: "/trends/worship", category: "worship", ghost: "W" },
  { name: "Preaching", blurb: "Sermon topics & series gaining traction", href: "/trends/sermons", category: "sermon", ghost: "P" },
  { name: "Scripture", blurb: "The passages being preached most", href: "/trends/scripture", category: "scripture", ghost: "S" },
  { name: "Communications", blurb: "What's working in social, email & design", href: "/trends?category=comms", category: "comms", ghost: "C" },
  { name: "Giving & Growth", blurb: "Benchmarks for giving & attendance", href: "/benchmarks", category: "benchmark", ghost: "G" },
  { name: "Leadership", blurb: "Analysis & the best church reads", href: "/articles", category: null, ghost: "L" },
];

export default function CategoryGrid({ trends }: { trends: TrendPage[] }) {
  return (
    <section>
      <SectionHeading label="Browse by area" />
      <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18" }}>
        {AREAS.map((area) => {
          const trend = area.category ? trends.find((t) => t.category === area.category) : undefined;
          return (
            <Link
              key={area.name}
              href={area.href}
              className="social-card"
              style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: 24, minHeight: 196, display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden" }}
            >
              <span className="font-type" style={{ position: "absolute", top: -16, right: 8, fontSize: 96, lineHeight: 1, color: "rgba(26,26,24,0.05)", pointerEvents: "none", userSelect: "none" }}>
                {area.ghost}
              </span>
              <h3 className="font-type" style={{ fontSize: 23, lineHeight: 1.1, color: "#1A1A18" }}>{area.name}</h3>
              <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578" }}>{area.blurb}</span>
              {trend && (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, flex: 1, marginTop: 6 }}>
                  {trend.data.slice(0, 3).map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 9, alignItems: "baseline" }}>
                      <span className="font-mono" style={{ fontSize: 9, color: "#B8B4A8", minWidth: 14 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 12, color: "#2A2A28", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", marginTop: "auto" }}>Explore →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
