import { Quote, UserRound } from 'lucide-react'
import { DemoBadge } from '../components/ui/DemoBadge'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'
import { testimonials } from '../data/content'

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y border-t border-line bg-ink-raised/60">
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="המלצות לקוחות" title="איך מרגיש שיווק שעובד?">
          <DemoBadge>תוכן דמה להמחשת העיצוב. אלה אינן המלצות של לקוחות אמיתיים</DemoBadge>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.persona} delay={i * 0.1}>
              <TiltCard className="glass h-full rounded-3xl" maxTilt={4}>
                <figure className="flex h-full flex-col p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <Quote className="size-9 -scale-x-100 text-violet" aria-hidden="true" />
                    <span className="text-[0.8125rem] font-semibold text-[#a5e3fd]">המלצה לדוגמה</span>
                  </div>
                  <blockquote className="mt-5 flex-1 font-display text-xl leading-snug font-medium lg:text-[1.375rem]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet/60 to-blue/40">
                      <UserRound className="size-5" aria-hidden="true" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-semibold">דמות להמחשה</span>
                      <span className="mt-0.5 block text-sm text-fg-muted">{item.persona}</span>
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
