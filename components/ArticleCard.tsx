import Link from "next/link";
import { Article } from "@/lib/types";
import { readingTimeMinutes } from "@/lib/content";
import { format } from "date-fns";

/** Editorial article card — matches the newspaper grid (border-right + border-bottom). */
export default function ArticleCard({ article }: { article: Article }) {
  const mins = readingTimeMinutes(article.body);

  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="trend-card"
        style={{
          borderRight: "2px solid #0A0A0A",
          borderBottom: "2px solid #0A0A0A",
          padding: 24,
          position: "relative",
          overflow: "hidden",
          background: "#FEF3D5",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          className="font-type"
          style={{ fontSize: 130, color: "rgba(26,26,24,0.05)", position: "absolute", top: -20, right: -4, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}
        >
          ¶
        </span>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", border: "1px solid #0A0A0A", padding: "3px 7px", color: "#F50E00" }}>
            {article.type}
          </span>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.1em", color: "#7A5E14" }}>
            {format(new Date(article.published_at), "MMM d")}
          </span>
        </div>

        <h3 className="font-type" style={{ fontSize: 20, lineHeight: 1.25, color: "#0A0A0A" }}>
          {article.title}
        </h3>

        <p style={{ fontSize: 12.5, fontWeight: 300, color: "#3A2E18", lineHeight: 1.6, flex: 1 }}>
          {article.summary}
        </p>

        <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A5E14", display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
          <span>{mins} min read</span>
          <span>Read →</span>
        </div>
      </article>
    </Link>
  );
}
