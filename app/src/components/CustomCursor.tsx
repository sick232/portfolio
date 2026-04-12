import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)

    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const moveCursor = (e: MouseEvent) => {
      // Fast, responsive cursor following
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out'
      })

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none'
      })
    }

    // Handle hover states
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isTouchDevice])

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference transition-[width,height] duration-200 ${
          isHovering ? 'w-16 h-16' : 'w-10 h-10'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 ${
            isHovering
              ? 'border-[#d3d8da]/80 bg-[#d3d8da]/10'
              : 'border-[#d3d8da]/50'
          }`}
        />
      </div>

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-[#d3d8da] rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
