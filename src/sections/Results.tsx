import { CheckCircle2 } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { ResultChart } from '../components/ResultChart'
import { ButtonLink } from '../components/ui/Button'
import { CountUp } from '../components/ui/CountUp'
import { DemoBadge } from '../components/ui/DemoBadge'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { caseStudies } from '../data/content'

export function Results() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const study = caseStudies[activeIndex]

  const handleKey = (e: KeyboardEvent) => {
    const count = caseStudies.length
    // RTL: the left arrow moves to the next tab
    const step: Record<string, number> = { ArrowLeft: 1, ArrowRight: -1 }
    let next: number | null = null
    if (e.key in step) next = (activeIndex + step[e.key] + count) % count
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = count - 1
    if (next === null) return
    e.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="results" aria-labelledby="results-title" className="section-y border-y border-line bg-ink-raised/60">
      <div className="container-x">
        <SectionHeading id="results-title" eyebrow="התוצאות שלנו" title="צמיחה נמדדת במספרים.">
          <p>כך נראית צמיחה כשהיא נמדדת נכון. בחרו פרויקט כדי לראות את הגרף שלו.</p>
          <DemoBadge className="mt-4">פרויקטים לדוגמה להמחשה בלבד, לא הישגים אמיתיים של הסוכנות</DemoBadge>
        </SectionHeading>

        <Reveal>
          <div role="tablist" aria-label="פרויקטים לדוגמה" onKeyDown={handleKey} className="grid gap-4 md:grid-cols-3">
            {caseStudies.map((item, i) => {
              const selected = i === activeIndex
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="case-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-3xl border p-6 text-start transition-all duration-300 hover:-translate-y-1 lg:p-7 ${
                    selected
                      ? 'border-cyan/60 bg-gradient-to-br from-violet/25 to-blue/10 shadow-[0_18px_60px_-22px_rgb(109_59_240/0.9)]'
                      : 'border-line bg-white/[0.03] hover:border-white/25'
                  }`}
                >
                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-lg font-bold">{item.sector}</span>
                    <span className="text-[0.8125rem] font-semibold text-[#a5e3fd]">פרויקט לדוגמה</span>
                  </span>
                  <span className="mt-5 block font-display text-[3.25rem] leading-none font-black tracking-tight lg:text-6xl">
                    <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} decimals={item.decimals} delay={i * 0.12} />
                  </span>
                  <span className="mt-3 block text-fg-soft">{item.metricLabel}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            id="case-panel"
            role="tabpanel"
            aria-labelledby={`tab-${study.id}`}
            tabIndex={0}
            className="glass mt-5 grid grid-cols-[minmax(0,1fr)] gap-8 rounded-3xl p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12 lg:p-9"
          >
            <div className="min-w-0">
              <h3 className="mb-5 text-lg font-bold lg:text-xl">{study.chartTitle}</h3>
              <ResultChart key={study.id} study={study} />
            </div>

            <div className="border-t border-line pt-6 lg:border-t-0 lg:border-s lg:ps-10 lg:pt-0">
              <h3 className="text-lg font-bold lg:text-xl">מה כולל התרחיש?</h3>
              <ul className="mt-5 space-y-4">
                {study.actions.map((action) => (
                  <li key={action} className="flex items-start gap-3 leading-snug text-fg-soft">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden="true" />
                    {action}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contact" className="mt-8 w-full !min-h-12 !text-base">
                בואו נתכנן את שלכם
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
