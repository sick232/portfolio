import { useEffect, useState } from 'react'
import { Menu, X, FileText, Download } from 'lucide-react'
import { navLinks, profile } from '../data/profile'
import { scrollToSection, scrollToTop, setScrollLocked } from '../lib/smoothScroll'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
      // Nothing is "active" while the hero is in view
      if (window.scrollY < window.innerHeight * 0.5) setActiveSection('')
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setScrollLocked(isMobileMenuOpen)
  }, [isMobileMenuOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-ink-950/95 border-b border-white/[0.06] py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              scrollToTop()
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 font-mono text-sm font-medium text-brand transition-[background-color,transform] duration-700 [transform:perspective(200px)_rotateY(0deg)] group-hover:bg-brand/20 group-hover:[transform:perspective(200px)_rotateY(360deg)]">
              {profile.initials}
            </span>
            <span className="hidden sm:block font-display text-base font-semibold text-white">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  activeSection === link.href
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button (wrapped: btn-secondary's display would otherwise override `hidden` on mobile) */}
          <div className="hidden md:block">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-5 !py-2"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-zinc-200 hover:bg-white/5"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl md:hidden">
          <div className="container-custom flex h-full flex-col justify-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="border-b border-white/[0.06] py-4 font-display text-3xl font-semibold text-zinc-200 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="btn-primary mt-8 self-start"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
