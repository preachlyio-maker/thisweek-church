import { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdminConsole from "@/components/AdminConsole";

export const metadata: Metadata = {
  title: "Seed",
  robots: { index: false, follow: false },
};

export default function AdminSeedPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px" }}>
        <section style={{ padding: "52px 0 32px", borderBottom: "2px solid #1A1A18" }}>
          <p className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "block", width: 32, height: 1, background: "#8A8578" }} />
            Admin · manual seed
          </p>
          <h1 className="font-type hero-h1" style={{ fontSize: 48, lineHeight: 1.05, color: "#1A1A18", marginBottom: 16, maxWidth: 720 }}>
            Manage your content
          </h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: "#5A5850", lineHeight: 1.7, maxWidth: 560 }}>
            Enter your admin secret once, then add or remove accounts, trending posts, and featured reads with simple fields — no JSON. Each &quot;Add&quot; appends one entry; the &quot;✕&quot; deletes one. Click &quot;Show existing&quot; to see what&apos;s live.
          </p>
        </section>

        <div style={{ padding: "32px 0 48px" }}>
          <AdminConsole />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
