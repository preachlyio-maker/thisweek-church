import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "This Week · Church",
    template: "%s · This Week · Church",
  },
  description: "Weekly church trends, worship data, and ministry insights — updated automatically every Monday.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
