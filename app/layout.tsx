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
      <body>
        {children}
      </body>
    </html>
  );
}
