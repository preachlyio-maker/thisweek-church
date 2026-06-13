import { notFound } from "next/navigation";
import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getBenchmarkPages, getBenchmarkPageBySlug } from "@/lib/sampleBenchmarks";
import { format } from "date-fns";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBenchmarkPageBySlug(slug);
  if (!b) return {};
  return {
    title: b.title,
    description: b.meta_description || b.summary,
    openGraph: { title: b.title, description: b.summary, type: "article" },
  };
}

export async function generateStaticParams() {
  return getBenchmarkPages().map((b) => ({ slug: b.slug }));
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
    {children}
  </h2>
);

export default async function BenchmarkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBenchmarkPageBySlug(slug);
  if (!b) notFound();

  const related = (b.related_slugs || [])
    .map((s) => getBenchmarkPageBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: b.title,
    description: b.meta_description || b.summary,
    dateModified: b.updated_at,
    datePublished: b.updated_at,
    publisher: { "@type": "Organization", name: "This Week · Church", url: "https://thisweek.church" },
    about: { "@type": "Thing", name: b.label },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "44px 24px 16px" }}>
        {/* Breadcrumb */}
        <nav className="font-mono" style={{ marginBottom: 28, fontSize: "0.72rem", color: "var(--muted)" }}>
          <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 8px" }}>→</span>
          <a href="/benchmarks" style={{ color: "var(--muted)", textDecoration: "none" }}>Benchmarks</a>
        </nav>

        {/* Hero stat */}
        <section style={{ border: "2px solid var(--ink)", padding: "clamp(28px, 5vw, 48px)", marginBottom: 40, position: "relative", overflow: "hidden" }}>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 18 }}>
            // {b.label}
          </span>
          <div className="font-type" style={{ fontSize: "clamp(4rem, 13vw, 8rem)", lineHeight: 0.9, color: "var(--ink)", marginBottom: 24 }}>
            {b.hero_stat}
          </div>
          <p className="speakable" style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.6, maxWidth: 640 }}>
            {b.hero_caption}
          </p>
          <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginTop: 20, display: "block" }}>
            Updated {format(new Date(b.updated_at), "MMMM yyyy")}
          </span>
        </section>

        {/* How it compares */}
        <section style={{ marginBottom: 44 }}>
          <SectionLabel>How it compares</SectionLabel>
          <div style={{ borderTop: "2px solid var(--ink)" }}>
            {b.comparisons.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                  alignItems: "baseline",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--rule)",
                  borderLeft: c.highlight ? "3px solid var(--accent)" : "3px solid transparent",
                  paddingLeft: 14,
                }}
              >
                <span style={{ fontSize: "0.98rem", fontWeight: c.highlight ? 400 : 300, color: c.highlight ? "var(--ink)" : "var(--muted)" }}>
                  {c.label}
                </span>
                <span className="font-type" style={{ fontSize: c.highlight ? "1.9rem" : "1.4rem", color: c.highlight ? "var(--accent)" : "var(--ink)", lineHeight: 1 }}>
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* By church size */}
        <section style={{ marginBottom: 44 }}>
          <SectionLabel>By church size</SectionLabel>
          <div
            className="bench-tiers"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "2px solid var(--ink)", borderLeft: "2px solid var(--ink)" }}
          >
            {b.by_size.map((t, i) => (
              <div key={i} style={{ borderRight: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", padding: 20 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 10 }}>
                  {t.tier}
                </span>
                <div className="font-type" style={{ fontSize: "2.2rem", lineHeight: 1, color: "var(--ink)", marginBottom: t.note ? 8 : 0 }}>
                  {t.value}
                </div>
                {t.note && <span style={{ fontSize: 11, fontWeight: 300, color: "var(--muted)", lineHeight: 1.4, display: "block" }}>{t.note}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* What the above-average do */}
        <section style={{ marginBottom: 44 }}>
          <SectionLabel>What the above-average churches share</SectionLabel>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {b.common_factors.map((f, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, alignItems: "baseline", padding: "16px 0", borderBottom: "1px solid var(--rule)" }}>
                <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.6 }}>{f}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Tips */}
        {b.tips && b.tips.length > 0 && (
          <section style={{ marginBottom: 44 }}>
            <SectionLabel>Worth trying</SectionLabel>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {b.tips.map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>✦</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.6 }}>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Soft Preachly mention */}
        {b.preachly && (
          <section style={{ marginBottom: 44 }}>
            <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 18 }}>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.7 }}>{b.preachly}</p>
            </div>
          </section>
        )}

        {/* Sources */}
        {b.sources?.length > 0 && (
          <section style={{ marginBottom: 44 }}>
            <SectionLabel>Sources</SectionLabel>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {b.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "underline" }}>{s.label}</a>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related benchmarks */}
        {related.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <hr className="rule" style={{ marginBottom: 28 }} />
            <SectionLabel>Related benchmarks</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/benchmarks/${r.slug}`}
                  style={{ textDecoration: "none", padding: "14px 18px", border: "2px solid var(--ink)", background: "transparent", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                >
                  <span className="font-type" style={{ fontSize: "1rem", color: "var(--ink)" }}>{r.title}</span>
                  <span className="font-type" style={{ fontSize: "1.1rem", color: "var(--accent)", whiteSpace: "nowrap" }}>{r.hero_stat} →</span>
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
