export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--accent)]">About</p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          One clear job: help you ship a better resume PDF.
        </h2>
        <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[var(--ink-soft)]">
          Airesumedraft AI Resume keeps editing on your device, previews as you type, and exports a
          print-ready PDF. Optional Gemini rewriting improves summaries and bullets when you add an API key.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Live preview',
              body: 'See the exact resume layout update as you fill each field — no guesswork before download.',
            },
            {
              title: 'AI assist (optional)',
              body: 'Rewrite your summary or experience bullets with Gemini when GEMINI_API_KEY is configured.',
            },
            {
              title: 'Hostinger deploy',
              body: 'Build a static site and upload hostinger_upload.zip to airesumedraft.com on Hostinger.',
            },
          ].map((item) => (
            <article key={item.title} className="border-t-2 border-[var(--accent)] pt-4">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
