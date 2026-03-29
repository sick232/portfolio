import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Works from './sections/Works'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Slide in animations for sections
      gsap.utils.toArray<HTMLElement>('.slide-in').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Scale in animations
      gsap.utils.toArray<HTMLElement>('.scale-in').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#161616]">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero isLoaded={isLoaded} />
        <About />
        <Services />
        <Works />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
