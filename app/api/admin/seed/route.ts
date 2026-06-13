import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["trends", "articles", "social_posts", "external_reads"] as const;
type Table = (typeof ALLOWED)[number];

const UPSERT = new Set<Table>(["trends", "articles"]);

const LIST_COLS: Record<Table, string> = {
  trends: "id, slug, category, title, status",
  articles: "id, slug, title, type, status, published_at",
  social_posts: "id, platform, kind, account_handle, account_name, post_url, thumbnail_url, caption_excerpt, captured_at",
  external_reads: "id, source, title, url, featured, published_at",
};

const ORDER_COL: Record<Table, string> = {
  trends: "updated_at",
  articles: "published_at",
  social_posts: "captured_at",
  external_reads: "published_at",
};

/**
 * Admin data endpoint, gated by ADMIN_SEED_SECRET. Supports:
 *   { action: "list", table }                 -> list rows
 *   { action: "delete", table, id }            -> delete one row
 *   { table, row }  or  { table, rows: [...] } -> insert (upsert for trends/articles)
 */
export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "ADMIN_SEED_SECRET is not set on the server." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid admin secret." }, { status: 401 });
  }

  const table = body.table as Table;
  if (!ALLOWED.includes(table)) {
    return NextResponse.json({ error: `"table" must be one of: ${ALLOWED.join(", ")}.` }, { status: 400 });
  }

  const db = getServiceClient();
  const action = (body.action as string) || "insert";

  if (action === "list") {
    const { data, error } = await db
      .from(table)
      .select(LIST_COLS[table])
      .order(ORDER_COL[table], { ascending: false })
      .limit(300);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, rows: data ?? [] });
  }

  if (action === "delete") {
    if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const { error } = await db.from(table).delete().eq("id", body.id as string);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  // insert / upsert
  const rows = Array.isArray(body.rows) ? body.rows : body.row ? [body.row] : [];
  if (rows.length === 0 || rows.some((r) => typeof r !== "object" || r === null)) {
    return NextResponse.json({ error: "Provide a row or rows to add." }, { status: 400 });
  }
  const records = rows as Record<string, unknown>[];
  const query = UPSERT.has(table)
    ? db.from(table).upsert(records, { onConflict: "slug" })
    : db.from(table).insert(records);
  const { data, error } = await query.select();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, written: data?.length ?? records.length });
}
