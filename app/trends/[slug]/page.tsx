import { notFound } from "next/navigation";
import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PreachlyCTA from "@/components/PreachlyCtA";
import { getTrendBySlug, getRelatedTrends } from "@/lib/trends";
import { format } from "date-fns";

export const revalidate = 3600;

const getTrend = getTrendBySlug;
const getRelated = getRelatedTrends;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trend = await getTrend(slug);
  if (!trend) return {};
  return {
    title: trend.title,
    description: trend.meta_description || trend.subtitle || `${trend.title} — updated weekly church trend data from This Week · Church`,
    openGraph: { title: trend.title, description: trend.meta_description },
  };
}

const DELTA_ICON = { up: "↑", down: "↓", new: "★" };
const DELTA_COLOR = { up: "var(--pulse)", down: "var(--danger)", new: "var(--accent)" };

export default async function TrendDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trend = await getTrend(slug);
  if (!trend) notFound();

  const related = await getRelated(trend.related_slugs || []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trend.title,
    description: trend.meta_description || trend.subtitle,
    dateModified: trend.updated_at,
    datePublished: trend.updated_at,
    publisher: {
      "@type": "Organization",
      name: "This Week · Church",
      url: "https://thisweek.church",
    },
    about: {
      "@type": "Thing",
      name: trend.title,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: 32, fontSize: "0.8rem", color: "var(--muted)" }}>
          <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <a href="/trends" style={{ color: "var(--muted)", textDecoration: "none" }}>Trends</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <span style={{ color: "var(--ink)" }}>{trend.title}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              className="font-mono"
              style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500 }}
            >
              {trend.category}
            </span>
            <span className="updated-pill">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--pulse)", display: "inline-block" }} />
              Updated {format(new Date(trend.updated_at), "MMMM d, yyyy")}
            </span>
          </div>

          <h1
            className="font-display speakable"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 14px" }}
          >
            {trend.title}
          </h1>

          {trend.subtitle && (
            <p style={{ fontSize: "1.05rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{trend.subtitle}</p>
          )}
        </header>

        <hr className="rule" style={{ marginBottom: 40 }} />

        {/* Ranked list */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
            Ranked Data
          </h2>

          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
            {trend.data.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr auto",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</p>
                  {item.note && <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "var(--muted)" }}>{item.note}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.value !== undefined && (
                    <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{item.value}</span>
                  )}
                  {item.delta && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.7rem",
                        color: DELTA_COLOR[item.delta],
                        fontWeight: 600,
                      }}
                    >
                      {DELTA_ICON[item.delta]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* AI-generated summary */}
        {trend.summary && (
          <section style={{ marginBottom: 48 }}>
            <h2 className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
              What This Means for Your Ministry
            </h2>
            <div
              className="speakable"
              style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--ink)" }}
              dangerouslySetInnerHTML={{ __html: trend.summary.replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>") }}
            />
          </section>
        )}

        {/* Sources */}
        {trend.sources?.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
              Sources
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", gap: 12, flexWrap: "wrap" }}>
              {trend.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "underline" }}>{s.label}</a>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <hr className="rule" style={{ marginBottom: 32 }} />
            <h2 className="font-type" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Related Trends</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {related.map((r) => (
                <a
                  key={r.id}
                  href={`/trends/${r.slug}`}
                  style={{ textDecoration: "none", padding: "14px 18px", border: "2px solid var(--ink)", background: "transparent", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--ink)" }}>{r.title}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)" }}>→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        <PreachlyCTA />
      </main>

      <SiteFooter />
    </>
  );
}
