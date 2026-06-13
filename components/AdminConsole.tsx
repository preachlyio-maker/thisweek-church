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
  background: "#EDEBE4",
  border: "2px solid #1A1A18",
  padding: "10px 12px",
  fontSize: 13,
  color: "#1A1A18",
  fontFamily: "'Space Mono', monospace",
};
const label: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#8A8578",
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
    <section style={{ border: "2px solid #1A1A18", padding: 22, marginBottom: 24 }}>
      <h2 className="font-type" style={{ fontSize: 22, color: "#1A1A18", marginBottom: 4 }}>{spec.title}</h2>
      <p style={{ fontSize: 12, fontWeight: 300, color: "#8A8578", marginBottom: 18 }}>{spec.blurb}</p>

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
          <button type="submit" disabled={busy} className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: "#1A1A18", color: "#EDEBE4", border: "2px solid #1A1A18", padding: "11px 20px", cursor: busy ? "wait" : "pointer" }}>
            {busy ? "Working…" : "Add"}
          </button>
          <button type="button" onClick={load} disabled={busy} className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#1A1A18", border: "2px solid #1A1A18", padding: "11px 20px", cursor: "pointer" }}>
            Show existing
          </button>
          {msg && <span className="font-mono" style={{ fontSize: 11, color: msg.includes("✓") ? "#3A6A3E" : "#B0573F" }}>{msg}</span>}
        </div>
      </form>

      {rows && (
        <div style={{ borderTop: "1px solid #C8C4B8" }}>
          {rows.length === 0 && <p className="font-mono" style={{ fontSize: 11, color: "#8A8578", padding: "12px 0" }}>None yet.</p>}
          {rows.map((row) => (
            <div key={row.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid #C8C4B8" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "#1A1A18", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spec.primary(row)}</div>
                {spec.secondary && <div className="font-mono" style={{ fontSize: 9, color: "#8A8578", textTransform: "uppercase", letterSpacing: "0.08em" }}>{spec.secondary(row)}</div>}
              </div>
              <button onClick={() => del(row.id)} disabled={busy} title="Delete" className="font-mono" style={{ fontSize: 14, lineHeight: 1, background: "transparent", color: "#B0573F", border: "1px solid #B0573F", padding: "4px 9px", cursor: "pointer", flexShrink: 0 }}>
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

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <label style={label}>Admin secret (enter once)</label>
        <input style={input} type="password" value={secret} onChange={(e) => setSecret(e.target.value)} autoComplete="off" placeholder="your ADMIN_SEED_SECRET" />
      </div>

      {SPECS.map((spec) => (
        <Manager key={spec.key} spec={spec} secret={secret} />
      ))}
    </div>
  );
}
