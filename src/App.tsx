import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Toaster } from 'sonner'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Experience from './sections/Experience'
import Works from './sections/Works'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { initSmoothScroll } from './lib/smoothScroll'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => initSmoothScroll(), [])

  useEffect(() => {
    const root = mainRef.current
    if (!root) return

    // Fade in every element marked .slide-in as it enters the viewport (opacity only, so
    // content stays where the scroll puts it). The fade itself is a CSS transition on .is-visible.
    const reveal = (el: Element) => el.classList.add('is-visible')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('.slide-in').forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        let order = 0
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          // Small stagger when several elements enter together
          el.style.transitionDelay = `${Math.min(order++, 6) * 50}ms`
          reveal(el)
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -5% 0px' }
    )

    // Watch for .slide-in elements added or re-classed later (new content, filters, hot reload),
    // so nothing gets stuck invisible because it wasn't in the DOM on first load
    const observeAll = () =>
      root.querySelectorAll('.slide-in:not(.is-visible)').forEach((el) => io.observe(el))
    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-ink-950">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  )
}

export default App
