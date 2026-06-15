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
      style={{ textDecoration: "none", borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", display: "flex", flexDirection: "column" }}
    >
      <div className="media-thumb-wrap" style={{ borderBottom: "2px solid #0A0A0A", aspectRatio: "16 / 9", background: "#0A0A0A" }}>
        {post.thumbnail_url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="media-thumb" src={post.thumbnail_url} alt="" loading="lazy" style={{ height: "100%", objectFit: "cover" }} />
        )}
        <span className="media-play" aria-hidden>▶</span>
        {post.likes > 0 && <span className="media-badge">{fmtCount(post.likes)} views</span>}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span className="media-channel font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F50E00" }}>
          {PLATFORM_LABEL[post.platform]}{post.account_name ? ` · ${post.account_name}` : ""}
        </span>
        <h3 className="media-title font-type line-clamp-2" style={{ fontSize: 15, lineHeight: 1.3, color: "#0A0A0A", flex: 1 }}>
          {post.caption_excerpt}
        </h3>
        <span className="media-foot font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A5E14" }}>
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
      style={{ textDecoration: "none", borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", display: "flex", flexDirection: "column" }}
    >
      {post.thumbnail_url && (
        <div className="media-thumb-wrap" style={{ borderBottom: "2px solid #0A0A0A", aspectRatio: "4 / 5", background: "#0A0A0A" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="media-thumb" src={post.thumbnail_url} alt="" loading="lazy" style={{ height: "100%", objectFit: "cover" }} />
          <span className="media-play" aria-hidden>▶</span>
          {post.likes > 0 && <span className="media-badge">♥ {fmtCount(post.likes)}</span>}
        </div>
      )}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1, minHeight: post.thumbnail_url ? 0 : 150 }}>
        <span className="media-channel font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F50E00" }}>
          {PLATFORM_LABEL[post.platform]}
        </span>
        {post.caption_excerpt && (
          <p className="media-title line-clamp-2" style={{ fontSize: 12.5, fontWeight: 300, color: "#2A2620", lineHeight: 1.55, flex: 1 }}>
            {post.caption_excerpt}
          </p>
        )}
        <div className="media-foot font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A5E14", display: "flex", justifyContent: "space-between" }}>
          <span>@{post.account_handle}</span>
          <span>View →</span>
        </div>
      </div>
    </a>
  );
}

/* ---------------- Accounts to follow ---------------- */

function AccountCard({ post }: { post: SocialPost }) {
  const name = post.account_name || post.account_handle;
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <a
      href={post.post_url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={{ textDecoration: "none", borderRight: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", padding: 18, display: "flex", flexDirection: "column", gap: 12, minHeight: 130 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 40, height: 40, background: "#F50E00", color: "#FEF3D5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} className="font-type">
          <span style={{ fontSize: 20, lineHeight: 1 }}>{initial}</span>
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="media-title font-type" style={{ fontSize: 15, lineHeight: 1.15, color: "#0A0A0A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
          <span className="media-foot font-mono" style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A5E14" }}>
            {PLATFORM_LABEL[post.platform]} · @{post.account_handle}
          </span>
        </div>
      </div>
      {post.caption_excerpt && (
        <p className="media-title" style={{ fontSize: 12, fontWeight: 300, color: "#3A2E18", lineHeight: 1.5, flex: 1 }}>{post.caption_excerpt}</p>
      )}
      <span className="media-channel font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F50E00", marginTop: "auto" }}>
        Follow →
      </span>
    </a>
  );
}

/* ---------------- Wall ---------------- */

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="trends-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #0A0A0A", borderLeft: "2px solid #0A0A0A" }}>
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
          <SectionHeading label="Videos We Love This Week" />
          <Grid>
            {videos.slice(0, 12).map((v) => (
              <VideoCard key={v.id} post={v} />
            ))}
          </Grid>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <SectionHeading label="Loved This Week" />
          <Grid>
            {posts.slice(0, 6).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </Grid>
        </section>
      )}

      {accounts.length > 0 && (
        <section>
          <SectionHeading label="Churches to Follow" />
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
