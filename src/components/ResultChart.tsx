import { m } from 'framer-motion'
import { useEffect, useId, useRef, useState, type PointerEvent } from 'react'
import type { CaseStudy } from '../data/content'

const HEIGHT = 300
const PAD = { top: 28, right: 24, bottom: 34, left: 44 }
const EASE = [0.16, 1, 0.3, 1] as const

function smoothPath(points: { x: number; y: number }[]) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`
    // Catmull-Rom tangents, so a steady rise stays a curve rather than a staircase
    const prev = points[i - 1]
    const before = points[i - 2] ?? prev
    const after = points[i + 1] ?? p
    const c1x = prev.x + (p.x - before.x) / 6
    const c1y = prev.y + (p.y - before.y) / 6
    const c2x = p.x - (after.x - prev.x) / 6
    const c2y = p.y - (after.y - prev.y) / 6
    return `${d} C${c1x},${c1y} ${c2x},${c2y} ${p.x},${p.y}`
  }, '')
}

/** Single-series area chart with a hover crosshair and a table equivalent for screen readers. */
export function ResultChart({ study }: { study: CaseStudy }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)
  const [hovered, setHovered] = useState<number | null>(null)
  const uid = useId()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { series, yTicks, formatValue } = study
  const yMax = yTicks[yTicks.length - 1]
  const plotW = Math.max(1, width - PAD.left - PAD.right)
  const plotH = HEIGHT - PAD.top - PAD.bottom
  const xAt = (i: number) => PAD.left + (i / (series.length - 1)) * plotW
  const yAt = (v: number) => PAD.top + (1 - v / yMax) * plotH
  const points = series.map((v, i) => ({ x: xAt(i), y: yAt(v) }))
  const line = smoothPath(points)
  const area = `${line} L${xAt(series.length - 1)},${yAt(0)} L${xAt(0)},${yAt(0)} Z`
  const lastIndex = series.length - 1

  const handleMove = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left - PAD.left) / plotW
    setHovered(Math.max(0, Math.min(lastIndex, Math.round(ratio * lastIndex))))
  }

  const tip = hovered === null ? null : points[hovered]

  return (
    <div>
      {/* Time runs left to right, as on standard financial charts, including in Hebrew */}
      <div ref={wrapRef} dir="ltr" className="relative">
        <svg
          width={width}
          height={HEIGHT}
          className="block touch-pan-y select-none"
          role="img"
          aria-label={`${study.chartTitle}: מ-${formatValue(series[0])} בחודש 1 ל-${formatValue(series[lastIndex])} בחודש ${series.length}. נתוני הדגמה.`}
          onPointerMove={handleMove}
          onPointerLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.38" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-line`} gradientUnits="userSpaceOnUse" x1={PAD.left} y1="0" x2={width - PAD.right} y2="0">
              <stop offset="0" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line x1={PAD.left} x2={width - PAD.right} y1={yAt(tick)} y2={yAt(tick)} stroke="rgb(255 255 255 / 0.09)" />
              <text x={PAD.left - 10} y={yAt(tick) + 4} textAnchor="end" fontSize="13" fill="#9A9FB5" className="tabular-nums">
                {tick}
              </text>
            </g>
          ))}

          {series.map((_, i) => (
            <text key={i} x={xAt(i)} y={HEIGHT - 10} textAnchor="middle" fontSize="13" fill="#9A9FB5" className="tabular-nums">
              {i + 1}
            </text>
          ))}

          <m.path
            d={area}
            fill={`url(#${uid}-area)`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
          />
          <m.path
            d={line}
            fill="none"
            stroke={`url(#${uid}-line)`}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: EASE }}
          />

          <m.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}>
            <circle cx={points[lastIndex].x} cy={points[lastIndex].y} r="5" fill="#38BDF8" stroke="#12141C" strokeWidth="2" />
            {hovered === null && (
              <text
                style={{ direction: 'rtl' }}
                x={points[lastIndex].x}
                y={points[lastIndex].y - 13}
                textAnchor="start"
                fontSize="15"
                fontWeight="700"
                fill="#F4F5FA"
              >
                {formatValue(series[lastIndex])}
              </text>
            )}
          </m.g>

          {tip && (
            <g>
              <line x1={tip.x} x2={tip.x} y1={PAD.top} y2={yAt(0)} stroke="rgb(255 255 255 / 0.3)" strokeDasharray="3 4" />
              <circle cx={tip.x} cy={tip.y} r="5" fill="#F4F5FA" stroke="#12141C" strokeWidth="2" />
            </g>
          )}
        </svg>

        {tip && hovered !== null && (
          <div
            dir="rtl"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/15 bg-ink-card px-3 py-1.5 text-sm whitespace-nowrap shadow-xl shadow-black/50"
            style={{
              left: Math.max(56, Math.min(width - 56, tip.x)),
              top: Math.max(44, tip.y - 12),
            }}
          >
            <span className="text-fg-muted">חודש {hovered + 1}: </span>
            <span className="font-bold tabular-nums">{formatValue(series[hovered])}</span>
          </div>
        )}
      </div>
      <p className="mt-1 text-center text-sm text-fg-muted">חודשים מתחילת הפרויקט</p>

      <table className="sr-only">
        <caption>{study.chartTitle} (נתוני הדגמה)</caption>
        <thead>
          <tr>
            <th scope="col">חודש</th>
            <th scope="col">ערך</th>
          </tr>
        </thead>
        <tbody>
          {series.map((v, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{formatValue(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
