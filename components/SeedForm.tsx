"use client";

import { useState } from "react";

const TABLES = [
  { value: "trends", label: "Trends (upsert by slug)" },
  { value: "articles", label: "Articles (upsert by slug)" },
  { value: "social_posts", label: "Social posts (insert)" },
  { value: "external_reads", label: "External reads (insert)" },
];

const PLACEHOLDER = `[
  {
    "slug": "top-worship-songs",
    "category": "worship",
    "title": "Top 10 Worship Songs",
    "data": [{ "rank": 1, "label": "Gratitude — Brandon Lake" }],
    "sources": [],
    "related_slugs": [],
    "status": "published"
  }
]`;

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#EDEBE4",
  border: "2px solid #1A1A18",
  padding: "12px 14px",
  fontSize: 13,
  color: "#1A1A18",
  fontFamily: "'Space Mono', monospace",
};

export default function SeedForm() {
  const [secret, setSecret] = useState("");
  const [table, setTable] = useState("trends");
  const [json, setJson] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    let rows: unknown;
    try {
      rows = JSON.parse(json);
    } catch {
      setOk(false);
      setResult("That isn't valid JSON. Paste an object or an array of objects.");
      setBusy(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, table, rows }),
      });
      const data = await res.json();
      setOk(res.ok);
      setResult(res.ok ? `✓ Wrote ${data.written} row(s) to ${data.table}.` : `✗ ${data.error}`);
    } catch (err) {
      setOk(false);
      setResult(`✗ ${(err as Error).message}`);
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
      <div>
        <label className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578", display: "block", marginBottom: 8 }}>
          Admin secret
        </label>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
          autoComplete="off"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578", display: "block", marginBottom: 8 }}>
          Table
        </label>
        <select value={table} onChange={(e) => setTable(e.target.value)} style={inputStyle}>
          {TABLES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A8578", display: "block", marginBottom: 8 }}>
          Rows (JSON)
        </label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={14}
          required
          style={{ ...inputStyle, lineHeight: 1.5, resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="font-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          background: "#1A1A18",
          color: "#EDEBE4",
          border: "2px solid #1A1A18",
          padding: "14px 24px",
          cursor: busy ? "wait" : "pointer",
          alignSelf: "flex-start",
        }}
      >
        {busy ? "Writing…" : "Write to database"}
      </button>

      {result && (
        <p
          className="font-mono"
          style={{ fontSize: 12, lineHeight: 1.6, color: ok ? "#3A6A3E" : "#B0573F", border: `1px solid ${ok ? "#5C7A5F" : "#B0573F"}`, padding: "12px 14px" }}
        >
          {result}
        </p>
      )}
    </form>
  );
}
