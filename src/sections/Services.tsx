import { Brain, Code, Database } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import TechSphere from '../components/TechSphere'

const services = [
  {
    icon: Brain,
    title: 'Machine Learning & AI',
    description:
      'Designing retrieval-augmented generation pipelines, NLP systems and LLM applications, and optimizing inference for production-ready AI.',
    skills: ['Python', 'NLP', 'RAG Systems', 'LLMs', 'Deep Learning']
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'Building scalable web applications end to end — from API design and backend services to polished, responsive frontends.',
    skills: ['React', 'Next.js', 'FastAPI', 'Flask', 'Node.js', 'REST APIs', 'Tailwind CSS']
  },
  {
    icon: Database,
    title: 'Data & DevOps',
    description:
      'Designing databases, containerizing services and managing deployment pipelines for robust, maintainable infrastructure.',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git', 'Linux']
  }
]

const Services = () => {
  return (
    <section id="services" className="section-padding relative border-y border-white/[0.05] bg-ink-900/40">
      <div className="container-custom">
        <div className="mb-14 flex items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="eyebrow slide-in">Expertise</span>
            <h2 className="slide-in mt-5 font-display text-4xl font-bold text-white md:text-5xl">
              What I work with
            </h2>
            <p className="slide-in mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              I specialize in AI/ML systems and full-stack engineering — bringing research ideas into
              practical, working software.
            </p>
          </div>
          <div className="slide-in hidden shrink-0 lg:block lg:-my-16 lg:mr-8">
            <TechSphere />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, skills }, index) => (
            <div key={title} className="slide-in">
              <TiltCard className="beam card-surface card-hover group flex h-full flex-col p-7 md:p-8">
                <div className="depth-2 mb-6 flex items-center justify-between">
                  {/* Icon spins a full turn in 3D when the card is hovered */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand shadow-[0_0_0_0_rgba(122,162,255,0)] transition-[background-color,transform,box-shadow] duration-700 [transform:perspective(300px)_rotateY(0deg)] group-hover:bg-brand/15 group-hover:shadow-[0_0_24px_2px_rgba(122,162,255,0.25)] group-hover:[transform:perspective(300px)_rotateY(360deg)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-zinc-600 transition-colors duration-300 group-hover:text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="depth-1 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                  {description}
                </p>

                <div className="depth-1 mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
                  {skills.map((skill, i) => (
                    <span key={skill} className="chip chip-wave" style={{ '--i': i } as React.CSSProperties}>
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
