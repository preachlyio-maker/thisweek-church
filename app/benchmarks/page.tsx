import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTrendsByCategory } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ministry Benchmarks",
  description:
    "Church attendance, engagement, and online giving benchmarks — typical ranges across reporting churches, updated weekly.",
};

export default async function BenchmarksPage() {
  const trends = await getTrendsByCategory("benchmark");

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Ministry benchmarks"
          title="How does your church compare?"
          intro="Attendance, engagement, and giving benchmarks drawn from reporting churches — useful context for reading your own numbers, not a scoreboard. Updated weekly."
          trends={trends}
        />
      </main>
      <SiteFooter />
    </>
  );
}
