import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ArticleCard from "@/components/ArticleCard";
import PreachlyCTA from "@/components/PreachlyCtA";
import { getArticles } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Original reporting on church trends — data dives, benchmark spotlights, and practical takeaways from the This Week · Church editorial team.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <SiteHeader />
      <main>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
          <section style={{ padding: "52px 0 36px", borderBottom: "2px solid #0A0A0A" }}>
            <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A5E14", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 32, height: 1, background: "#7A5E14" }} />
              From our editorial team
            </p>
            <h1 className="font-type hero-h1" style={{ fontSize: 52, lineHeight: 1.05, color: "#0A0A0A", marginBottom: 16, maxWidth: 760 }}>
              What we're seeing in the data
            </h1>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#3A2E18", lineHeight: 1.7, maxWidth: 560 }}>
              Short, useful reads for church communicators, worship leaders, and pastors — published throughout the week. Authoritative, warm, never preachy.
            </p>
          </section>

          {articles.length === 0 ? (
            <div style={{ border: "2px solid #0A0A0A", padding: "72px 40px", textAlign: "center", marginTop: 24 }}>
              <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#7A5E14", textTransform: "uppercase" }}>
                New articles publish twice daily — check back soon
              </p>
            </div>
          ) : (
            <div
              className="trends-3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "2px solid #0A0A0A", borderLeft: "2px solid #0A0A0A", marginTop: 24 }}
            >
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          <PreachlyCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
