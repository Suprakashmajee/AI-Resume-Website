# DigiShops.in — Deploy checklist

## 1) Build the upload package

```bash
npm install
npm run deploy:prepare
```

Upload `hostinger_upload.zip` into Hostinger `public_html` and extract.

## 2) DNS (Cloudflare → Hostinger)

Current status: digishops.in resolves via Cloudflare to a GoDaddy **parking** page.

After Hostinger hosting is ready:

| Type | Name | Value |
|---|---|---|
| A | @ | Hostinger IPv4 from hPanel |
| CNAME | www | digishops.in (or Hostinger target) |

Wait for DNS propagation, then confirm https://digishops.in loads DigiShops Resume (not `/lander`).

## 3) AdSense

Publisher script is already included:

`ca-pub-9146006984034713`

1. Verify site `https://digishops.in` in AdSense
2. Optional: add display unit slot IDs via `VITE_ADSENSE_SLOT_*` and rebuild
3. Ads stay outside the printable resume sheet (`.no-print`)

## 4) Optional Gemini AI

Set `GEMINI_API_KEY` for production AI polish. Without it, local heuristic polish still works.
