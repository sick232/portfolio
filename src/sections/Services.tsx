import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Code, Database, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const services = [
    {
      icon: Brain,
      title: 'Machine Learning & AI',
      description: 'Building intelligent systems using NLP, RAG systems, and deep learning. Experienced in designing retrieval-augmented generation pipelines and optimizing inference for production-ready AI applications.',
      skills: ['Python', 'NLP', 'RAG Systems', 'scikit-learn', 'LLMs', 'Deep Learning']
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Developing scalable web applications with modern frameworks. Proficient in both frontend and backend technologies, creating end-to-end solutions from concept to deployment.',
      skills: ['React', 'Next.js', 'FastAPI', 'Flask', 'Node.js', 'REST APIs', 'Tailwind CSS']
    },
    {
      icon: Database,
      title: 'Database & DevOps',
      description: 'Managing data systems and deployment pipelines. Skilled in database design, cloud services, and containerization for robust and scalable infrastructure.',
      skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git', 'Linux', 'ROS']
    }
  ]

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

      // Cards stagger animation
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 50, rotateY: 15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setHoveredCard(index)
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d3d8da]/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#d3d8da]/50 mb-4 block">
            What I Do
          </span>
          <h2 className="title-scale font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#d3d8da] mb-6 origin-center">
            MY EXPERTISE
          </h2>
          <p className="font-body text-base md:text-lg text-[#d3d8da]/60 max-w-2xl mx-auto">
            I specialize in AI/ML systems and full-stack development, bringing together 
            cutting-edge research and practical engineering solutions.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="relative p-8 md:p-10 rounded-2xl bg-[#1a1a1a] border border-[#d3d8da]/10 overflow-hidden transition-all duration-500 hover:border-[#d3d8da]/30 hover:-translate-y-2"
                  style={{
                    transform: hoveredCard === index
                      ? 'translateZ(30px)'
                      : 'translateZ(0)'
                  }}
                >
                  {/* Glow Effect */}
                  {hoveredCard === index && (
                    <div
                      className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(211, 216, 218, 0.15), transparent 50%)`
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#d3d8da]/10 flex items-center justify-center group-hover:bg-[#d3d8da]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#d3d8da]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[#d3d8da] mb-4">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-[#d3d8da]/60 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-body text-[#d3d8da]/70 bg-[#d3d8da]/10 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href="#works"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-2 font-body text-sm text-[#d3d8da]/80 hover:text-white transition-colors group/link"
                  >
                    View Projects
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>

                  {/* Glass Edge Effect */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d3d8da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
