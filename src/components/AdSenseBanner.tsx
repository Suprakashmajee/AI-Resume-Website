import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from '../adsense';

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
 * Renders a real AdSense unit when a slot ID is configured.
 * Publisher script (ca-pub-…) loads site-wide for Auto ads even without slots.
 */
export default function AdSenseBanner({ ready, slot, placement }: AdSenseBannerProps) {
  const pushed = useRef(false);
  const client = ADSENSE_CLIENT_ID;
  const hasSlot = Boolean(slot?.trim());

  useEffect(() => {
    if (!ready || !hasSlot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blockers / unapproved accounts may throw — ignore in UI
    }
  }, [ready, hasSlot]);

  if (!hasSlot) {
    return (
      <div
        className="no-print flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-white/50 px-4 text-center text-xs font-semibold text-[var(--ink-soft)]"
        aria-label="AdSense placeholder"
      >
        Google AdSense ({placement}) — Auto ads enabled for {client}. Add a display ad unit slot
        ID to show a fixed banner here.
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
