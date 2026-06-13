import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "2px solid #1A1A18", marginTop: 48 }}>
      <div className="footer-grid" style={{ maxWidth: 1060, margin: "0 auto", padding: "36px 28px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 40 }}>
        <div>
          <span className="font-type" style={{ fontSize: 20, color: "#1A1A18", marginBottom: 8, display: "block" }}>
            This Week · <em style={{ fontStyle: "italic", color: "#5C7A5F" }}>Church</em>
          </span>
          <p style={{ fontSize: 12, fontWeight: 300, color: "#8A8578", lineHeight: 1.6 }}>
            America&apos;s weekly church data hub — worship, sermons, giving, attendance, and engagement, updated every
            Monday. Powered by{" "}
            <a href="https://preachly.io" style={{ color: "#5C7A5F" }}>preachly.io</a>.
          </p>
        </div>

        {[
          {
            head: "Explore",
            links: [{ href: "/trends", label: "All Trends" }, { href: "/articles", label: "Articles" }, { href: "/reads", label: "Best Reads" }, { href: "/benchmarks", label: "Benchmarks" }, { href: "/about/data", label: "About the Data" }],
          },
          {
            head: "preachly.io",
            links: [{ href: "/about", label: "About" }, { href: "https://preachly.io", label: "preachly.io" }, { href: "https://preachly.io/features", label: "Features" }],
          },
        ].map(({ head, links }) => (
          <div key={head}>
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8B4A8", marginBottom: 14, display: "block" }}>
              {head}
            </span>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: "block", fontSize: 12, color: "#5A5850", textDecoration: "none", marginBottom: 8 }}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #C8C4B8", padding: "14px 28px", maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "#B8B4A8", textTransform: "uppercase" }}>
          Data updated weekly · © {new Date().getFullYear()} preachly.io
        </span>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "#B8B4A8", textTransform: "uppercase" }}>
          Generated with Claude AI
        </span>
      </div>
    </footer>
  );
}
