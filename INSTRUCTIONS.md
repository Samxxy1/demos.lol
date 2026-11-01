# demos.lol — deploy guide
## free forever. no card. no terminal. browser only.

---

## BEFORE YOU START — create 3 free accounts

1. **github.com** — sign up free
2. **supabase.com** — sign up free
3. **vercel.com** — sign up free (use your GitHub account)

---

## STEP 1 — Upload to GitHub (2 min)

1. Go to **github.com** → click the **+** top right → **New repository**
2. Name it `demos-lol`
3. Set to **Public**
4. Click **Create repository**
5. On the next screen click **"uploading an existing file"**
6. Open the `demos-lol` folder from this zip
7. Select ALL files inside it (Ctrl+A / Cmd+A) and drag them into the GitHub page
8. Scroll down → click **Commit changes**

> ⚠️ drag the FILES inside the folder — not the folder itself

---

## STEP 2 — Set up Supabase database (3 min)

1. Go to **supabase.com** → **New project**
2. Pick any name (e.g. `demos-lol`), pick your region, set a password
3. Wait ~2 minutes for it to spin up
4. In your project dashboard → click **SQL Editor** (left sidebar)
5. Click **New query**
6. Open the file `supabase/migrations/001_init.sql` from this zip in Notepad
7. Select all the text (Ctrl+A) → copy it → paste it into the Supabase SQL editor
8. Click **Run**
9. You should see "Success. No rows returned"

**Now grab your keys:**
10. Click **Settings** (left sidebar) → **API**
11. Copy and save these 3 values somewhere (Notepad is fine):
    - **Project URL** → looks like `https://abcdefgh.supabase.co`
    - **anon / public key** → long string starting with `eyJ...`
    - **service_role / secret key** → another long string, keep this private

---

## STEP 3 — Deploy on Vercel (3 min)

1. Go to **vercel.com** → Sign up with GitHub (one click)
2. Click **Add New** → **Project**
3. Find your `demos-lol` repo → click **Import**
4. BEFORE clicking Deploy — find the **Environment Variables** section
5. Add these 4 variables one by one:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key |
| `NEXT_PUBLIC_APP_URL` | `https://demos-lol.vercel.app` |

6. Click **Deploy**
7. Wait ~2 minutes
8. Vercel gives you a live link like `demos-lol.vercel.app`

> That's it. Your site is live. Anyone can go to it, sign up with email,
> claim their username, and get their own page at demos-lol.vercel.app/theirname

---

## STEP 4 — Add sound effects (optional, 2 min)

The hover and click sounds need two MP3 files:

1. Go to **mixkit.co/free-sound-effects/click** — download any two short sounds
2. Rename them `hover.mp3` and `click.mp3`
3. In your GitHub repo → navigate to `public/sounds/`
4. Click **Add file** → **Upload files** → upload both
5. Vercel auto-redeploys in ~1 minute

---

## STEP 5 — Custom domain (optional, ~$10/yr)

Want `demos.lol` instead of `demos-lol.vercel.app`?

1. Buy the domain at **namecheap.com** or **cloudflare.com/products/registrar**
2. In Vercel → your project → **Settings** → **Domains**
3. Add your domain → follow the DNS instructions Vercel shows
4. SSL certificate issues automatically in ~5 minutes

---

## FAQ

**Q: How do people sign up?**
They go to your Vercel URL → click "Get started" → enter email + pick a username → done.
Their bio page is instantly live at yoursite.vercel.app/theirusername

**Q: Is this really free forever?**
Yes. Vercel Hobby = free forever. Supabase Free = free forever.
You'd only need to pay if you hit 100GB bandwidth/month (Vercel) or 500MB database (Supabase)
— that's tens of thousands of active users before you hit either limit.

**Q: Supabase says my project is paused?**
Free Supabase projects pause after 1 week of no traffic.
Click "Restore" in the dashboard — takes 30 seconds.
Once people are actively using your site it won't pause again.
The keepalive cron in the code pings it every 3 days automatically once deployed.

**Q: How do I see who signed up?**
Supabase dashboard → Table Editor → profiles table. All users are there.

**Q: Can I change the site name from demos.lol?**
Yes — search for "demos.lol" and "demos" across the files and replace with your brand name.
Main places: `app/layout.tsx`, `app/page.tsx`, `app/dashboard/layout.tsx`

---

## File map

```
demos-lol/
├── app/
│   ├── page.tsx                 ← landing page (edit this to rebrand)
│   ├── auth/login/              ← login page
│   ├── auth/register/           ← signup page
│   ├── dashboard/               ← user dashboard (customize, links, analytics)
│   └── [username]/              ← public bio page at /theirname
├── components/                  ← UI building blocks
├── lib/                         ← Supabase clients, types, utilities
├── public/sounds/               ← drop hover.mp3 + click.mp3 here
├── supabase/migrations/
│   └── 001_init.sql             ← paste this into Supabase SQL editor
├── vercel.json                  ← keepalive cron config
├── .env.local.example           ← copy to .env.local if running locally
└── package.json                 ← dependencies
```

---

built with Next.js 14 · Tailwind CSS · Framer Motion · Supabase · Vercel
