import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTrendsByCategory } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sermon Topics & Series Trends",
  description:
    "What the church is preaching this week — trending sermon topics, series names, and seasonal themes drawn from the sermon feeds of the top churches.",
};

const CAT_NAV = [
  { href: "/trends", label: "All", key: "all" },
  { href: "/trends/worship", label: "Worship", key: "worship" },
  { href: "/trends/sermons", label: "Sermons", key: "sermons" },
  { href: "/trends/scripture", label: "Scripture", key: "scripture" },
];

export default async function SermonTrendsPage() {
  const trends = await getTrendsByCategory("sermon");

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Sermon topics & series"
          title="What the church is preaching"
          intro="The themes and series titles gaining traction across the top churches — and the topics that spike by season. A planning tool, not a scoreboard."
          trends={trends}
          filters={CAT_NAV.map((c) => ({ href: c.href, label: c.label, active: c.key === "sermons" }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
