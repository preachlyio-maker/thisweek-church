import Link from "next/link";

const TICKER_ITEMS = [
  "Top Worship Songs",
  "Sermon Trends",
  "Scripture Data",
  "Comms Ideas",
  "Ministry Benchmarks",
  "Seasonal Campaigns",
];

export default function SiteHeader() {
  return (
    <header>
      {/* Ticker */}
      <div style={{ background: "#1A1A18", overflow: "hidden", padding: "8px 0" }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono"
              style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#B8A98A", padding: "0 24px", whiteSpace: "nowrap" }}
            >
              {item} <span style={{ color: "#5C7A5F" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ borderBottom: "2px solid #1A1A18", background: "#EDEBE4" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", padding: "18px 28px 18px 0", borderRight: "1px solid #C8C4B8" }}>
            <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#8A8578", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
              Updated Weekly
            </span>
            <span className="font-type" style={{ fontSize: "26px", color: "#1A1A18", lineHeight: 1, display: "block" }}>
              This Week · <em style={{ fontStyle: "italic", color: "#5C7A5F" }}>Church</em>
            </span>
          </Link>

          <div style={{ display: "flex" }}>
            {[
              { href: "/trends", label: "Trends" },
              { href: "/seasonal", label: "Seasonal" },
              { href: "/benchmarks", label: "Benchmarks" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#1A1A18",
                  textDecoration: "none",
                  padding: "0 20px",
                  borderLeft: "1px solid #C8C4B8",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="https://preachly.io"
              target="_blank"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                background: "#1A1A18",
                color: "#EDEBE4",
                padding: "0 20px",
                borderLeft: "1px solid #C8C4B8",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Try Preachly ↗
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
