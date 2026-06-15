import SectionHeading from "@/components/SectionHeading";
import { SocialPost, SocialPlatform } from "@/lib/types";

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  twitter: "X / Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
};

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function Thumb({ v }: { v: SocialPost }) {
  return (
    <>
      {v.thumbnail_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="media-thumb" src={v.thumbnail_url} alt="" loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
      ) : null}
      <span className="media-play" aria-hidden>▶</span>
      {v.likes > 0 && <span className="media-badge">{fmt(v.likes)} views</span>}
    </>
  );
}

function GridCard({ v }: { v: SocialPost }) {
  return (
    <a
      href={v.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={{ textDecoration: "none", borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", display: "flex", flexDirection: "column" }}
    >
      <div className="media-thumb-wrap" style={{ borderBottom: "2px solid #0A0A0A", aspectRatio: "16 / 9", background: "#0A0A0A" }}>
        <Thumb v={v} />
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
        <span className="media-channel font-mono" style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F50E00" }}>
          {v.account_name || PLATFORM_LABEL[v.platform]}
        </span>
        <h4 className="media-title font-type line-clamp-2" style={{ fontSize: 14, lineHeight: 1.3, color: "#0A0A0A", flex: 1 }}>{v.caption_excerpt}</h4>
      </div>
    </a>
  );
}

export default function VideoGallery({ videos }: { videos: SocialPost[] }) {
  if (videos.length === 0) return null;
  const [feature, ...rest] = videos;

  return (
    <section>
      <SectionHeading label="Caught Our Eye" />
      <p style={{ fontSize: 13, fontWeight: 300, color: "#3A2E18", lineHeight: 1.6, maxWidth: 560, margin: "-6px 0 18px" }}>
        Videos our team came across this week and wanted to pass along — worth a few minutes.
      </p>

      {/* Featured */}
      <a
        href={feature.post_url}
        target="_blank"
        rel="noopener noreferrer"
        className="media-card feature-grid"
        style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "1.5fr 1fr", borderTop: "2px solid #0A0A0A", borderLeft: "2px solid #0A0A0A" }}
      >
        <div className="media-thumb-wrap" style={{ borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", aspectRatio: "16 / 9", background: "#0A0A0A" }}>
          <Thumb v={feature} />
        </div>
        <div style={{ borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <span className="media-channel font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F50E00" }}>
            {PLATFORM_LABEL[feature.platform]}{feature.account_name ? ` · ${feature.account_name}` : ""}
          </span>
          <h3 className="media-title font-type" style={{ fontSize: 28, lineHeight: 1.15, color: "#0A0A0A" }}>{feature.caption_excerpt}</h3>
          <span className="media-foot font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A5E14" }}>Watch →</span>
        </div>
      </a>

      {/* Rest */}
      {rest.length > 0 && (
        <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderLeft: "2px solid #0A0A0A" }}>
          {rest.slice(0, 6).map((v) => (
            <GridCard key={v.id} v={v} />
          ))}
        </div>
      )}
    </section>
  );
}
