import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,243,234,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--ink)] text-[var(--accent-bright)] shadow-md">
            <FileText className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            DigiShops <span className="text-[var(--accent)]">Resume</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {[
            ['hero', 'Home'],
            ['builder', 'Builder'],
            ['about', 'About'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="cursor-pointer text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--accent)]"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo('builder')}
            className="cursor-pointer rounded-xl bg-[var(--ink)] px-4 py-2 text-sm font-bold text-[var(--paper)] transition hover:bg-[var(--accent)]"
          >
            Build Resume
          </button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[var(--ink-soft)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="space-y-2 border-t border-[var(--line)] bg-[var(--paper)] px-4 py-4 md:hidden">
          {['hero', 'builder', 'about', 'contact'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="block w-full cursor-pointer py-2 text-left font-semibold capitalize"
            >
              {id === 'hero' ? 'Home' : id}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
