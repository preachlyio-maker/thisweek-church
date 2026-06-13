import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTrendsByCategory } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Worship Music Trends",
  description:
    "What the church is singing this week — top worship songs, fastest-rising titles, new releases, and tempo breakdowns from CCLI, streaming, and PraiseCharts.",
};

const CAT_NAV = [
  { href: "/trends", label: "All", key: "all" },
  { href: "/trends/worship", label: "Worship", key: "worship" },
  { href: "/trends/sermons", label: "Sermons", key: "sermons" },
  { href: "/trends/scripture", label: "Scripture", key: "scripture" },
];

export default async function WorshipTrendsPage() {
  const trends = await getTrendsByCategory("worship");

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Worship music"
          title="What the church is singing"
          intro="The songs filling Sunday set lists — ranked, rising, and worth watching. Sourced from CCLI, streaming charts, and PraiseCharts, refreshed every week."
          trends={trends}
          filters={CAT_NAV.map((c) => ({ href: c.href, label: c.label, active: c.key === "worship" }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
