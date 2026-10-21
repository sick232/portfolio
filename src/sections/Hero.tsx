import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Github, Linkedin, Download, Mail } from 'lucide-react'
const EarthNetwork = lazy(() => import('../components/EarthNetwork'))
import { profile } from '../data/profile'
import { scrollToSection } from '../lib/smoothScroll'

// Front shows the headline stat; the back (revealed by a 3D flip) shows a detail
const highlights = [
  { value: 'DRDO', label: 'AI & SWE Intern', backValue: '2026', backLabel: 'DEAL, Dehradun' },
  { value: '13+', label: 'Projects Built', backValue: 'GitHub', backLabel: '@sick232' },
  { value: 'VIT', label: 'B.Tech CSE, AI & Robotics', backValue: '2027', backLabel: 'Graduating, Chennai' }
]

const socials = [
  { icon: Github, href: profile.githubUrl, label: 'GitHub' },
  { icon: Linkedin, href: profile.linkedinUrl, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' }
]

// Splits a word into letters that can each rotate in 3D
const SplitWord = ({ word }: { word: string }) => (
  <span className="inline-block whitespace-nowrap [transform-style:preserve-3d]">
    {word.split('').map((char, i) => (
      <span key={i} className="hero-char inline-block [transform-style:preserve-3d]">
        {char}
      </span>
    ))}
  </span>
)

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const tiltLayerRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState<string | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = heroRef.current
    const tiltLayer = tiltLayerRef.current

    // Tilt the visual toward the cursor so its layers separate in depth.
    // overwrite: 'auto' replaces the previous tween instead of stacking a new one per mousemove.
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(tiltLayer, {
        rotateY: (e.clientX / window.innerWidth - 0.5) * 22,
        rotateX: -(e.clientY / window.innerHeight - 0.5) * 22,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    }
    if (window.matchMedia('(pointer: fine)').matches) {
      hero?.addEventListener('mousemove', handleMouseMove)
    }

    // Pause the hero's looping CSS animations (grid floor, ring, chips) while it is off screen
    const visibility = new IntersectionObserver(([entry]) => {
      hero?.classList.toggle('is-offscreen', !entry.isIntersecting)
    })
    if (hero) visibility.observe(hero)

    // Spin a letter of the name a full turn when the cursor touches it
    const handleCharEnter = (e: Event) => {
      const char = e.currentTarget as HTMLElement
      if (gsap.isTweening(char)) return
      gsap.fromTo(char, { rotateX: 0 }, { rotateX: 360, duration: 0.9, ease: 'power3.out' })
    }
    const chars = hero ? Array.from(hero.querySelectorAll<HTMLElement>('.hero-char')) : []
    if (window.matchMedia('(hover: hover)').matches) {
      chars.forEach((char) => char.addEventListener('mouseenter', handleCharEnter))
    }

    const ctx = gsap.context(() => {
      // Letters of the name flip up into place in 3D on load
      gsap.fromTo(
        chars,
        { opacity: 0, rotateX: -100, y: 20, transformOrigin: '50% 100% -30px' },
        { opacity: 1, rotateX: 0, y: 0, duration: 1, stagger: 0.04, ease: 'back.out(1.7)', delay: 0.25 }
      )
      gsap.fromTo(
        '.hero-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.hero-visual',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )
    }, heroRef)

    return () => {
      hero?.removeEventListener('mousemove', handleMouseMove)
      chars.forEach((char) => char.removeEventListener('mouseenter', handleCharEnter))
      visibility.disconnect()
      gsap.killTweensOf(tiltLayer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-floor" />
        <div className="grid-floor-fade" />
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(122,162,255,0.14),transparent)]" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-item mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-300">
                Open to AI & Software Engineering roles
              </span>
            </div>

            <p className="hero-item mb-4 font-mono text-sm text-brand">
              Hi, I&apos;m
            </p>

            <h1
              className="font-display text-[2.75rem] font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
              style={{ perspective: '600px' }}
              aria-label={profile.name}
            >
              <span aria-hidden="true">
                {profile.name.split(' ').map((word, i) => (
                  <span key={word}>
                    {i > 0 && ' '}
                    <SplitWord word={word} />
                  </span>
                ))}
              </span>
            </h1>

            <h2 className="hero-item mt-4 font-display text-2xl font-semibold text-zinc-400 sm:text-3xl lg:text-4xl">
              {profile.role}
            </h2>

            <p className="hero-item mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {profile.tagline} Recently built <span className="text-zinc-200">DAPS</span>, an
              AI-based procurement intelligence platform, at{' '}
              <span className="text-zinc-200">DEAL–DRDO</span>.
            </p>

            {/* CTAs */}
            <div className="hero-item mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#works"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#works')
                }}
                className="btn-primary group"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="btn-secondary group"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </div>

            {/* Socials */}
            <div className="hero-item mt-8 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Highlights */}
            <div className="hero-item mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08] pt-6">
              {highlights.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFlipped((current) => (current === item.value ? null : item.value))}
                  className={`flip-card flex items-start px-3 text-left first:pl-0 sm:px-4 ${flipped === item.value ? 'is-flipped' : ''}`}
                  aria-label={`${item.value}, ${item.label}. ${item.backValue}, ${item.backLabel}`}
                >
                  <span className="flip-inner">
                    <span className="flip-face">
                      <span className="block font-display text-xl font-bold text-white sm:text-2xl md:text-3xl">
                        {item.value}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-zinc-500 md:text-sm">
                        {item.label}
                      </span>
                    </span>
                    <span className="flip-face flip-back" aria-hidden="true">
                      <span className="block font-display text-xl font-bold text-brand sm:text-2xl md:text-3xl">
                        {item.backValue}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-zinc-400 md:text-sm">
                        {item.backLabel}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            className="hero-visual relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[520px]"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute inset-0 [transform-style:preserve-3d]">
              <div ref={tiltLayerRef} className="absolute inset-0 [transform-style:preserve-3d]">
                {/* Depth layers: glow and rings sit behind the globe, chips float in front */}
                <div className="absolute -inset-[5%] bg-[radial-gradient(closest-side,rgba(122,162,255,0.16),transparent)] [transform:translateZ(-120px)]" />
                <div className="absolute inset-0 rounded-full border border-white/[0.06] [transform:translateZ(-60px)]" />
                <div className="absolute inset-[8%] animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-white/[0.08]" />
                <Suspense fallback={null}>
                  <EarthNetwork />
                </Suspense>

                {/* Tilted 3D orbits with satellites circling the globe */}
                <div className="orbit inset-[14%] [transform:rotateX(72deg)_rotateY(-14deg)]">
                  <div className="orbit-spin [animation-duration:14s]">
                    <span className="orbit-dot" />
                  </div>
                </div>
                <div className="orbit inset-[6%] [transform:rotateX(68deg)_rotateY(24deg)]">
                  <div className="orbit-spin [animation-direction:reverse] [animation-duration:22s]">
                    <span className="orbit-dot orbit-dot-sm" />
                  </div>
                </div>

                <div className="absolute left-0 top-[18%] hidden [transform:translateZ(110px)] sm:block">
                  <div className="animate-float rounded-xl border border-white/[0.08] bg-ink-900/95 px-4 py-3 shadow-2xl shadow-black/40">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Focus</p>
                    <p className="text-sm font-medium text-zinc-200">RAG · LLMs · NLP</p>
                  </div>
                </div>
                <div className="absolute bottom-[16%] right-0 hidden [transform:translateZ(80px)] sm:block">
                  <div className="animate-float rounded-xl border border-white/[0.08] bg-ink-900/95 px-4 py-3 shadow-2xl shadow-black/40 [animation-delay:-3s]">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Stack</p>
                    <p className="text-sm font-medium text-zinc-200">Python · FastAPI · React</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
