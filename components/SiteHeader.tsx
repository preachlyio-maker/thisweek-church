import Link from "next/link";

const TICKER_ITEMS = [
  "Top Worship Songs",
  "Teaching Trends",
  "Comms Ideas",
  "Ministry Benchmarks",
  "Seasonal Campaigns",
];

export default function SiteHeader() {
  return (
    <header>
      {/* Ticker */}
      <div style={{ background: "#0A0A0A", overflow: "hidden", padding: "8px 0" }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono"
              style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#C9A84C", padding: "0 24px", whiteSpace: "nowrap" }}
            >
              {item} <span style={{ color: "#F50E00" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ borderBottom: "2px solid #0A0A0A", background: "#FEF3D5" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", padding: "18px 28px 18px 0", borderRight: "1px solid #0A0A0A" }}>
            <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#7A5E14", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
              Updated Weekly
            </span>
            <span className="font-type" style={{ fontSize: "26px", color: "#0A0A0A", lineHeight: 1, display: "block" }}>
              This Week · <em style={{ fontStyle: "italic", color: "#F50E00" }}>Church</em>
            </span>
          </Link>

          <div style={{ display: "flex" }}>
            <div className="nav-links" style={{ display: "flex" }}>
            {[
              { href: "/trends", label: "Trends" },
              { href: "/benchmarks", label: "Benchmarks" },
              { href: "/articles", label: "Articles" },
              { href: "/reads", label: "Reads" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#0A0A0A",
                  textDecoration: "none",
                  padding: "0 20px",
                  borderLeft: "1px solid #0A0A0A",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {label}
              </Link>
            ))}
            </div>
            <Link
              href="https://preachly.io"
              target="_blank"
              className="nav-cta"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                background: "#0A0A0A",
                color: "#FEF3D5",
                padding: "0 20px",
                borderLeft: "1px solid #0A0A0A",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              preachly.io ↗
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
