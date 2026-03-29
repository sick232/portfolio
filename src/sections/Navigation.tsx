import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experties', href: '#services' },
    { name: 'Works', href: '#works' },
    { name: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
        )
      }
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#161616]/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-bold text-[#d3d8da] tracking-tight hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            PORTFOLIO
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative font-body text-sm text-[#d3d8da]/80 hover:text-[#d3d8da] transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d3d8da] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden md:inline-flex liquid-fill px-6 py-2.5 border border-[#d3d8da]/30 rounded-full font-body text-sm text-[#d3d8da] transition-colors"
          >
            Let&apos;s Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#d3d8da]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-[#161616]/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-display text-3xl font-light text-[#d3d8da] hover:text-white transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="mt-8 px-8 py-3 border border-[#d3d8da] rounded-full font-body text-lg text-[#d3d8da]"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
