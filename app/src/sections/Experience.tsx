import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Discipline Lead',
    organization: 'Haryana Hood',
    period: 'Apr 2025 - Mar 2026 · 1 yr',
    location: 'VIT Chennai',  
    description: 'Worked as discipline lead',
  },
  {
    role: 'Management Lead',
    organization: 'Linux Club',
    period: 'Jul 2024 - Mar 2026 · 1 yr 9 mos',
    location: 'VIT Chennai',
    description: 'Handled management tasks',
  },
  {
    role: 'Core member- Vocalist',
    organization: 'Music Club',
    period: 'Sep 2024 - Mar 2026 · 1 yr 7 mos',
    location: 'VIT Chennai',
    description: 'Performed as vocalist',
  },
  {
    role: 'Cadet',
    organization: 'National Cadet Corps',
    period: 'Aug 2024 - Mar 2026 · 1 yr 8 mos',
    location: 'VIT Chennai',
    description: 'NCC cadet activities',
  },
  {
    role: 'Editor',
    organization: 'The Short Film Club',
    period: 'Oct 2023 - Mar 2026 · 2 yrs 6 mos',
    location: 'VIT Chennai',
    description: 'Edited short films',
  }
]

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const titleElement = sectionRef.current?.querySelector('.title-scale')

      if (titleElement) {
        gsap.fromTo(titleElement,
          { 
            scale: 0.1, 
            opacity: 0, 
            y: 100 
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        )
      }

      // List items individual 3D scroll animation
      const items = gsap.utils.toArray(itemsRef.current?.children || [])
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 50,
            rotateX: -15,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="container-custom relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#d3d8da]/50 mb-4 block">
            Clubs & Roles
          </span>
          <h2 className="title-scale font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#d3d8da] mb-6 origin-center">
            MY EXPERIENCE
          </h2>
        </div>

        {/* Experience List */}
        <div ref={itemsRef} className="space-y-6" style={{ perspective: '1000px' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative p-6 md:p-8 rounded-2xl bg-[#1a1a1a] border border-[#d3d8da]/10 overflow-hidden transition-all duration-300 hover:border-[#d3d8da]/30 hover:-translate-y-1 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[#d3d8da] mb-1">
                    {exp.role}
                  </h3>
                  <div className="font-body text-base md:text-lg text-[#d3d8da]/80 mb-2">
                    {exp.organization}
                  </div>
                  {exp.description && (
                    <p className="font-body text-sm md:text-base text-[#d3d8da]/60">
                      {exp.description}
                    </p>
                  )}
                  {exp.location && (
                    <p className="font-body text-sm md:text-base text-[#d3d8da]/50 mt-1">
                      {exp.location}
                    </p>
                  )}
                </div>
                
                <div className="shrink-0 flex items-center md:items-start">
                  <span className="px-3 py-1 text-xs font-body text-[#d3d8da]/70 bg-[#d3d8da]/10 rounded-full border border-[#d3d8da]/5">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Glass Edge Effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d3d8da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
