import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number
}

// Card that tilts in 3D toward the cursor, with a soft glare following the pointer
const TiltCard = ({ children, className = '', maxTilt = 8, ...rest }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useRef(false)

  useEffect(() => {
    const el = ref.current
    enabled.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => {
      if (el) gsap.killTweensOf(el)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!enabled.current || !el) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    // overwrite: 'auto' replaces the previous tilt tween instead of stacking a new one per mousemove
    gsap.to(el, {
      rotateY: (px - 0.5) * maxTilt * 2,
      rotateX: (0.5 - py) * maxTilt * 2,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    })
    el.style.setProperty('--glare-x', `${px * 100}%`)
    el.style.setProperty('--glare-y', `${py * 100}%`)
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  )
}

export default TiltCard
