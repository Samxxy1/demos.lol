# demos.lol

A dark, expressive bio-link platform. Your link, your world.

---

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **Framer Motion**
- **Supabase** — auth, database, file storage

---

## Setup in 5 steps

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Pick a name, region, password — note the password down
3. Wait ~2 minutes for the project to spin up

### 3. Run the database schema

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Open `supabase/migrations/001_init.sql` from this project
3. Paste the entire file contents into the editor
4. Click **Run**

This creates all tables, RLS policies, storage bucket, and the auto-profile trigger.

### 4. Set environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Fill in your values from **Supabase Dashboard → Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` is secret — never expose it to the browser. It's used server-side only for analytics inserts that bypass RLS.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel (free, public link)

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. In the Vercel project settings → **Environment Variables**, add the same 4 variables from your `.env.local`
4. Click **Deploy**

Your site goes live at `your-project.vercel.app` — point your custom domain `demos.lol` there in Vercel → Domains.

> The `x-vercel-ip-country` header is available automatically on Vercel — country analytics just work in production.

---

## Adding sound effects

The sound effect files are referenced at `/public/sounds/hover.mp3` and `/public/sounds/click.mp3`.

Drop any short MP3 files there with those exact names. Free options:
- [freesound.org](https://freesound.org) — search "ui click" or "hover"
- [mixkit.co/free-sound-effects](https://mixkit.co/free-sound-effects/click/)

---

## Project structure

```
app/
  page.tsx              ← landing page
  auth/login/           ← sign in
  auth/register/        ← sign up + username claim
  dashboard/            ← protected, auth-gated
    page.tsx            ← analytics overview
    customize/          ← profile editor
    links/              ← link + social manager
  [username]/           ← public bio page (demos.lol/yourname)
  api/track-view/       ← analytics endpoint

components/
  ui/                   ← SplashScreen, CursorEffect, AudioPlayer
  profile/              ← ProfileCard, LinkButton, SocialIcons

lib/
  supabase/             ← browser + server clients
  types/                ← TypeScript types + constants
  utils/                ← cn(), trackView()

supabase/migrations/
  001_init.sql          ← full schema, run this in Supabase SQL editor
```

---

## Customization quick reference

| Thing to change | Where |
|---|---|
| Brand name / colors | `app/page.tsx`, `tailwind.config.ts` |
| Default accent color | `supabase/migrations/001_init.sql` → `accent_color default` |
| Badge types | `lib/types/index.ts` → `BADGE_META` |
| Social platform list | `lib/types/index.ts` → `SOCIAL_PLATFORMS` |
| Animated bg logic | `app/[username]/BioPageClient.tsx` → `PageBackground` |
| Sound files | `public/sounds/hover.mp3`, `public/sounds/click.mp3` |

---

## License

MIT — do whatever you want with it.
