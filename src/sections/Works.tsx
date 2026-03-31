import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const projects = [
    {
      title: 'AI-Powered PDF Intelligence Suite',
      category: 'NLP / AI',
      year: '2025',
      image: '/project-pdf-intelligence.jpg',
      description: 'NLP-based data processing pipeline with vector embeddings for PDF summarization',
      githubUrl: 'https://github.com/sick232/Adobe-India-Hacathon-Connecting-the-dots-2025-Round-1B-main'
    },
    {
      title: 'MEDVISION AI',
      category: 'Healthcare AI',
      year: '2025',
      image: '/project-medvision.jpg',
      description: 'Multilingual RAG system for surgical navigation with 3D visualization',
      githubUrl: 'https://github.com/sick232/MedVision-AI'
    },
    {
      title: 'Eco-Reserve Planner',
      category: 'Web Platform',
      year: '2025',
      image: '/project-eco-reserve.jpg',
      description: 'Vegetation intelligence platform using Flask and spatial algorithms',
      githubUrl: 'https://github.com/sick232/EcoReserve-Planner'
    },
    {
      title: 'Smart Blind Stick',
      category: 'IoT / Assistive Tech',
      year: '2024',
      image: '/project-smart-blind-stick.jpg',
      description: 'IoT device with ultrasonic sensors for visually impaired users',
      githubUrl: 'https://github.com/sick232/Smart-Blind-Stick'
    },
    {
      title: 'File Transfer System',
      category: 'Full-Stack',
      year: '2024',
      image: '/project-file-transfer.jpg',
      description: 'Secure full-stack file transfer system with authentication protocols',
      githubUrl: 'https://github.com/sick232/File-Transfer-System'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Project items stagger
      gsap.fromTo(listRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Velocity skew effect
      let currentSkew = 0
      let targetSkew = 0

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          targetSkew = self.getVelocity() / 300
          targetSkew = gsap.utils.clamp(-5, 5, targetSkew)
        }
      })

      gsap.ticker.add(() => {
        currentSkew += (targetSkew - currentSkew) * 0.1
        gsap.set(listRef.current, { skewY: currentSkew })
        targetSkew *= 0.9
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#d3d8da]/50 mb-4 block">
            Portfolio
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#d3d8da]">
              SELECTED
              <br />
              <span className="text-white">WORKS</span>
            </h2>
            <p className="font-body text-base text-[#d3d8da]/60 max-w-md">
              A showcase of projects demonstrating my expertise in AI/ML, 
              full-stack development, and innovative problem-solving.
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div ref={listRef} className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative border-t border-[#d3d8da]/10 last:border-b"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 px-4 md:px-8 -mx-4 md:-mx-8 transition-colors hover:bg-[#d3d8da]/5"
              >
                {/* Project Info */}
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-body text-sm text-[#d3d8da]/40 w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-[#d3d8da] group-hover:text-white transition-colors flex items-center gap-4">
                      {project.title}
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="font-body text-sm text-[#d3d8da]/50 mt-2 md:hidden">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-8 mt-4 md:mt-0 ml-14 md:ml-0">
                  <span className="font-body text-sm text-[#d3d8da]/60 hidden md:block max-w-xs">
                    {project.description}
                  </span>
                  <span className="font-body text-sm text-[#d3d8da]/40">
                    {project.category}
                  </span>
                  <span className="font-body text-sm text-[#d3d8da]/40">
                    {project.year}
                  </span>
                  <ExternalLink className="w-5 h-5 text-[#d3d8da]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>

              {/* Hover Image */}
              {hoveredProject === index && (
                <div
                  className="fixed pointer-events-none z-50 w-80 h-48 rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    left: mousePos.x + 20,
                    top: mousePos.y - 100,
                    transform: 'translate(0, 0)',
                    animation: 'imageUnfold 0.3s ease forwards'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/sick232"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#d3d8da]/30 rounded-full font-body text-sm tracking-wider uppercase text-[#d3d8da] hover:border-[#d3d8da] hover:bg-[#d3d8da] hover:text-[#161616] transition-all duration-300"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* CSS for image unfold animation */}
      <style>{`
        @keyframes imageUnfold {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(-15deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(0) scale(1);
          }
        }
      `}</style>
    </section>
  )
}

export default Works
