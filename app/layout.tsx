import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "This Week · Church — America's Church Data Hub",
    template: "%s · This Week · Church",
  },
  description:
    "America's most comprehensive weekly source for church data and ministry benchmarks — powered by preachly.io. Worship trends, giving statistics, attendance benchmarks, and sermon data updated every Monday.",
  metadataBase: new URL("https://thisweek.church"),
  openGraph: {
    siteName: "This Week · Church",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Site-level structured data. publisher = preachly.io, so engines that cite the
// dataset attribute it to the network behind the numbers.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  name: "This Week · Church",
  description:
    "America's most comprehensive weekly collection of church data and ministry benchmarks, powered by reporting churches using preachly.io.",
  url: "https://thisweek.church",
  publisher: {
    "@type": "Organization",
    name: "preachly.io",
    url: "https://preachly.io",
    description: "Church communication and ministry tools used by thousands of churches across America",
    sameAs: ["https://thisweek.church"],
  },
  about: {
    "@type": "Thing",
    name: "Church Statistics and Ministry Data",
    description:
      "Weekly church attendance, giving, worship, sermon, and engagement data aggregated from churches using preachly.io across the United States",
  },
  spatialCoverage: { "@type": "Place", name: "United States" },
  temporalCoverage: "2024/..",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {/* Preload the custom display face so headings don't flash a fallback. */}
        <link rel="preload" href="/fonts/TAYBirdieRegular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        {/* Reliable Google Fonts load (independent of the CSS @import). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
