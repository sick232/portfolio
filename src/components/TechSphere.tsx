import { useEffect, useRef } from 'react'

const TAGS = [
  'Python', 'NLP', 'RAG', 'LLMs', 'Deep Learning', 'React', 'Next.js', 'FastAPI',
  'Flask', 'Node.js', 'REST APIs', 'Tailwind', 'PostgreSQL', 'MongoDB', 'Firebase',
  'Docker', 'Git', 'Linux', 'BM25', 'Vector DBs'
]

const RADIUS = 150
const BASE_SPEED = 0.004

// Rotating 3D sphere of skill tags, rendered with CSS 3D transforms
const TechSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Spread tags evenly over the sphere (Fibonacci lattice)
    const golden = Math.PI * (3 - Math.sqrt(5))
    const points = TAGS.map((_, i) => {
      const y = 1 - (i / (TAGS.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r }
    })

    let speedX = BASE_SPEED * 0.4
    let speedY = BASE_SPEED
    let targetX = speedX
    let targetY = speedY
    let frame = 0
    let visible = true

    const render = () => {
      points.forEach((p, i) => {
        const el = tagRefs.current[i]
        if (!el) return
        const depth = (p.z + 1) / 2
        el.style.transform = `translate3d(${p.x * RADIUS}px, ${p.y * RADIUS}px, ${p.z * RADIUS}px) translate(-50%, -50%)`
        el.style.opacity = String(0.25 + depth * 0.75)
      })
    }

    const tick = () => {
      speedX += (targetX - speedX) * 0.05
      speedY += (targetY - speedY) * 0.05

      const cosY = Math.cos(speedY)
      const sinY = Math.sin(speedY)
      const cosX = Math.cos(speedX)
      const sinX = Math.sin(speedX)

      points.forEach((p) => {
        // Rotate around the Y axis, then the X axis
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y2 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        p.x = x1
        p.y = y2
        p.z = z2
      })

      render()
      if (visible) frame = requestAnimationFrame(tick)
    }

    render()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const dx = (e.clientX - rect.left) / rect.width - 0.5
      const dy = (e.clientY - rect.top) / rect.height - 0.5
      targetY = dx * 0.03
      targetX = -dy * 0.03
    }
    const handleMouseLeave = () => {
      targetX = BASE_SPEED * 0.4
      targetY = BASE_SPEED
    }

    // Only animate while the sphere is on screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(tick)
    })
    observer.observe(container)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[360px] w-[360px] select-none"
      style={{ perspective: '900px' }}
      aria-label="Technologies I work with"
    >
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(122,162,255,0.12),transparent)]" />
      <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
        {TAGS.map((tag, i) => (
          <span
            key={tag}
            ref={(el) => {
              tagRefs.current[i] = el
            }}
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/[0.08] bg-ink-900/80 px-3 py-1 font-mono text-xs text-zinc-200 will-change-transform"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechSphere
