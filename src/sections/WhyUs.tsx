import { m, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { advantages } from '../data/content'

export function WhyUs() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })

  return (
    <section id="why" aria-labelledby="why-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-cyan">
            <span className="h-px w-8 bg-gradient-to-l from-cyan to-violet" aria-hidden="true" />
            היתרונות שלנו
          </p>
          <h2 id="why-title" className="text-5xl leading-[1.04] font-black lg:text-7xl">
            למה לבחור <span className="text-gradient inline-block">בנו?</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-fg-soft lg:text-xl">
            כי צמיחה לא מגיעה מעוד קמפיין. היא מגיעה משילוב של נתונים, טכנולוגיה וקריאייטיב, עם צוות שאתם יודעים בדיוק מה הוא עושה.
          </p>
          <div className="mt-8 hidden lg:block">
            <ButtonLink href="#contact">בואו נדבר על העסק שלך</ButtonLink>
          </div>
        </Reveal>

        <div className="relative">
          <span className="absolute start-[1.6875rem] top-3 bottom-3 w-px bg-line" aria-hidden="true" />
          <m.span
            className="absolute start-[1.6875rem] top-3 bottom-3 w-px bg-gradient-to-b from-cyan via-blue to-violet"
            style={{ scaleY: scrollYProgress, originY: 0 }}
            aria-hidden="true"
          />
          <ol ref={listRef} className="space-y-3">
            {advantages.map((advantage, i) => {
              const Icon = advantage.icon
              return (
                <li key={advantage.title}>
                  <Reveal delay={0.04}>
                    <div className="group flex gap-5 rounded-3xl py-6 pe-5 transition-colors duration-300 hover:bg-white/[0.035] lg:gap-7 lg:py-8">
                      <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-ink-card transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:border-cyan/60 group-hover:shadow-[0_0_34px_-4px_rgb(56_189_248/0.6)]">
                        <Icon className="size-6 text-cyan" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div className="pt-1">
                        <span className="text-sm font-semibold text-fg-muted tabular-nums" aria-hidden="true">
                          0{i + 1}
                        </span>
                        <h3 className="mt-1 text-2xl leading-tight font-extrabold lg:text-[1.875rem]">{advantage.title}</h3>
                        <p className="mt-2.5 max-w-xl text-fg-soft lg:text-lg">{advantage.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
