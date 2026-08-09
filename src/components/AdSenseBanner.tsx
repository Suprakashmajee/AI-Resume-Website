import { useEffect, useRef } from 'react';

type AdSenseBannerProps = {
  ready: boolean;
  slot?: string;
  placement: 'top' | 'sidebar';
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Renders a real AdSense unit when VITE_ADSENSE_CLIENT_ID (+ slot) are set.
 * Otherwise shows a labeled placeholder so layout is ready before approval.
 */
export default function AdSenseBanner({ ready, slot, placement }: AdSenseBannerProps) {
  const pushed = useRef(false);
  const client = (import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined)?.trim();
  const hasConfig = Boolean(client?.startsWith('ca-pub-') && slot);

  useEffect(() => {
    if (!ready || !hasConfig || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blockers / unapproved accounts may throw — ignore in UI
    }
  }, [ready, hasConfig]);

  if (!hasConfig) {
    return (
      <div
        className="no-print flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-white/50 px-4 text-center text-xs font-semibold text-[var(--ink-soft)]"
        aria-label="AdSense placeholder"
      >
        Google AdSense slot ({placement}) — add VITE_ADSENSE_CLIENT_ID and slot in .env after approval
      </div>
    );
  }

  return (
    <div className={`no-print adsense-${placement}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
