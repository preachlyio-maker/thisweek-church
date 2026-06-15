import SectionHeading from "@/components/SectionHeading";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/lib/types";

/** "From Our Editorial Team" — the latest two articles. */
export default function EditorialFeed({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section>
      <SectionHeading label="From Our Editorial Team" action={{ href: "/articles", label: "All articles" }} />
      <div
        className="feature-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "2px solid #0A0A0A", borderLeft: "2px solid #0A0A0A" }}
      >
        {articles.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
