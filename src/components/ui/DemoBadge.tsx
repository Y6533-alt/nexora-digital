import { Info } from 'lucide-react'

export function DemoBadge({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`demo-badge ${className}`}>
      <Info className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </span>
  )
}
