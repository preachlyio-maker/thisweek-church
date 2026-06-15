"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "url" | "select" | "textarea";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

type Spec = {
  key: string;
  title: string;
  blurb: string;
  table: string;
  fixed?: Record<string, unknown>;
  kindFilter?: string;
  fields: Field[];
  primary: (row: Record<string, string>) => string;
  secondary?: (row: Record<string, string>) => string;
};

const SPECS: Spec[] = [
  {
    key: "channels",
    title: "Church video channels (the video wall sources)",
    blurb: "Add real church YouTube channels — the \"Videos We Love\" wall pulls their latest videos automatically each day. Paste a @handle or a channel ID (UC…).",
    table: "social_posts",
    fixed: { kind: "channel", platform: "youtube", post_url: "https://www.youtube.com" },
    kindFilter: "channel",
    fields: [
      { name: "account_handle", label: "Channel @handle or ID", placeholder: "GraceChurchFL  (or UCxxxxxxxx…)" },
      { name: "account_name", label: "Church name (optional)", placeholder: "Grace Church Orlando", optional: true },
    ],
    primary: (r) => r.account_name || `@${r.account_handle}`,
    secondary: (r) => r.account_handle,
  },
  {
    key: "accounts",
    title: "Accounts to follow",
    blurb: "Real church accounts. Links go to the profile.",
    table: "social_posts",
    fixed: { kind: "account" },
    kindFilter: "account",
    fields: [
      { name: "platform", label: "Platform", type: "select", options: ["instagram", "tiktok", "youtube", "twitter"] },
      { name: "account_handle", label: "Handle (no @)", placeholder: "discovergrace" },
      { name: "account_name", label: "Display name", placeholder: "Grace Church Orlando" },
      { name: "caption_excerpt", label: "One-line description", placeholder: "Helping people take their next step toward Christ." },
      { name: "post_url", label: "Profile URL", type: "url", placeholder: "https://www.instagram.com/discovergrace/" },
    ],
    primary: (r) => `@${r.account_handle}`,
    secondary: (r) => `${r.platform} · ${r.account_name || ""}`,
  },
  {
    key: "posts",
    title: "Trending posts (TikTok / IG / X)",
    blurb: "Paste a post URL. TikTok thumbnails fill in automatically on the next pipeline run.",
    table: "social_posts",
    fixed: { kind: "post" },
    kindFilter: "post",
    fields: [
      { name: "platform", label: "Platform", type: "select", options: ["tiktok", "instagram", "twitter", "youtube"] },
      { name: "post_url", label: "Post URL", type: "url", placeholder: "https://www.tiktok.com/@vouschurch/video/..." },
      { name: "account_handle", label: "Handle (no @)", placeholder: "vouschurch" },
    ],
    primary: (r) => r.post_url,
    secondary: (r) => `${r.platform} · @${r.account_handle}`,
  },
  {
    key: "reads",
    title: "Best reads (article links)",
    blurb: "Hand-pick an outside article to feature.",
    table: "external_reads",
    fields: [
      { name: "source", label: "Source", placeholder: "Carey Nieuwhof" },
      { name: "title", label: "Title", placeholder: "7 Disruptive Church Trends That Will Rule 2026" },
      { name: "url", label: "URL", type: "url", placeholder: "https://careynieuwhof.com/..." },
      { name: "summary", label: "2-sentence summary", type: "textarea" },
    ],
    primary: (r) => r.title,
    secondary: (r) => r.source,
  },
];

const input: React.CSSProperties = {
  width: "100%",
  background: "#FEF3D5",
  border: "2px solid #0A0A0A",
  padding: "10px 12px",
  fontSize: 13,
  color: "#0A0A0A",
  fontFamily: "'Space Mono', monospace",
};
const label: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#7A5E14",
  display: "block",
  marginBottom: 6,
};

function Manager({ spec, secret }: { spec: Spec; secret: string }) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [rows, setRows] = useState<Record<string, string>[] | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function api(payload: Record<string, unknown>) {
    const res = await fetch("/api/admin/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, table: spec.table, ...payload }),
    });
    const data = await res.json();
    return { ok: res.ok, ...data };
  }

  async function load() {
    if (!secret) { setMsg("Enter the admin secret at the top first."); return; }
    setBusy(true);
    const r = await api({ action: "list" });
    setBusy(false);
    if (!r.ok) { setMsg(r.error || "Error"); return; }
    const all = (r.rows || []) as Record<string, string>[];
    setRows(spec.kindFilter ? all.filter((x) => (x.kind || "post") === spec.kindFilter) : all);
    setMsg("");
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!secret) { setMsg("Enter the admin secret at the top first."); return; }
    setBusy(true);
    const r = await api({ action: "insert", row: { ...spec.fixed, ...form } });
    setBusy(false);
    if (!r.ok) { setMsg(r.error || "Error"); return; }
    setMsg("Added ✓");
    setForm({});
    load();
  }

  async function del(id: string) {
    setBusy(true);
    const r = await api({ action: "delete", id });
    setBusy(false);
    if (!r.ok) { setMsg(r.error || "Error"); return; }
    load();
  }

  return (
    <section style={{ border: "2px solid #0A0A0A", padding: 22, marginBottom: 24 }}>
      <h2 className="font-type" style={{ fontSize: 22, color: "#0A0A0A", marginBottom: 4 }}>{spec.title}</h2>
      <p style={{ fontSize: 12, fontWeight: 300, color: "#7A5E14", marginBottom: 18 }}>{spec.blurb}</p>

      <form onSubmit={add} style={{ display: "grid", gap: 12, marginBottom: 18 }}>
        {spec.fields.map((f) => (
          <div key={f.name}>
            <label style={label}>{f.label}</label>
            {f.type === "select" ? (
              <select style={input} value={form[f.name] || ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required>
                <option value="" disabled>Choose…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea style={{ ...input, resize: "vertical" }} rows={3} value={form[f.name] || ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} placeholder={f.placeholder} />
            ) : (
              <input style={input} type={f.type === "url" ? "url" : "text"} value={form[f.name] || ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} placeholder={f.placeholder} required={!f.optional} />
            )}
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button type="submit" disabled={busy} className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: "#0A0A0A", color: "#FEF3D5", border: "2px solid #0A0A0A", padding: "11px 20px", cursor: busy ? "wait" : "pointer" }}>
            {busy ? "Working…" : "Add"}
          </button>
          <button type="button" onClick={load} disabled={busy} className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#0A0A0A", border: "2px solid #0A0A0A", padding: "11px 20px", cursor: "pointer" }}>
            Show existing
          </button>
          {msg && <span className="font-mono" style={{ fontSize: 11, color: msg.includes("✓") ? "#3A6A3E" : "#F50E00" }}>{msg}</span>}
        </div>
      </form>

      {rows && (
        <div style={{ borderTop: "1px solid #0A0A0A" }}>
          {rows.length === 0 && <p className="font-mono" style={{ fontSize: 11, color: "#7A5E14", padding: "12px 0" }}>None yet.</p>}
          {rows.map((row) => (
            <div key={row.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid #0A0A0A" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "#0A0A0A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spec.primary(row)}</div>
                {spec.secondary && <div className="font-mono" style={{ fontSize: 9, color: "#7A5E14", textTransform: "uppercase", letterSpacing: "0.08em" }}>{spec.secondary(row)}</div>}
              </div>
              <button onClick={() => del(row.id)} disabled={busy} title="Delete" className="font-mono" style={{ fontSize: 14, lineHeight: 1, background: "transparent", color: "#F50E00", border: "1px solid #F50E00", padding: "4px 9px", cursor: "pointer", flexShrink: 0 }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AdminConsole() {
  const [secret, setSecret] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState("");

  async function refresh() {
    if (!secret) { setRefreshMsg("Enter the admin secret first."); return; }
    setRefreshing(true);
    setRefreshMsg("");
    try {
      const res = await fetch("/api/admin/run-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      setRefreshMsg(res.ok ? "✓ Refresh started — the live site updates in about 1–2 minutes." : `✗ ${data.error}`);
    } catch (e) {
      setRefreshMsg(`✗ ${(e as Error).message}`);
    }
    setRefreshing(false);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <label style={label}>Admin secret (enter once)</label>
        <input style={input} type="password" value={secret} onChange={(e) => setSecret(e.target.value)} autoComplete="off" placeholder="your ADMIN_SEED_SECRET" />
      </div>

      {/* One-button publish */}
      <div style={{ border: "2px solid #F50E00", background: "#FDF0D0", padding: 20, marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="font-type" style={{ fontSize: 18, color: "#0A0A0A", marginBottom: 2 }}>Refresh the live site</div>
          <div style={{ fontSize: 12, fontWeight: 300, color: "#3A6A3E" }}>Pulls the latest videos, reads &amp; articles, then updates the public pages. Run this after you add or remove anything.</div>
          {refreshMsg && <div className="font-mono" style={{ fontSize: 11, marginTop: 8, color: refreshMsg.includes("✓") ? "#3A6A3E" : "#F50E00" }}>{refreshMsg}</div>}
        </div>
        <button onClick={refresh} disabled={refreshing} className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", background: "#0A0A0A", color: "#FEF3D5", border: "2px solid #0A0A0A", padding: "14px 26px", cursor: refreshing ? "wait" : "pointer", whiteSpace: "nowrap" }}>
          {refreshing ? "Starting…" : "Refresh site →"}
        </button>
      </div>

      {SPECS.map((spec) => (
        <Manager key={spec.key} spec={spec} secret={secret} />
      ))}
    </div>
  );
}
