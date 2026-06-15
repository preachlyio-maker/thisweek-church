import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTeachingTrends } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Teaching Trends",
  description:
    "What the church is teaching this week — trending sermon topics and series alongside the most-preached passages and most-highlighted verses.",
};

const CAT_NAV = [
  { href: "/trends", label: "All", key: "all" },
  { href: "/trends/worship", label: "Worship", key: "worship" },
  { href: "/trends/teaching", label: "Teaching", key: "teaching" },
];

export default async function TeachingTrendsPage() {
  const trends = await getTeachingTrends();

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Teaching"
          title="What the church is teaching"
          intro="Sermon topics and series gaining traction, plus the passages and verses congregations are turning to — the themes shaping the church's teaching this week."
          trends={trends}
          filters={CAT_NAV.map((c) => ({ href: c.href, label: c.label, active: c.key === "teaching" }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
