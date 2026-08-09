import { ArrowRight, Sparkles, Download, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-20 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[rgba(20,184,166,0.2)] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-[rgba(194,65,12,0.12)] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            DigiShops · AI Resume
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl"
          >
            DigiShops
            <span className="mt-2 block text-[var(--accent)]">Build a resume that gets read.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[var(--ink-soft)] sm:text-lg"
          >
            Fill in your details, polish bullets with AI, preview live, and download a clean PDF —
            ready for Hostinger on digishops.in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={scrollToBuilder}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-7 py-3.5 text-sm font-bold text-[var(--paper)] transition hover:bg-[var(--accent)]"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold text-[var(--ink-soft)] transition hover:text-[var(--accent)]"
            >
              How it works
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="resume-sheet rotate-1 rounded-sm p-8 md:p-10">
            <div className="border-b border-gray-200 pb-4">
              <p className="font-display text-2xl font-bold text-gray-900">Your Name</p>
              <p className="mt-1 text-sm font-semibold text-teal-700">Role · City · email@domain.com</p>
            </div>
            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gray-500">Summary</p>
              <p className="leading-relaxed">
                A sharp professional summary appears here after you type — or let AI tighten your wording.
              </p>
              <p className="pt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gray-500">Experience</p>
              <p className="font-semibold text-gray-900">Product Builder — DigiShops</p>
              <ul className="list-disc space-y-1 pl-5 text-gray-600">
                <li>Shipped tools people actually use</li>
                <li>PDF export, live preview, clean layouts</li>
              </ul>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 flex gap-2 no-print">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-md">
              <Wand2 className="h-3.5 w-3.5 text-[var(--accent)]" /> AI polish
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
              <Download className="h-3.5 w-3.5" /> PDF ready
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
