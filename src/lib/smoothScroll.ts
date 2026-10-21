import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register here because this module calls ScrollTrigger at load time, before App.tsx's registration runs
gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

// Mobile browsers resize the viewport when the address bar shows/hides; don't recalculate
// every ScrollTrigger on that, it causes a visible jump mid-scroll
ScrollTrigger.config({ ignoreMobileResize: true })

// Always start at the top on refresh instead of restoring the previous scroll position.
// clearScrollMemory('manual') also sets history.scrollRestoration = 'manual'.
ScrollTrigger.clearScrollMemory('manual')
window.scrollTo(0, 0)

// Smooth (eased) wheel scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Touch scrolling stays native (Lenis only smooths the wheel by default).
export const initSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  lenis.scrollTo(0, { immediate: true })

  const raf = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

const NAV_OFFSET = -80

export const scrollToSection = (href: string) => {
  const target = document.querySelector<HTMLElement>(href)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET })
  else target.scrollIntoView({ behavior: 'smooth' })
}

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const setScrollLocked = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.body.style.overflow = locked ? 'hidden' : ''
}
