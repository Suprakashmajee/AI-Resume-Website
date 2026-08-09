# Airesumedraft.com — Deploy checklist (Hostinger)

Your domain **https://airesumedraft.com** is already on Hostinger. You only need to replace the site files with this app’s build.

## 1) Build the upload package

```bash
npm install
npm run deploy:prepare
```

Creates `hostinger_upload.zip` from the production `dist/` folder.

## 2) Upload in Hostinger

1. Login: https://hpanel.hostinger.com  
2. **Websites** → **airesumedraft.com** → **File Manager**  
3. Open `public_html`  
4. Delete (or backup) old files (`index.html`, old assets, etc.)  
5. Upload `hostinger_upload.zip`  
6. Extract the zip **inside** `public_html`  
7. Confirm you see `public_html/index.html` (title: Airesumedraft AI Resume)  
8. Delete the zip after extract (optional)

## 3) Verify

Open https://airesumedraft.com — you should see **Airesumedraft AI Resume** with the builder and your AdSense script (`ca-pub-9146006984034713`).

If you still see the old site, hard-refresh (`Ctrl+Shift+R`) or clear Hostinger/CDN cache in hPanel.

## 4) DNS (only if domain stops resolving)

Domain already points to Hostinger. If it ever breaks:

| Type | Name | Value |
|---|---|---|
| A | @ | Hostinger IPv4 from hPanel |
| CNAME | www | airesumedraft.com |

## 5) AdSense

1. In Google AdSense → Sites, add/verify **airesumedraft.com** (not digishops.in)  
2. Publisher script is already in `index.html`: `ca-pub-9146006984034713`  
3. Optional fixed banners: set `VITE_ADSENSE_SLOT_*` and rebuild
