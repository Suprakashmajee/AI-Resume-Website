import type { ResumeData } from '../types';

type Props = {
  data: ResumeData;
};

export default function ResumePreview({ data }: Props) {
  const skills = data.skills
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article
      id="resume-preview-sheet"
      className="resume-sheet mx-auto w-full max-w-[794px] origin-top p-8 text-[13px] leading-relaxed text-gray-800 sm:p-10 md:p-12"
    >
      <header className="border-b-2 border-teal-700 pb-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-950">
          {data.fullName || 'Your Name'}
        </h1>
        <p className="mt-1 text-sm font-semibold text-teal-800">
          {data.headline || 'Professional headline'}
        </p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <span>{data.website}</span>}
        </p>
      </header>

      {data.summary && (
        <section className="mt-5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-800">
            Summary
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.some((e) => e.company || e.role || e.bullets) && (
        <section className="mt-5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-800">
            Experience
          </h2>
          <div className="mt-2 space-y-4">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold text-gray-950">
                    {job.role || 'Role'}
                    {job.company ? ` — ${job.company}` : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    {[job.start, job.end].filter(Boolean).join(' – ')}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                </div>
                {job.bullets && (
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-700">
                    {job.bullets
                      .split(/\n+/)
                      .map((b) => b.replace(/^[-•*]\s*/, '').trim())
                      .filter(Boolean)
                      .map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some((e) => e.school || e.degree) && (
        <section className="mt-5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-800">
            Education
          </h2>
          <div className="mt-2 space-y-3">
            {data.education.map((ed) => (
              <div key={ed.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold text-gray-950">
                    {ed.degree || 'Degree'}
                    {ed.school ? ` — ${ed.school}` : ''}
                  </p>
                  <p className="text-xs text-gray-500">{ed.year}</p>
                </div>
                {ed.details && <p className="text-gray-700">{ed.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-800">
            Skills
          </h2>
          <p className="mt-2 text-gray-700">{skills.join(' · ')}</p>
        </section>
      )}
    </article>
  );
}
