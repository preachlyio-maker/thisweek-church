import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPO = process.env.GITHUB_REPO || "preachlyio-maker/thisweek-church";
const WORKFLOW = "content-pipeline.yml";

/**
 * One-button "refresh the site": triggers the content pipeline on GitHub
 * Actions (which fetches the latest data and revalidates the live pages).
 * Gated by ADMIN_SEED_SECRET. Needs GITHUB_DISPATCH_TOKEN (a GitHub token with
 * Actions read/write on this repo) set as a server env var.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "ADMIN_SEED_SECRET is not set on the server." }, { status: 500 });
  }

  let body: { secret?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400 });
  }
  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid admin secret." }, { status: 401 });
  }

  const token = process.env.GITHUB_DISPATCH_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_DISPATCH_TOKEN is not set — add it in Vercel to enable the button." },
      { status: 500 }
    );
  }

  const res = await fetch(`https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "thisweek.church",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main" }),
  });

  if (res.status === 204) {
    return NextResponse.json({ ok: true });
  }
  const text = await res.text().catch(() => "");
  return NextResponse.json(
    { error: `GitHub returned ${res.status}. ${text.slice(0, 200)}` },
    { status: 502 }
  );
}
