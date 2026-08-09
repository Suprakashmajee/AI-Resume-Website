import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send, FileText } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
      setMessage('');
      window.setTimeout(() => setSuccess(false), 2800);
    }, 900);
  };

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <FileText className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-bold">
                DigiShops <span className="text-[var(--accent-bright)]">Resume</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              AI-assisted resume builder for digishops.in — live preview, PDF export, and AdSense-ready
              layout for monetization after Google approval.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:suprakashmajee1996@gmail.com" className="flex items-center gap-2.5 text-white/80 hover:text-[var(--accent-bright)]">
                <Mail className="h-4 w-4" /> suprakashmajee1996@gmail.com
              </a>
              <a href="tel:9564327643" className="flex items-center gap-2.5 text-white/80 hover:text-[var(--accent-bright)]">
                <Phone className="h-4 w-4" /> +91 95643 27643
              </a>
              <p className="flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4" /> Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-7">
            <h3 className="font-display text-lg font-bold">Contact</h3>
            <p className="mt-1 text-sm text-white/65">Questions about deploy, domain, or AdSense? Send a note.</p>
            {success && (
              <p className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Message queued locally — email us to follow up.
              </p>
            )}
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-10 w-full rounded-xl border border-white/15 bg-[var(--ink)] px-3 text-sm text-white outline-none focus:border-[var(--accent-bright)]"
              />
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-white/15 bg-[var(--ink)] p-3 text-sm text-white outline-none focus:border-[var(--accent-bright)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:bg-[var(--accent-bright)] disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5" />
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DigiShops · digishops.in</p>
          <p>AdSense-ready · Hostinger static deploy</p>
        </div>
      </div>
    </footer>
  );
}
