# thisweek.church

A programmatic SEO site for church trends — updated automatically every Monday.

## Stack

- **Next.js 15** (App Router, ISR)
- **Vercel** (hosting, free tier)
- **Supabase** (Postgres database, free tier)
- **GitHub Actions** (weekly cron pipeline)
- **Claude API** (summary generation, ~$1/month)

## Monthly cost: ~$1

---

## Deploy in 5 Steps

### 1. Supabase setup
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `supabase-schema.sql`
3. Copy your Project URL and anon key from **Settings → API**

### 2. Vercel deploy
1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables (see `.env.local.example`)
4. Deploy

### 3. GitHub Secrets
Add these to your repo under **Settings → Secrets → Actions**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `REVALIDATE_SECRET` (any random string — run `openssl rand -hex 32`)

### 4. First run
```bash
# Seed your database manually to test
cp .env.local.example .env.local
# Fill in your real values, then:
npm run pipeline
```

### 5. Go live
The GitHub Actions workflow (`weekly-pipeline.yml`) runs every Monday at 6am UTC.
Trigger it manually anytime from the Actions tab.

---

## Adding new trend sources

Edit `pipeline/run.js` — add a new `async function fetchXxx()` that returns:

```js
{
  slug: "unique-url-slug",
  title: "Page Title",
  subtitle: "Short description",
  category: "worship" | "sermon" | "scripture" | "comms" | "seasonal" | "benchmark",
  data: [
    { rank: 1, label: "Item name", value: "optional metric", delta: "up"|"down"|"new", note: "optional context" }
  ],
  sources: [{ label: "Source name", url: "https://..." }],
  related_slugs: ["other-slug-1", "other-slug-2"]
}
```

Then add your function to the `DATA_SOURCES` array.

---

## SEO / GEO notes

- Every page generates JSON-LD `Article` schema with `dateModified`
- `speakable` schema marks key paragraphs for AI search engines
- Dynamic sitemap at `/sitemap.xml` updates with every page
- ISR revalidation keeps pages fresh without full rebuilds
- Google Search Console: submit sitemap after first deploy

---

## Extending

- Add `/seasonal/[holiday]` pages for Easter, Christmas, Advent
- Add `/benchmarks/[slug]` with dedicated benchmark data
- Add an email capture for a weekly digest (later)
- Add a Substack embed for deeper editorial content
