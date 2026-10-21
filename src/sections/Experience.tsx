import { Briefcase, MapPin } from 'lucide-react'
import TiltCard from '../components/TiltCard'

const work = {
  role: 'AI & Software Engineering Intern',
  organization: 'Defence Electronics Applications Laboratory (DEAL), DRDO',
  period: 'May 2026 – Jun 2026',
  location: 'Dehradun, Uttarakhand',
  points: [
    'Developed DAPS (Defence Acquisition & Procurement System), an AI-powered platform for information retrieval over defence procurement documents.',
    'Built the retrieval pipeline combining BM25 search with Large Language Models for retrieval-augmented answers.',
    'Implemented the FastAPI backend and React frontend for the platform.'
  ],
  stack: ['Python', 'FastAPI', 'React', 'BM25', 'LLMs', 'RAG']
}

const leadership = [
  { role: 'Management Lead', organization: 'Linux Club, VIT Chennai', period: 'Jul 2024 – Mar 2026' },
  { role: 'Discipline Lead', organization: 'Haryana Hood, VIT Chennai', period: 'Apr 2025 – Mar 2026' },
  { role: 'Cadet', organization: 'National Cadet Corps', period: 'Aug 2024 – Mar 2026' },
  { role: 'Core Member — Vocalist', organization: 'Music Club, VIT Chennai', period: 'Sep 2024 – Mar 2026' }
]

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative border-y border-white/[0.05] bg-ink-900/40">
      <div className="container-custom">
        <div className="mb-14 max-w-2xl">
          <span className="eyebrow slide-in">Experience</span>
          <h2 className="slide-in mt-5 font-display text-4xl font-bold text-white md:text-5xl">
            Where I&apos;ve worked
          </h2>
        </div>

        {/* Professional experience */}
        <article className="card-surface slide-in relative overflow-hidden p-7 md:p-10">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand to-brand/0" />
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand sm:flex">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {work.role}
                </h3>
                <p className="mt-1 text-zinc-300">{work.organization}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {work.location}
                </p>
              </div>
            </div>
            <span className="self-start rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 font-mono text-xs text-zinc-400">
              {work.period}
            </span>
          </div>

          <ul className="mt-7 space-y-3 sm:pl-16">
            {work.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-zinc-400">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2 sm:pl-16">
            {work.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* Leadership */}
        <h3 className="slide-in mt-16 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          Leadership & Activities
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {leadership.map((item) => (
            <div key={item.role + item.organization} className="slide-in">
              <TiltCard maxTilt={6} className="card-surface card-hover flex h-full flex-col gap-1 p-6">
                <div className="depth-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h4 className="font-display text-lg font-semibold text-white">{item.role}</h4>
                  <span className="shrink-0 font-mono text-[11px] text-zinc-500 sm:pt-1">
                    {item.period}
                  </span>
                </div>
                <p className="depth-1 text-sm text-zinc-400">{item.organization}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
