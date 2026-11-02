import { m, useMotionValue, useSpring } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { PointerEvent, ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
  onClick?: () => void
}

const SPRING = { stiffness: 260, damping: 20, mass: 0.4 }

/** In-page link styled as a button; the primary variant leans slightly toward the cursor. */
export function ButtonLink({ href, variant = 'primary', children, className = '', onClick }: ButtonLinkProps) {
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.14)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.a
      href={href}
      onClick={onClick}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl px-7 py-3 text-center font-display text-[1.0625rem] font-bold text-white ${
        variant === 'primary' ? 'btn-primary' : 'btn-ghost'
      } ${className}`}
    >
      {children}
      {variant === 'primary' && (
        <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
      )}
    </m.a>
  )
}
