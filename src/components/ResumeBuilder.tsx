import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Download,
  Loader2,
  Plus,
  Trash2,
  Wand2,
  RotateCcw,
} from 'lucide-react';
import AdSenseBanner from './AdSenseBanner';
import ResumePreview from './ResumePreview';
import {
  emptyEducation,
  emptyExperience,
  sampleResume,
  type EducationItem,
  type ExperienceItem,
  type ResumeData,
} from '../types';
import { polishText } from '../utils/aiPolish';

const STORAGE_KEY = 'digishops_resume_v1';

type Props = {
  adsReady: boolean;
};

export default function ResumeBuilder({ adsReady }: Props) {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ResumeData;
    } catch {
      /* ignore */
    }
    return sampleResume();
  });
  const [busy, setBusy] = useState<'pdf' | 'summary' | string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  };

  const setField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateExperience = (id: string, patch: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const updateEducation = (id: string, patch: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const downloadPdf = async () => {
    const target = document.getElementById('resume-preview-sheet');
    if (!target) return;
    setBusy('pdf');
    try {
      let html2canvasFn = html2canvas;
      if ((html2canvasFn as unknown as { default?: typeof html2canvas }).default) {
        html2canvasFn = (html2canvasFn as unknown as { default: typeof html2canvas }).default;
      }

      const canvas = await html2canvasFn(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      const x = (pageWidth - w) / 2;
      pdf.addImage(img, 'PNG', x, 24, w, h);
      const filename = `${(data.fullName || 'resume').replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(filename);
      showToast('PDF downloaded');
    } catch (err) {
      console.error(err);
      showToast('PDF export failed — try again');
    } finally {
      setBusy(null);
    }
  };

  const polishSummary = async () => {
    setBusy('summary');
    try {
      const next = await polishText('summary', data.summary);
      setField('summary', next);
      showToast('Summary polished');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Polish failed');
    } finally {
      setBusy(null);
    }
  };

  const polishBullets = async (job: ExperienceItem) => {
    setBusy(job.id);
    try {
      const next = await polishText('bullets', job.bullets);
      updateExperience(job.id, { bullets: next });
      showToast('Bullets polished');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Polish failed');
    } finally {
      setBusy(null);
    }
  };

  const fieldClass =
    'mt-1.5 w-full rounded-xl border border-[var(--line)] bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)]';
  const labelClass = 'text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]';

  return (
    <section id="builder" className="scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--accent)]">
              Builder
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Edit once. Preview live. Download PDF.
            </h2>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setData(sampleResume());
                showToast('Sample resume loaded');
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--line)] bg-white/70 px-4 py-2.5 text-sm font-bold"
            >
              <RotateCcw className="h-4 w-4" /> Sample
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={busy === 'pdf'}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--paper)] transition hover:bg-[var(--accent)] disabled:opacity-60"
            >
              {busy === 'pdf' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download PDF
            </button>
          </div>
        </div>

        {toast && (
          <div className="no-print mb-4 rounded-xl border border-[var(--accent)]/30 bg-[rgba(20,184,166,0.12)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
            {toast}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="no-print space-y-6">
            <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-sm backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold">Contact</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ['fullName', 'Full name'],
                    ['headline', 'Headline'],
                    ['email', 'Email'],
                    ['phone', 'Phone'],
                    ['location', 'Location'],
                    ['website', 'Website'],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="block">
                    <span className={labelClass}>{label}</span>
                    <input
                      className={fieldClass}
                      value={data[key]}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold">Summary</h3>
                <button
                  type="button"
                  onClick={polishSummary}
                  disabled={busy === 'summary'}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-bold text-[var(--accent)]"
                >
                  {busy === 'summary' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
                  AI polish
                </button>
              </div>
              <textarea
                rows={5}
                className={fieldClass}
                value={data.summary}
                onChange={(e) => setField('summary', e.target.value)}
              />
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Experience</h3>
                <button
                  type="button"
                  onClick={() => setField('experience', [...data.experience, emptyExperience()])}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[var(--accent)]"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="mt-4 space-y-5">
                {data.experience.map((job, index) => (
                  <div key={job.id} className="rounded-xl border border-[var(--line)] bg-white/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Role {index + 1}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => polishBullets(job)}
                          disabled={busy === job.id}
                          className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[var(--accent)]"
                        >
                          {busy === job.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
                          Polish bullets
                        </button>
                        {data.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setField(
                                'experience',
                                data.experience.filter((item) => item.id !== job.id),
                              )
                            }
                            className="cursor-pointer text-red-600"
                            aria-label="Remove experience"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>Role</span>
                        <input className={fieldClass} value={job.role} onChange={(e) => updateExperience(job.id, { role: e.target.value })} />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Company</span>
                        <input className={fieldClass} value={job.company} onChange={(e) => updateExperience(job.id, { company: e.target.value })} />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Location</span>
                        <input className={fieldClass} value={job.location} onChange={(e) => updateExperience(job.id, { location: e.target.value })} />
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="block">
                          <span className={labelClass}>Start</span>
                          <input className={fieldClass} value={job.start} onChange={(e) => updateExperience(job.id, { start: e.target.value })} />
                        </label>
                        <label className="block">
                          <span className={labelClass}>End</span>
                          <input className={fieldClass} value={job.end} onChange={(e) => updateExperience(job.id, { end: e.target.value })} />
                        </label>
                      </div>
                    </div>
                    <label className="mt-3 block">
                      <span className={labelClass}>Bullets (one per line)</span>
                      <textarea
                        rows={4}
                        className={fieldClass}
                        value={job.bullets}
                        onChange={(e) => updateExperience(job.id, { bullets: e.target.value })}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Education</h3>
                <button
                  type="button"
                  onClick={() => setField('education', [...data.education, emptyEducation()])}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[var(--accent)]"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {data.education.map((ed) => (
                  <div key={ed.id} className="rounded-xl border border-[var(--line)] bg-white/70 p-4">
                    <div className="mb-2 flex justify-end">
                      {data.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setField(
                              'education',
                              data.education.filter((item) => item.id !== ed.id),
                            )
                          }
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>School</span>
                        <input className={fieldClass} value={ed.school} onChange={(e) => updateEducation(ed.id, { school: e.target.value })} />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Degree</span>
                        <input className={fieldClass} value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })} />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Year</span>
                        <input className={fieldClass} value={ed.year} onChange={(e) => updateEducation(ed.id, { year: e.target.value })} />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Details</span>
                        <input className={fieldClass} value={ed.details} onChange={(e) => updateEducation(ed.id, { details: e.target.value })} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-sm backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold">Skills</h3>
              <textarea
                rows={3}
                className={fieldClass}
                placeholder="Comma-separated skills"
                value={data.skills}
                onChange={(e) => setField('skills', e.target.value)}
              />
            </div>

            <AdSenseBanner
              ready={adsReady}
              slot={import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR}
              placement="sidebar"
            />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="no-print mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              Live preview
            </p>
            <div className="overflow-auto rounded-2xl border border-[var(--line)] bg-[rgba(20,33,43,0.04)] p-3 sm:p-5">
              <ResumePreview data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
