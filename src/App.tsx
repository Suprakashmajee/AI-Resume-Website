import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResumeBuilder from './components/ResumeBuilder';
import About from './components/About';
import Footer from './components/Footer';
import AdSenseBanner from './components/AdSenseBanner';
import { ADSENSE_CLIENT_ID, ADSENSE_SLOT_TOP } from './adsense';

export default function App() {
  const [adsReady, setAdsReady] = useState(false);

  useEffect(() => {
    const client = ADSENSE_CLIENT_ID;
    if (!client.startsWith('ca-pub-')) {
      return;
    }

    (window as unknown as { __ADSENSE_CLIENT__?: string }).__ADSENSE_CLIENT__ = client;

    const existing = document.querySelector(`script[data-adsense="${client}"]`);
    if (existing) {
      setAdsReady(true);
      return;
    }

    // Prefer the static head tag if present (index.html), else inject.
    const headScript = document.querySelector(
      `script[src*="adsbygoogle.js"][src*="${client}"]`,
    );
    if (headScript) {
      setAdsReady(true);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.crossOrigin = 'anonymous';
    script.dataset.adsense = client;
    script.onload = () => setAdsReady(true);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen text-[var(--ink)] antialiased">
      <Navbar />
      <main>
        <Hero />
        <div className="no-print mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <AdSenseBanner ready={adsReady} slot={ADSENSE_SLOT_TOP} placement="top" />
        </div>
        <ResumeBuilder adsReady={adsReady} />
        <About />
      </main>
      <Footer />
    </div>
  );
}
