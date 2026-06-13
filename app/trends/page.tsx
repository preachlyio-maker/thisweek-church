import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getAllTrends } from "@/lib/trends";
import { TrendCategory } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Trends",
  description:
    "Every weekly church trend — worship songs, sermon topics, scripture, comms ideas, and ministry benchmarks, updated automatically each Monday.",
};

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "worship", label: "Worship" },
  { key: "sermon", label: "Sermon" },
  { key: "scripture", label: "Scripture" },
  { key: "comms", label: "Comms" },
  { key: "benchmark", label: "Benchmarks" },
  { key: "seasonal", label: "Seasonal" },
];

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && FILTERS.some((f) => f.key === category) ? category : "all";

  const all = await getAllTrends();
  const trends = active === "all" ? all : all.filter((t) => t.category === (active as TrendCategory));

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="The full index"
          title="All trends, updated weekly"
          intro="Browse every tracked trend across worship, preaching, scripture, communications, and ministry benchmarks. The list refreshes automatically every Monday."
          trends={trends}
          filters={FILTERS.map((f) => ({
            href: f.key === "all" ? "/trends" : `/trends?category=${f.key}`,
            label: f.label,
            active: f.key === active,
          }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
