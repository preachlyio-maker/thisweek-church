import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTrendsByCategory } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Scripture Trends",
  description:
    "What the church is reading this week — the most-preached passages and most-highlighted verses, cross-referenced with sermon data and YouVersion trends.",
};

const CAT_NAV = [
  { href: "/trends", label: "All", key: "all" },
  { href: "/trends/worship", label: "Worship", key: "worship" },
  { href: "/trends/sermons", label: "Sermons", key: "sermons" },
  { href: "/trends/scripture", label: "Scripture", key: "scripture" },
];

export default async function ScriptureTrendsPage() {
  const trends = await getTrendsByCategory("scripture");

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Scripture"
          title="What the church is reading"
          intro="The passages showing up most in sermons and the verses congregations are highlighting — a window into where the church's attention is turning this week."
          trends={trends}
          filters={CAT_NAV.map((c) => ({ href: c.href, label: c.label, active: c.key === "scripture" }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
