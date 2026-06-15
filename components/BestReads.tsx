import SectionHeading from "@/components/SectionHeading";
import { ExternalRead } from "@/lib/types";

/** "This Week's Best Reads" — external content we high-five and link out to. */
export default function BestReads({ reads }: { reads: ExternalRead[] }) {
  if (reads.length === 0) return null;

  return (
    <section>
      <SectionHeading label="This Week's Best Reads" action={{ href: "/reads", label: "All reads" }} />

      <div style={{ borderTop: "2px solid #0A0A0A" }}>
        {reads.map((read) => (
          <a
            key={read.id}
            href={read.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-row"
            style={{
              textDecoration: "none",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "baseline",
              padding: "20px 0",
              borderBottom: "1px solid #0A0A0A",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F50E00" }}>
                  {read.source}
                </span>
                {read.featured && (
                  <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", background: "#F50E00", color: "#FEF3D5", padding: "2px 7px" }}>
                    Editor's pick
                  </span>
                )}
              </div>
              <h3 className="font-type" style={{ fontSize: 21, lineHeight: 1.25, color: "#0A0A0A", marginBottom: 8 }}>
                {read.title}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 300, color: "#3A2E18", lineHeight: 1.65, maxWidth: 680 }}>
                {read.summary}
              </p>
            </div>
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A5E14", whiteSpace: "nowrap" }}>
              Read at {read.source} →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
