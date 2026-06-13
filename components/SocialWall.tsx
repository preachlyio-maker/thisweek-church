import SectionHeading from "@/components/SectionHeading";
import { SocialPost, SocialPlatform } from "@/lib/types";

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  twitter: "X / Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
};

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

function PostCard({ post }: { post: SocialPost }) {
  return (
    <a
      href={post.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      style={{
        textDecoration: "none",
        borderRight: "2px solid #1A1A18",
        borderBottom: "2px solid #1A1A18",
        padding: 20,
        background: "#EDEBE4",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minHeight: 150,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5C7A5F" }}>
          {PLATFORM_LABEL[post.platform]}
        </span>
        <span className="font-mono" style={{ fontSize: 9, color: "#8A8578" }}>
          ♥ {fmt(post.likes)} · {fmt(post.comments)} ✦
        </span>
      </div>

      <p style={{ fontSize: 12.5, fontWeight: 300, color: "#2A2A28", lineHeight: 1.55, flex: 1 }}>
        {post.caption_excerpt}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.06em", color: "#1A1A18" }}>
          @{post.account_handle}
        </span>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578" }}>
          View →
        </span>
      </div>
    </a>
  );
}

export default function SocialWall({ posts, spotlight }: { posts: SocialPost[]; spotlight: SocialPost | null }) {
  if (posts.length === 0 && !spotlight) return null;

  return (
    <section>
      <SectionHeading label="Around the Church This Week" />

      <div
        className="trends-3"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18" }}
      >
        {posts.slice(0, 9).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {spotlight && (
        <a
          href={spotlight.post_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bench-grid"
          style={{
            textDecoration: "none",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 24,
            alignItems: "center",
            background: "#1A1A18",
            borderLeft: "2px solid #1A1A18",
            borderRight: "2px solid #1A1A18",
            borderBottom: "2px solid #1A1A18",
            padding: "26px 28px",
          }}
        >
          <div>
            <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C7A5F", display: "block", marginBottom: 8 }}>
              ✦ Account to Follow
            </span>
            <div className="font-type" style={{ fontSize: 26, color: "#EDEBE4", lineHeight: 1.1 }}>
              @{spotlight.account_handle}
            </div>
            <span className="font-mono" style={{ fontSize: 9, color: "#8A8578", marginTop: 6, display: "block" }}>
              {PLATFORM_LABEL[spotlight.platform]} · {fmt(spotlight.likes)} ♥
            </span>
          </div>
          <div style={{ borderLeft: "1px solid #2A2A28", paddingLeft: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 300, color: "#C8C4B8", lineHeight: 1.7 }}>
              {spotlight.caption_excerpt}
            </p>
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", marginTop: 10, display: "block" }}>
              Follow {spotlight.account_name || `@${spotlight.account_handle}`} →
            </span>
          </div>
        </a>
      )}
    </section>
  );
}
