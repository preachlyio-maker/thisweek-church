import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["trends", "articles", "social_posts", "external_reads"] as const;
type Table = (typeof ALLOWED)[number];

// Tables with a unique `slug` — paste-to-update instead of duplicating.
const UPSERT_TABLES: Table[] = ["trends", "articles"];

/**
 * Manual seed endpoint. Lets an admin paste rows of JSON into a table while
 * the live data sources are still being wired up. Gated by ADMIN_SEED_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SEED_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "ADMIN_SEED_SECRET is not set on the server." },
      { status: 500 }
    );
  }

  let body: { secret?: string; table?: string; rows?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const table = body.table as Table;
  if (!ALLOWED.includes(table)) {
    return NextResponse.json(
      { error: `"table" must be one of: ${ALLOWED.join(", ")}.` },
      { status: 400 }
    );
  }

  const rows = Array.isArray(body.rows) ? body.rows : [body.rows];
  if (rows.length === 0 || rows.some((r) => typeof r !== "object" || r === null)) {
    return NextResponse.json(
      { error: '"rows" must be an object or a non-empty array of objects.' },
      { status: 400 }
    );
  }

  const supabase = getServiceClient();
  const records = rows as Record<string, unknown>[];

  const builder = UPSERT_TABLES.includes(table)
    ? supabase.from(table).upsert(records, { onConflict: "slug" })
    : supabase.from(table).insert(records);

  const { data, error } = await builder.select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, table, written: data?.length ?? records.length });
}
