export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  year: string;
  details: string;
};

export type ResumeData = {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string;
  experience: ExperienceItem[];
  education: EducationItem[];
};

export const emptyExperience = (): ExperienceItem => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  location: '',
  start: '',
  end: '',
  bullets: '',
});

export const emptyEducation = (): EducationItem => ({
  id: crypto.randomUUID(),
  school: '',
  degree: '',
  year: '',
  details: '',
});

export const sampleResume = (): ResumeData => ({
  fullName: 'Suprakash Majee',
  headline: 'Full-Stack Developer · Product Builder',
  email: 'hello@airesumedraft.com',
  phone: '+91 95643 27643',
  location: 'Bengaluru, India',
  website: 'https://airesumedraft.com',
  summary:
    'Product-minded developer who ships useful web tools for job seekers. Experienced building client-side generators, PDF workflows, and AI-assisted editing experiences.',
  skills: 'React, TypeScript, Vite, Tailwind CSS, Node.js, Gemini API, PDF generation, Hostinger deployment',
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'Airesumedraft',
      role: 'Founder & Developer',
      location: 'Bengaluru',
      start: '2024',
      end: 'Present',
      bullets:
        'Built Airesumedraft resume builder with live preview and instant PDF export.\nIntegrated Google AdSense and Hostinger static deploy for airesumedraft.com.',
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: 'Your University',
      degree: 'B.Tech / Equivalent',
      year: '2018',
      details: 'Computer Science',
    },
  ],
});
