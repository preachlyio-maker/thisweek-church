import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

type Category = { name: string; desc: string; href: string; n: string };

const CATEGORIES: Category[] = [
  { name: "Worship", desc: "Songs & set lists", href: "/trends/worship", n: "01" },
  { name: "Preaching", desc: "Sermons & series", href: "/trends/sermons", n: "02" },
  { name: "Scripture", desc: "Most-preached passages", href: "/trends/scripture", n: "03" },
  { name: "Communications", desc: "Social, email & design", href: "/trends?category=comms", n: "04" },
  { name: "Giving & Growth", desc: "Benchmarks & attendance", href: "/benchmarks", n: "05" },
  { name: "Leadership", desc: "Reads & analysis", href: "/articles", n: "06" },
];

export default function CategoryGrid() {
  return (
    <section>
      <SectionHeading label="Categories" />
      <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18" }}>
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="cat-tile"
            style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: "26px 24px 22px", minHeight: 168, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <span className="cat-num font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#5C7A5F" }}>{c.n}</span>
            <div>
              <div className="cat-name font-type" style={{ fontSize: 38, lineHeight: 0.98, color: "#1A1A18", marginBottom: 8 }}>{c.name}</div>
              <span className="cat-desc font-mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8578" }}>{c.desc} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
