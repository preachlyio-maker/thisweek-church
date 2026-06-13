import SectionHeading from "@/components/SectionHeading";
import { SocialPost, SocialPlatform } from "@/lib/types";

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  twitter: "X / Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
};

function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

/* ---------------- Watch This Week (videos) ---------------- */

function VideoCard({ post }: { post: SocialPost }) {
  return (
    <a
      href={post.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", display: "flex", flexDirection: "column" }}
    >
      <div className="media-thumb-wrap" style={{ borderBottom: "2px solid #1A1A18", aspectRatio: "16 / 9", background: "#1A1A18" }}>
        {post.thumbnail_url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="media-thumb" src={post.thumbnail_url} alt="" loading="lazy" style={{ height: "100%", objectFit: "cover" }} />
        )}
        <span className="media-play" aria-hidden>▶</span>
        {post.likes > 0 && <span className="media-badge">{fmtCount(post.likes)} views</span>}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span className="media-channel font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5C7A5F" }}>
          {PLATFORM_LABEL[post.platform]}{post.account_name ? ` · ${post.account_name}` : ""}
        </span>
        <h3 className="media-title font-type line-clamp-2" style={{ fontSize: 15, lineHeight: 1.3, color: "#1A1A18", flex: 1 }}>
          {post.caption_excerpt}
        </h3>
        <span className="media-foot font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578" }}>
          Watch →
        </span>
      </div>
    </a>
  );
}

/* ---------------- Trending posts (TikTok / IG / X) ---------------- */

function PostCard({ post }: { post: SocialPost }) {
  return (
    <a
      href={post.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", display: "flex", flexDirection: "column" }}
    >
      {post.thumbnail_url && (
        <div className="media-thumb-wrap" style={{ borderBottom: "2px solid #1A1A18", aspectRatio: "4 / 5", background: "#1A1A18" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="media-thumb" src={post.thumbnail_url} alt="" loading="lazy" style={{ height: "100%", objectFit: "cover" }} />
          <span className="media-play" aria-hidden>▶</span>
          {post.likes > 0 && <span className="media-badge">♥ {fmtCount(post.likes)}</span>}
        </div>
      )}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1, minHeight: post.thumbnail_url ? 0 : 150 }}>
        <span className="media-channel font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5C7A5F" }}>
          {PLATFORM_LABEL[post.platform]}
        </span>
        {post.caption_excerpt && (
          <p className="media-title line-clamp-2" style={{ fontSize: 12.5, fontWeight: 300, color: "#2A2A28", lineHeight: 1.55, flex: 1 }}>
            {post.caption_excerpt}
          </p>
        )}
        <div className="media-foot font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578", display: "flex", justifyContent: "space-between" }}>
          <span>@{post.account_handle}</span>
          <span>View →</span>
        </div>
      </div>
    </a>
  );
}

/* ---------------- Accounts to follow ---------------- */

function AccountCard({ post }: { post: SocialPost }) {
  return (
    <a
      href={post.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={{ textDecoration: "none", borderRight: "2px solid #1A1A18", borderBottom: "2px solid #1A1A18", padding: 18, display: "flex", flexDirection: "column", gap: 8, minHeight: 120 }}
    >
      <span className="media-foot font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578" }}>
        {PLATFORM_LABEL[post.platform]}
      </span>
      <div className="media-title font-type" style={{ fontSize: 17, lineHeight: 1.2, color: "#1A1A18" }}>
        {post.account_name || `@${post.account_handle}`}
      </div>
      {post.caption_excerpt && (
        <p className="media-title" style={{ fontSize: 12, fontWeight: 300, color: "#5A5850", lineHeight: 1.5, flex: 1 }}>{post.caption_excerpt}</p>
      )}
      <span className="media-channel font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", marginTop: "auto" }}>
        Follow →
      </span>
    </a>
  );
}

/* ---------------- Wall ---------------- */

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #1A1A18", borderLeft: "2px solid #1A1A18" }}>
      {children}
    </div>
  );
}

export default function SocialWall({
  videos = [],
  posts = [],
  accounts = [],
}: {
  videos?: SocialPost[];
  posts?: SocialPost[];
  accounts?: SocialPost[];
}) {
  if (videos.length === 0 && posts.length === 0 && accounts.length === 0) return null;

  return (
    <>
      {videos.length > 0 && (
        <section>
          <SectionHeading label="Watch This Week" />
          <Grid>
            {videos.slice(0, 12).map((v) => (
              <VideoCard key={v.id} post={v} />
            ))}
          </Grid>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <SectionHeading label="Trending This Week" />
          <Grid>
            {posts.slice(0, 6).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </Grid>
        </section>
      )}

      {accounts.length > 0 && (
        <section>
          <SectionHeading label="Accounts to Follow" />
          <Grid>
            {accounts.slice(0, 6).map((a) => (
              <AccountCard key={a.id} post={a} />
            ))}
          </Grid>
        </section>
      )}
    </>
  );
}
