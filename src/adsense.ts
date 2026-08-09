/** Public AdSense publisher ID (safe to commit — appears in page HTML). */
export const ADSENSE_CLIENT_ID =
  (import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined)?.trim() ||
  'ca-pub-9146006984034713';

export const ADSENSE_SLOT_TOP = (import.meta.env.VITE_ADSENSE_SLOT_TOP as string | undefined)?.trim() || '';
export const ADSENSE_SLOT_SIDEBAR =
  (import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR as string | undefined)?.trim() || '';
