export default function PreachlyCTA() {
  return (
    <div style={{ background: "#1A1A18", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 40, marginTop: 48 }}>
      <div>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C7A5F", display: "block", marginBottom: 10 }}>
          // Powered by Preachly
        </span>
        <h3 className="font-type" style={{ fontSize: 36, color: "#EDEBE4", lineHeight: 1.15, marginBottom: 10 }}>
          Turn your Sunday<br />into a <em style={{ fontStyle: "italic", color: "#5C7A5F" }}>mobile companion.</em>
        </h3>
        <p style={{ fontSize: 13, fontWeight: 300, color: "#8A8578", lineHeight: 1.65, maxWidth: 480 }}>
          Preachly gives your congregation sermon notes, worship links, and giving tools — automatically synced from your service order. No app required.
        </p>
      </div>
      <a
        href="https://preachly.io"
        target="_blank"
        className="font-mono"
        style={{
          fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
          border: "1px solid #5C7A5F", color: "#5C7A5F", padding: "14px 24px",
          textDecoration: "none", whiteSpace: "nowrap", display: "block",
        }}
      >
        See how it works ↗
      </a>
    </div>
  );
}
