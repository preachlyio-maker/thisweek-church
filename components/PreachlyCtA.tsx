const SOURCES = ["CCLI", "YouVersion", "Barna", "Pushpay", "FACT", "preachly.io"];

export default function PreachlyCTA() {
  return (
    <div className="bench-grid" style={{ background: "#0A0A0A", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 40, marginTop: 48 }}>
      <div>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F50E00", display: "block", marginBottom: 10 }}>
          // Every number has a source
        </span>
        <h3 className="font-type" style={{ fontSize: 34, color: "#FEF3D5", lineHeight: 1.15, marginBottom: 14 }}>
          Built on data you can <em style={{ fontStyle: "italic", color: "#F50E00" }}>trace</em>.
        </h3>
        <p style={{ fontSize: 13, fontWeight: 300, color: "#7A5E14", lineHeight: 1.7, maxWidth: 520, marginBottom: 16 }}>
          thisweek.church compiles primary church data from a handful of trusted sources — aggregated, cited, and
          refreshed every Monday morning.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SOURCES.map((s) => (
            <span key={s} className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #2A2620", color: "#8A7A50", padding: "5px 10px" }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <a
        href="/about/data"
        className="font-mono"
        style={{
          fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
          border: "1px solid #F50E00", color: "#F50E00", padding: "14px 24px",
          textDecoration: "none", whiteSpace: "nowrap", textAlign: "center", display: "block",
        }}
      >
        About our data →
      </a>
    </div>
  );
}
