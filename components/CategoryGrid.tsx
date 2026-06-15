import Link from "next/link";

type Category = { name: string; desc: string; href: string; n: string; bg: string; fg: string };

const CATEGORIES: Category[] = [
  { name: "Worship", desc: "Songs & set lists", href: "/trends/worship", n: "01", bg: "#ED0008", fg: "#F7EFD9" },
  { name: "Preaching", desc: "Sermons & series", href: "/trends/sermons", n: "02", bg: "#E0B850", fg: "#0A0A0A" },
  { name: "Scripture", desc: "Most-preached passages", href: "/trends/scripture", n: "03", bg: "#0A0A0A", fg: "#F59A0B" },
  { name: "Communications", desc: "Social, email & design", href: "/trends?category=comms", n: "04", bg: "#F59A0B", fg: "#0A0A0A" },
  { name: "Giving & Growth", desc: "Benchmarks & attendance", href: "/benchmarks", n: "05", bg: "#ED0008", fg: "#F7EFD9" },
  { name: "Leadership", desc: "Reads & analysis", href: "/articles", n: "06", bg: "#E0B850", fg: "#0A0A0A" },
];

export default function CategoryGrid() {
  return (
    <section style={{ padding: "8px 0 4px" }}>
      <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#8A8578", padding: "24px 0 16px" }}>
        Browse by category
      </p>
      <div>
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="cat-band"
            style={{
              background: c.bg,
              color: c.fg,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: "clamp(18px, 3vw, 30px) clamp(20px, 4vw, 40px)",
            }}
          >
            <span style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px, 2.5vw, 26px)", minWidth: 0 }}>
              <span className="font-mono" style={{ fontSize: 13, opacity: 0.65 }}>{c.n}</span>
              <span className="font-type" style={{ fontSize: "clamp(34px, 6vw, 60px)", lineHeight: 0.9 }}>{c.name}</span>
            </span>
            <span className="cat-band-desc font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", opacity: 0.85 }}>
              {c.desc} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
