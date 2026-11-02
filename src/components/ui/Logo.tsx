import { useId } from 'react'

export function Logo({ className = '' }: { className?: string }) {
  const gradientId = useId()
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.16)" />
        <path
          d="M9 23V9l14 14V9"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[0.95rem] leading-none font-extrabold tracking-[0.14em] whitespace-nowrap">
        NEXORA <span className="font-normal text-fg-soft">DIGITAL</span>
      </span>
    </span>
  )
}
