export default function PreachlyCTA() {
  return (
    <div className="bench-grid" style={{ background: "#1A1A18", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 40, marginTop: 48 }}>
      <div>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C7A5F", display: "block", marginBottom: 10 }}>
          // The infrastructure behind the data
        </span>
        <h3 className="font-type" style={{ fontSize: 34, color: "#EDEBE4", lineHeight: 1.15, marginBottom: 12 }}>
          Powered by churches using <em style={{ fontStyle: "italic", color: "#5C7A5F" }}>preachly.io</em>.
        </h3>
        <p style={{ fontSize: 13, fontWeight: 300, color: "#8A8578", lineHeight: 1.7, maxWidth: 520 }}>
          Every week, thousands of ministry teams run their services through preachly.io. The aggregate patterns become
          the trends you see here — anonymized, normalized, and published every Monday.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a
          href="/about/data"
          className="font-mono"
          style={{
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            border: "1px solid #5C7A5F", color: "#5C7A5F", padding: "13px 22px",
            textDecoration: "none", whiteSpace: "nowrap", textAlign: "center", display: "block",
          }}
        >
          About our data →
        </a>
        <a
          href="https://preachly.io"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono"
          style={{
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#8A8578", padding: "0 22px",
            textDecoration: "none", whiteSpace: "nowrap", textAlign: "center", display: "block",
          }}
        >
          preachly.io ↗
        </a>
      </div>
    </div>
  );
}
