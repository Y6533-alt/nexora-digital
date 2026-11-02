import { Play } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { ServiceVisualKind } from '../data/content'

type Vars = CSSProperties & Record<`--${string}`, string | number>

function PaidViz() {
  const bars = [0.3, 0.42, 0.38, 0.6, 0.72, 1]
  return (
    <div dir="ltr" className="flex h-full items-end justify-center gap-2 px-5 pb-1">
      {bars.map((rest, i) => (
        <span
          key={i}
          className="viz-bar h-full w-3.5 rounded-t-[4px] bg-gradient-to-t from-violet-deep to-cyan"
          style={{ '--rest': rest * 0.72 + 0.1, transitionDelay: `${i * 40}ms` } as Vars}
        />
      ))}
    </div>
  )
}

function SocialViz() {
  const nodes = [0, 72, 144, 216, 288]
  return (
    <div className="relative grid h-full place-items-center">
      <span className="absolute size-24 rounded-full border border-dashed border-white/20" />
      <span className="relative z-10 size-7 rounded-full bg-gradient-to-br from-violet to-blue shadow-[0_0_24px_rgb(139_92_246/0.7)]" />
      <div className="viz-orbit absolute size-24">
        {nodes.map((deg) => (
          <span
            key={deg}
            className="absolute start-1/2 top-1/2 -ms-1.5 -mt-1.5 size-3 rounded-full bg-cyan"
            style={{ transform: `rotate(${deg}deg) translateX(48px)` }}
          />
        ))}
      </div>
    </div>
  )
}

function ContentViz() {
  const frames: Vars[] = [
    { '--fx': '-24px', '--fr': '-9deg', '--fx-h': '-42px', '--fr-h': '-14deg' },
    { '--fx': '24px', '--fr': '9deg', '--fx-h': '42px', '--fr-h': '14deg' },
    { '--fx': '0px', '--fr': '0deg', '--fx-h': '0px', '--fr-h': '0deg' },
  ]
  return (
    <div className="relative grid h-full place-items-center">
      {frames.map((style, i) => (
        <span
          key={i}
          style={style}
          className={`viz-frame absolute grid h-24 w-[3.75rem] place-items-center rounded-xl border border-white/25 ${
            i === 2 ? 'bg-gradient-to-br from-violet to-blue' : 'bg-white/10'
          }`}
        >
          {i === 2 && <Play className="size-5 fill-white" />}
        </span>
      ))}
    </div>
  )
}

function WebViz() {
  return (
    <div className="grid h-full place-items-center">
      <div className="w-44 overflow-hidden rounded-xl border border-white/20 bg-white/5">
        <div className="flex gap-1 border-b border-white/15 px-2.5 py-2">
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
        </div>
        <div className="space-y-2 p-3">
          <span className="viz-block block h-2.5 rounded-full bg-gradient-to-l from-cyan to-violet" />
          <span className="viz-block block h-1.5 rounded-full bg-white/25" style={{ transitionDelay: '60ms' }} />
          <span className="viz-block block h-1.5 rounded-full bg-white/25" style={{ transitionDelay: '120ms' }} />
          <span className="mt-1 block h-5 w-16 rounded-md bg-gradient-to-l from-blue to-violet" />
        </div>
      </div>
    </div>
  )
}

const visuals: Record<ServiceVisualKind, () => React.JSX.Element> = {
  paid: PaidViz,
  social: SocialViz,
  content: ContentViz,
  web: WebViz,
}

export function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  const Visual = visuals[kind]
  return (
    <div className="h-32 w-full max-w-52 shrink-0" aria-hidden="true">
      <Visual />
    </div>
  )
}
