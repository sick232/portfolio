import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// dist path: 'gsap/Flip' hits a type-file casing clash (types/flip.d.ts) on case-insensitive file systems
import { Flip } from 'gsap/dist/Flip'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { profile } from '../data/profile'
import TiltCard from '../components/TiltCard'

gsap.registerPlugin(Flip)

type Kind = 'ai' | 'web' | 'hardware'
type Filter = 'all' | Kind

interface Project {
  title: string
  category: string
  year: string
  image: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  kinds?: Kind[]
}

const featured: Project = {
  title: 'DAPS — Defence Acquisition & Procurement System',
  category: 'AI / RAG',
  year: '2026',
  image: '/projects/daps.webp',
  description:
    'AI-powered platform built at DEAL–DRDO for intelligent retrieval over defence procurement documents. Combines BM25 search with LLM-based retrieval-augmented generation behind a FastAPI backend and React frontend.',
  tags: ['RAG', 'BM25', 'LLMs', 'FastAPI', 'React'],
  githubUrl: 'https://github.com/sick232/DAPS'
}

const projects: Project[] = [
  {
    title: 'Up-2-Date',
    category: 'AI / Full-Stack',
    year: '2026',
    image: '/projects/up2date.webp',
    description:
      'AI-powered news concierge with a zero-algorithm feed, real-time scraping, and personalized daily briefs.',
    tags: ['LLMs', 'Scraping', 'Full-Stack'],
    githubUrl: 'https://github.com/sick232/Up-2-Date',
    liveUrl: 'https://up-2-date-phi.vercel.app/',
    kinds: ['ai', 'web']
  },
  {
    title: 'MedVision AI',
    category: 'Healthcare AI',
    year: '2025',
    image: '/projects/medvision.webp',
    description: 'Multilingual RAG system for surgical navigation with 3D visualization.',
    tags: ['RAG', 'Multilingual', '3D'],
    githubUrl: 'https://github.com/sick232/MedVision-AI',
    kinds: ['ai']
  },
  {
    title: 'PDF Intelligence Suite',
    category: 'NLP / AI',
    year: '2025',
    image: '/projects/pdf-intelligence.webp',
    description:
      'NLP data-processing pipeline with vector embeddings for PDF summarization. Built for Adobe India Hackathon 2025.',
    tags: ['NLP', 'Embeddings', 'Python'],
    githubUrl: 'https://github.com/sick232/Adobe-India-Hacathon-Connecting-the-dots-2025-Round-1B-main',
    kinds: ['ai']
  },
  {
    title: 'Eco-Reserve Planner',
    category: 'Web Platform',
    year: '2025',
    image: '/projects/eco-reserve.webp',
    description: 'Vegetation intelligence platform using Flask and spatial algorithms.',
    tags: ['Flask', 'Geospatial', 'Python'],
    githubUrl: 'https://github.com/sick232/EcoReserve-Planner',
    kinds: ['web']
  },
  {
    title: 'Smart Blind Stick',
    category: 'IoT / Assistive Tech',
    year: '2024',
    image: '/projects/smart-blind-stick.webp',
    description: 'IoT device with ultrasonic sensors that helps visually impaired users navigate safely.',
    tags: ['IoT', 'Embedded', 'Ultrasonic Sensors'],
    githubUrl: 'https://github.com/sick232/Smart-Blind-Stick',
    kinds: ['hardware']
  }
]

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex items-center gap-2">
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
    >
      <Github className="h-3.5 w-3.5" />
      Code
    </a>
    {project.liveUrl && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3.5 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand/25"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Live Demo
      </a>
    )}
  </div>
)

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web' },
  { id: 'hardware', label: 'Hardware' }
]

const countFor = (id: Filter) =>
  id === 'all' ? projects.length : projects.filter((p) => p.kinds?.includes(id)).length

const Works = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const tabRefs = useRef<Partial<Record<Filter, HTMLButtonElement | null>>>({})
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const changeFilter = (next: Filter) => {
    if (next === filter) return
    // Record where every card is before React re-renders, so Flip can animate from there
    if (gridRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll('.project-item'))
    }
    setFilter(next)
  }

  // Animate cards from their old layout to the new one: moved cards glide, new ones flip in, removed ones shrink away
  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      absolute: true,
      nested: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.85, rotateY: -35, transformPerspective: 900 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.15 }
        ),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.85, duration: 0.35, ease: 'power2.in' }),
      // The section's height changed, so scroll-based triggers further down need new positions
      onComplete: () => ScrollTrigger.refresh()
    })
  }, [filter])

  // Slide the highlight pill under the active tab
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[filter]
      const indicator = indicatorRef.current
      if (!tab || !indicator) return
      indicator.style.width = `${tab.offsetWidth}px`
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [filter])

  return (
    <section id="works" className="section-padding relative">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow slide-in">Projects</span>
            <h2 className="slide-in mt-5 font-display text-4xl font-bold text-white md:text-5xl">
              Selected work
            </h2>
            <p className="slide-in mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              A selection of projects across AI/ML, full-stack development and hardware.
            </p>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary slide-in self-start md:self-auto"
          >
            All projects on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Featured */}
        <div className="slide-in mb-5">
          <TiltCard maxTilt={3} className="beam card-surface group grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <div className="shine relative aspect-[16/10] overflow-hidden bg-ink-800 lg:aspect-auto lg:min-h-[380px]">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink-950/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-brand">
                Featured · Internship
              </span>
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <p className="font-mono text-xs text-zinc-500">
                {featured.category} · {featured.year}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-400">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag, i) => (
                  <span key={tag} className="chip chip-wave" style={{ '--i': i } as React.CSSProperties}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <ProjectLinks project={featured} />
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Filters */}
        <div className="slide-in mb-6 max-w-full overflow-x-auto [scrollbar-width:none]">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="relative inline-flex gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-brand/15 ring-1 ring-brand/30 transition-[transform,width] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
            />
            {filters.map(({ id, label }) => (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el
                }}
                type="button"
                role="tab"
                aria-selected={filter === id}
                onClick={() => changeFilter(id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                  filter === id ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {label}
                <span className="ml-1.5 font-mono text-[11px] text-zinc-500">{countFor(id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="slide-in relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const visible = filter === 'all' || project.kinds?.includes(filter)
            return (
              <div
                key={project.title}
                data-flip-id={project.title}
                className={`project-item ${visible ? '' : 'hidden'}`}
              >
                <TiltCard className="beam card-surface card-hover group flex h-full flex-col overflow-hidden">
                  <div className="shine relative aspect-[16/10] overflow-hidden bg-ink-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs text-zinc-500">
                      {project.category} · {project.year}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-brand-light">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={tag}
                          className="chip chip-wave !px-2.5 !py-0.5 !text-[11px]"
                          style={{ '--i': i } as React.CSSProperties}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-white/[0.06] pt-5">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Works
