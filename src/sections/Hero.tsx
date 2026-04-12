import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Github, Linkedin, FileText } from 'lucide-react'

interface HeroProps {
  isLoaded: boolean
}

const Hero = ({ isLoaded }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Image circular reveal
      tl.fromTo(imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(100% at 50% 50%)', duration: 1.4, ease: 'power3.out' }
      )

      // Heading 3D rotation reveal
      tl.fromTo(headingRef.current?.querySelectorAll('.char') || [],
        { opacity: 0, rotateX: 90, y: 50 },
        { opacity: 1, rotateX: 0, y: 0, duration: 1, stagger: 0.03, ease: 'power3.out' },
        '-=0.8'
      )

      // Subheading blur fade
      tl.fromTo(subheadingRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'none' },
        '-=0.4'
      )

      // CTA buttons
      tl.fromTo(ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )

      // Socials
      tl.fromTo(socialsRef.current?.children || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      )

      // Parallax scroll effect for image
      gsap.to(imageRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Heading dissolve on scroll
      gsap.to(headingRef.current, {
        opacity: 0,
        letterSpacing: '50px',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [isLoaded])

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <img
          src="/hero-portrait.jpg"
          alt="Hero Portrait"
          className="w-full h-full object-cover scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/60 via-[#161616]/40 to-[#161616]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container-custom pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none tracking-tight mb-6"
            style={{ perspective: '1000px' }}
          >
            <span className="block">{splitText('HI, I\'M')}</span>
            <span className="block text-[#d3d8da]">{splitText('PIYUSH')}</span>
            <span className="block text-[#d3d8da]">{splitText('MAURYA')}</span>
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="font-body text-lg md:text-xl lg:text-2xl text-[#d3d8da]/80 max-w-2xl mb-10 opacity-0"
          >
          Computer Science Engineer Specializing in AI & Robotics
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={scrollToAbout}
              className="liquid-fill px-8 py-4 border border-[#d3d8da] rounded-full font-body text-sm tracking-wider uppercase transition-all duration-300"
            >
              Explore My Work
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 bg-[#d3d8da] text-[#161616] rounded-full font-body text-sm tracking-wider uppercase hover:bg-white transition-colors"
            >
              Get In Touch
            </a>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToAbout}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors group"
          >
            <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Social Links - Left Side */}
      <div
        ref={socialsRef}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-20"
      >
        <a
          href="https://drive.google.com/file/d/16EyCvSjCPZb_jmmha34zEi1wj-Zh4pi5/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          title="Resume"
          className="text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
          aria-label="Resume"
        >
          <FileText className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/sick232"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/piyush-maurya13"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <div className="w-px h-20 bg-[#d3d8da]/20 mx-auto" />
      </div>
    </section>
  )
}

export default Hero
