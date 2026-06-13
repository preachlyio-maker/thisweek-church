import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Fragment } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getArticleBySlug, getArticles, readingTimeMinutes } from "@/lib/content";
import { getRelatedTrends } from "@/lib/trends";
import { format } from "date-fns";

export const revalidate = 3600;

const BYLINE = "This Week · Church Editorial Team";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.meta_description || article.summary,
    openGraph: { title: article.title, description: article.summary, type: "article" },
  };
}

/** Render plain-text body: blank lines split paragraphs, "## " marks subheads, **bold** inline. */
function renderInline(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((seg, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 500 }}>{seg}</strong> : <Fragment key={i}>{seg}</Fragment>
  );
}

function renderBody(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="font-type" style={{ fontSize: "1.5rem", lineHeight: 1.25, margin: "36px 0 14px", color: "var(--ink)" }}>
          {trimmed.slice(3)}
        </h2>
      );
    }
    return (
      <p key={i} style={{ fontSize: "1.02rem", fontWeight: 300, lineHeight: 1.85, margin: "0 0 20px", color: "var(--ink)" }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedTrends(article.related_slugs || []);
  const mins = readingTimeMinutes(article.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || article.summary,
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: { "@type": "Organization", name: BYLINE },
    publisher: { "@type": "Organization", name: "This Week · Church", url: "https://thisweek.church" },
    keywords: (article.tags || []).join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 28, fontSize: "0.8rem", color: "var(--muted)" }} className="font-mono">
          <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <a href="/articles" style={{ color: "var(--muted)", textDecoration: "none" }}>Articles</a>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 36, borderBottom: "2px solid var(--ink)", paddingBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--rule)", padding: "4px 9px" }}>
              {article.type}
            </span>
            <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
              {format(new Date(article.published_at), "MMMM d, yyyy")} · {mins} min read
            </span>
          </div>

          <h1 className="font-type" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, margin: "0 0 18px", color: "var(--ink)" }}>
            {article.title}
          </h1>

          <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            {article.summary}
          </p>

          <p className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginTop: 18 }}>
            By {BYLINE}
          </p>
        </header>

        {/* Body */}
        <article style={{ marginBottom: 32 }}>{renderBody(article.body)}</article>

        {/* Provenance — runs on every article */}
        <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "18px 0", margin: "0 0 32px" }}>
          <p style={{ fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
            Data in this article is sourced from the preachly.io church network and publicly available ministry research.
            thisweek.church is published by preachly.io — church communication tools used by ministry teams across America.
          </p>
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {article.tags.map((tag) => (
              <span key={tag} className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid var(--rule)", padding: "5px 11px", color: "var(--muted)" }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Internal links */}
        {related.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <hr className="rule" style={{ marginBottom: 28 }} />
            <h2 className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 18 }}>
              Keep reading
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {related.map((r) => (
                <a
                  key={r.id}
                  href={`/trends/${r.slug}`}
                  style={{ textDecoration: "none", padding: "14px 18px", border: "2px solid var(--ink)", background: "transparent", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span className="font-type" style={{ fontSize: "1rem", color: "var(--ink)" }}>{r.title}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)" }}>→</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}
