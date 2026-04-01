import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EarthNetwork from '../components/EarthNetwork'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counters, setCounters] = useState({ years: 0, projects: 0 })

  const stats = [
    { key: 'years', value: 12, suffix: '+', label: 'Projects Built' },
    { key: 'projects', value: 10, suffix: '+', label: 'Tech Skills' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Heading character stagger
      gsap.fromTo(headingRef.current?.querySelectorAll('.char') || [],
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Text content individual 3D scroll animation
      const paragraphs = gsap.utils.toArray(textRef.current?.children || [])
      paragraphs.forEach((p: any) => {
        gsap.fromTo(p,
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
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          stats.forEach((stat) => {
            gsap.to({}, {
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const progress = this.progress()
                setCounters(prev => ({
                  ...prev,
                  [stat.key]: Math.floor(stat.value * progress)
                }))
              }
            })
          })
        },
        once: true
      })

      // Stats scale in
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Parallax for image
      gsap.to(imageRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-32">
            {/* Section Label */}
            <span className="font-body text-xs tracking-[0.3em] uppercase text-[#d3d8da]/50 mb-6 block">
              About Me
            </span>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#d3d8da] mb-8 overflow-hidden"
            >
              <span className="block overflow-hidden">
                {splitText('BUILDING')}
              </span>
              <span className="block overflow-hidden text-white">
                {splitText('INTELLIGENT')}
              </span>
              <span className="block overflow-hidden">
                {splitText('SYSTEMS')}
              </span>
            </h2>

            {/* Description */}
            <div ref={textRef} className="space-y-6 mb-12" style={{ perspective: '1000px' }}>
              <p className="font-body text-base md:text-lg text-[#d3d8da]/70 leading-relaxed">
                I’m a Computer Science student at VIT Chennai specializing in AI and Robotics, with a passion 
                for artificial intelligence, machine learning, and building intelligent systems.
              </p>
              <p className="font-body text-base md:text-lg text-[#d3d8da]/70 leading-relaxed">
                With a strong interest in solving real-world problems, my work combines full-stack development and AI, where 
                I design and deploy end-to-end solutions using JavaScript, Python, and modern machine learning techniques.
              </p>
              <p className="font-body text-base md:text-lg text-[#d3d8da]/70 leading-relaxed">
                I enjoy turning ideas into production-ready systems. When I’m not coding, you’ll find me playing competitive chess, staying active through 
                fitness and physical training, reading non-fiction, or exploring geopolitics.
              </p>
            </div>

            {/* Education */}
            <div className="mb-8 p-6 rounded-lg bg-[#d3d8da]/5">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#d3d8da]/50 mb-2 block">
                Education
              </span>
              <h3 className="font-display text-lg font-semibold text-[#d3d8da]">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="font-body text-sm text-[#d3d8da]/60">
                AI & Robotics Specialization
              </p>
              <p className="font-body text-sm text-[#d3d8da]/50 mt-1">
                Vellore Institute of Technology (VIT), Chennai
              </p>
              <p className="font-body text-xs text-[#d3d8da]/40 mt-1">
                2023 - Present | Expected Graduation: August 2027
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="text-center p-4 rounded-lg bg-[#d3d8da]/5 hover:bg-[#d3d8da]/10 transition-colors"
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1 counter-scramble">
                    {counters[stat.key as keyof typeof counters]}{stat.suffix}
                  </div>
                  <div className="font-body text-xs text-[#d3d8da]/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Interactive Model */}
          <div className="relative h-full min-h-[500px] flex items-center justify-center lg:mt-0 mt-8">
            <div
              ref={imageRef}
              className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden flex items-center justify-center"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              <EarthNetwork />
              
              <div className="absolute inset-0 bg-gradient-to-t pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
