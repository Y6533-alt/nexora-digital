import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

const SPRING = { stiffness: 180, damping: 18, mass: 0.5 }

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

/** Card with a pointer-driven 3D tilt and a spotlight that follows the cursor. */
export function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const reduced = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), SPRING)
  const rotateY = useSpring(useMotionValue(0), SPRING)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (reduced) return
    rotateY.set((px - 0.5) * maxTilt * 2)
    rotateX.set((0.5 - py) * maxTilt * 2)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={`group spotlight relative ${className}`}
    >
      {children}
    </m.div>
  )
}
