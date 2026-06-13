import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrendIndex from "@/components/TrendIndex";
import { getTrendsByCategory } from "@/lib/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Seasonal",
  description:
    "Seasonal church ministry ideas — service elements, outreach, and planning notes for the holidays and seasons ahead, refreshed throughout the year.",
};

export default async function SeasonalPage() {
  const trends = await getTrendsByCategory("seasonal");

  return (
    <>
      <SiteHeader />
      <main>
        <TrendIndex
          eyebrow="Seasonal planning"
          title="Plan the season ahead"
          intro="Practical, ready-to-use ideas for the holidays and seasons your church is heading into — service elements, outreach angles, and pastoral notes worth planning early."
          trends={trends}
        />
      </main>
      <SiteFooter />
    </>
  );
}
