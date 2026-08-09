# DigiShops AI Resume

AI-assisted resume builder for **[digishops.in](https://digishops.in)** — live preview, optional Gemini polish, PDF download, Hostinger zip deploy, and Google AdSense hooks.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment variables

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Optional. Enables real AI rewrite for summary/bullets |
| `VITE_ADSENSE_CLIENT_ID` | Google AdSense publisher ID (`ca-pub-…`) |
| `VITE_ADSENSE_SLOT_TOP` | Top banner ad unit slot |
| `VITE_ADSENSE_SLOT_SIDEBAR` | Sidebar ad unit slot |
| `VITE_APP_URL` | Canonical site URL (`https://digishops.in`) |

## Build & Hostinger upload

```bash
npm run deploy:prepare
```

This creates `hostinger_upload.zip` from the production `dist/` folder.

1. Log in to Hostinger → **Websites** → your site → **File Manager**
2. Open `public_html` (empty it if it still shows a default/parking page)
3. Upload `hostinger_upload.zip` and extract it so `index.html` is inside `public_html`
4. Visit your domain

## Connect digishops.in

Your domain currently shows a **GoDaddy parking lander** and uses **Cloudflare** nameservers.

### Option A — Host on Hostinger (recommended if you already use Hostinger like Bill Store)

1. In Hostinger, add/attach domain `digishops.in`
2. In Cloudflare DNS for digishops.in, set:
   - `A` record `@` → Hostinger shared IP (from Hostinger panel)
   - `CNAME` `www` → `@` or Hostinger hostname
3. Turn **Proxy** off temporarily while verifying, or keep Proxied after SSL works
4. In Hostinger SSL, enable free SSL

### Option B — Keep Cloudflare Pages / other static host

Point Cloudflare to your static host per their docs; upload the same `dist/` contents.

## Google AdSense

1. Create/approve account at [Google AdSense](https://www.google.com/adsense/)
2. Add site `digishops.in` and wait for approval
3. Create Display ad units; copy **publisher ID** and **slot IDs**
4. Put them in `.env.local` / Hostinger build env, then rebuild:

```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx
VITE_ADSENSE_SLOT_TOP=1234567890
VITE_ADSENSE_SLOT_SIDEBAR=0987654321
npm run deploy:prepare
```

Until IDs are set, the site shows labeled ad placeholders (layout ready).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | TypeScript check |
| `npm run zip:hostinger` | Zip `dist/` for Hostinger |
| `npm run deploy:prepare` | Build + zip |

## Note about the original empty repo

This repository previously contained only a README. The resume app was scaffolded here so you can review, deploy to digishops.in, and wire AdSense. If you have a different AI Studio export, replace these files with yours and keep the AdSense + deploy helpers.
