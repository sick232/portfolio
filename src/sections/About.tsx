import { GraduationCap, Briefcase, Trophy, FileText, MapPin, Download } from 'lucide-react'
import { profile } from '../data/profile'

const facts = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: Briefcase, label: 'Latest role', value: 'AI & SWE Intern, DEAL–DRDO' },
  { icon: Trophy, label: 'Beyond code', value: 'Competitive chess, fitness, geopolitics' }
]

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Story */}
          <div>
            <span className="eyebrow slide-in">About</span>
            <h2 className="slide-in mt-5 font-display text-4xl font-bold text-white md:text-5xl">
              Building intelligent systems
              <span className="text-zinc-500"> that solve real problems.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              <p className="slide-in">
                I&apos;m a B.Tech Computer Science student specializing in{' '}
                <span className="text-zinc-200">AI & Robotics</span> at VIT Chennai. I enjoy building
                AI-powered applications that solve real-world problems using Machine Learning,
                Retrieval-Augmented Generation (RAG), and full-stack development.
              </p>
              <p className="slide-in">
                Most recently I completed an AI & Software Engineering internship at{' '}
                <span className="text-zinc-200">DEAL–DRDO</span>, where I developed DAPS (Defence
                Acquisition & Procurement System) — an AI-based information retrieval platform for
                defence procurement documents.
              </p>
              <p className="slide-in">
                When I&apos;m not coding, you&apos;ll find me playing competitive chess, training, reading
                non-fiction, or exploring geopolitics.
              </p>
            </div>

            <div className="slide-in mt-10 flex flex-wrap gap-3">
              <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-primary group">
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileText className="h-4 w-4" />
                View Resume
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 lg:pt-14">
            <div className="card-surface slide-in p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    Education
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    B.Tech, Computer Science & Engineering
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Specialization in AI & Robotics
                  </p>
                  <p className="text-sm text-zinc-400">
                    Vellore Institute of Technology, Chennai
                  </p>
                  <p className="mt-3 inline-flex rounded-full bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-400">
                    2023 – 2027 (expected)
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface slide-in divide-y divide-white/[0.06]">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4 md:px-7">
                  <Icon className="h-4 w-4 shrink-0 text-zinc-500" />
                  <span className="w-28 shrink-0 text-sm text-zinc-500">{label}</span>
                  <span className="text-sm text-zinc-200">{value}</span>
                </div>
              ))}
            </div>

            <div className="slide-in grid grid-cols-2 gap-4">
              <div className="card-surface p-6">
                <p className="font-display text-3xl font-bold text-white">13+</p>
                <p className="mt-1 text-sm text-zinc-500">Projects built</p>
              </div>
              <div className="card-surface p-6">
                <p className="font-display text-3xl font-bold text-white">10+</p>
                <p className="mt-1 text-sm text-zinc-500">Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
