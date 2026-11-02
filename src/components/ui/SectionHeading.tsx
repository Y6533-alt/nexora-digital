import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl lg:mb-16">
      <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-cyan">
        <span className="h-px w-8 bg-gradient-to-l from-cyan to-violet" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {children && <div className="mt-5 text-lg text-fg-soft lg:text-xl">{children}</div>}
    </Reveal>
  )
}
