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
      className="social-card"
      style={{
        textDecoration: "none",
        borderRight: "2px solid #1A1A18",
        borderBottom: "2px solid #1A1A18",
        background: "#EDEBE4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", borderBottom: "2px solid #1A1A18" }}>
        {post.thumbnail_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.thumbnail_url}
            alt=""
            loading="lazy"
            style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", aspectRatio: "16 / 9", background: "#1A1A18" }} />
        )}
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            width: 34,
            height: 34,
            background: "rgba(26,26,24,0.85)",
            color: "#EDEBE4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          ▶
        </span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5C7A5F" }}>
          {PLATFORM_LABEL[post.platform]}{post.account_name ? ` · ${post.account_name}` : ""}
        </span>
        <h3 className="font-type" style={{ fontSize: 15, lineHeight: 1.3, color: "#1A1A18", flex: 1 }}>
          {post.caption_excerpt}
        </h3>
        <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578", display: "flex", justifyContent: "space-between" }}>
          <span>{post.likes > 0 ? `${fmtCount(post.likes)} views` : " "}</span>
          <span>Watch →</span>
        </div>
      </div>
    </a>
  );
}

/* ---------------- Trending posts ---------------- */

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
        background: "#EDEBE4",
        padding: 20,
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
        {(post.likes > 0 || post.comments > 0) && (
          <span className="font-mono" style={{ fontSize: 9, color: "#8A8578" }}>
            ♥ {post.likes.toLocaleString()}
          </span>
        )}
      </div>
      <p style={{ fontSize: 12.5, fontWeight: 300, color: "#2A2A28", lineHeight: 1.55, flex: 1 }}>{post.caption_excerpt}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 9, color: "#1A1A18" }}>@{post.account_handle}</span>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8578" }}>View →</span>
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
      className="social-card"
      style={{
        textDecoration: "none",
        borderRight: "2px solid #1A1A18",
        borderBottom: "2px solid #1A1A18",
        background: "#EDEBE4",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 120,
      }}
    >
      <span className="font-mono" style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578" }}>
        {PLATFORM_LABEL[post.platform]}
      </span>
      <div className="font-type" style={{ fontSize: 17, lineHeight: 1.2, color: "#1A1A18" }}>
        {post.account_name || `@${post.account_handle}`}
      </div>
      {post.caption_excerpt && (
        <p style={{ fontSize: 12, fontWeight: 300, color: "#5A5850", lineHeight: 1.5, flex: 1 }}>{post.caption_excerpt}</p>
      )}
      <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C7A5F", marginTop: "auto" }}>
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
            {videos.slice(0, 6).map((v) => (
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
