import { ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 md:py-16 border-t border-[#d3d8da]/10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="font-display text-xl font-bold text-[#d3d8da]">
              PIYUSH MAURYA
            </span>
            <span className="font-body text-sm text-[#d3d8da]/50">
              &copy; {currentYear} Piyush Maurya. All rights reserved.
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-body text-sm text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-body text-sm text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
            >
              Services
            </a>
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-body text-sm text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
            >
              Works
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-body text-sm text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-sm text-[#d3d8da]/60 hover:text-[#d3d8da] transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-[#d3d8da]/30 flex items-center justify-center group-hover:border-[#d3d8da] group-hover:bg-[#d3d8da] group-hover:text-[#161616] transition-all">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
