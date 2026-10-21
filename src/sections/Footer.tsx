import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/profile'
import { scrollToSection, scrollToTop } from '../lib/smoothScroll'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-custom flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 font-mono text-xs text-brand">
            {profile.initials}
          </span>
          <span className="text-sm text-zinc-500">
            &copy; {currentYear} {profile.name}
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
              }}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: profile.githubUrl, label: 'GitHub' },
            { icon: Linkedin, href: profile.linkedinUrl, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
