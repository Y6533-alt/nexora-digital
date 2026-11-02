import { m } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

function Chip({ title, value, className, delay }: { title: string; value: string; className: string; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl shadow-black/40">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-blue">
          <TrendingUp className="size-4.5" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-xl font-extrabold tabular-nums">{value}</span>
          <span className="block text-[0.8125rem] text-fg-soft">{title}</span>
        </span>
      </div>
    </m.div>
  )
}

/** Decorative pieces floating around the 3D object; hidden from assistive tech and small screens. */
export function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <div className="float-a absolute inset-0">
        <Chip title="הכנסות · הדגמה" value="320%" className="end-[29%] top-[13%]" delay={1.0} />
      </div>
      <div className="float-b absolute inset-0">
        <Chip title="החזר השקעה · הדגמה" value="פי 5.2" className="end-[5%] top-[64%]" delay={1.2} />
      </div>
      <div className="float-c absolute inset-0">
        <div className="cube-scene absolute end-[8%] top-[20%]" style={{ '--s': '54px' } as React.CSSProperties}>
          <div className="cube">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="orb absolute end-[42%] top-[66%] size-9" />
      </div>
      <div className="float-a absolute inset-0">
        <div className="ring3d absolute end-[33%] top-[76%] size-24" />
      </div>
    </div>
  )
}
