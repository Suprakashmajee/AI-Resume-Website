# Airesumedraft AI Resume

AI-assisted resume builder for **[airesumedraft.com](https://airesumedraft.com)** — live preview, optional Gemini polish, PDF download, Hostinger zip deploy, and Google AdSense.

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
| `VITE_ADSENSE_CLIENT_ID` | Google AdSense publisher ID (default `ca-pub-9146006984034713`) |
| `VITE_ADSENSE_SLOT_TOP` | Top banner ad unit slot |
| `VITE_ADSENSE_SLOT_SIDEBAR` | Sidebar ad unit slot |
| `VITE_APP_URL` | Canonical site URL (`https://airesumedraft.com`) |

## Deploy to airesumedraft.com (Hostinger)

Your domain is already hosted on Hostinger. Replace files:

```bash
npm run deploy:prepare
```

1. hPanel → **airesumedraft.com** → File Manager → `public_html`  
2. Clear old site files  
3. Upload & extract `hostinger_upload.zip`  
4. Visit https://airesumedraft.com  

Full steps: see [DEPLOY.md](./DEPLOY.md).

## Google AdSense

Publisher ID **`ca-pub-9146006984034713`** is wired in `index.html` and `src/adsense.ts`.

1. Verify site `airesumedraft.com` in AdSense  
2. (Optional) Create Display ad units and set slot IDs:

```bash
VITE_ADSENSE_SLOT_TOP=1234567890
VITE_ADSENSE_SLOT_SIDEBAR=0987654321
npm run deploy:prepare
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | TypeScript check |
| `npm run zip:hostinger` | Zip `dist/` for Hostinger |
| `npm run deploy:prepare` | Build + zip |
