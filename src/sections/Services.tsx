import { Check } from 'lucide-react'
import { ServiceVisual } from '../components/ServiceVisual'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'
import { services } from '../data/content'

const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="services-title" eyebrow="השירותים שלנו" title="ארבע זרועות, מנוע צמיחה אחד.">
          אסטרטגיה, פרסום, תוכן ואתר שעובדים יחד, כדי שכל חלק ידחוף את התוצאות של האחרים.
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-12">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={i * 0.08} className={spans[i]}>
                <TiltCard className="glass h-full rounded-3xl">
                  <article className="flex h-full flex-col p-7 lg:p-9">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-violet/40 to-blue/20 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-6deg]">
                        <Icon className="size-6.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <ServiceVisual kind={service.visual} />
                    </div>
                    <h3 className="mt-6 text-2xl font-extrabold lg:text-[1.75rem]">{service.title}</h3>
                    <p className="mt-2.5 text-fg-soft">{service.blurb}</p>
                    <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 leading-snug">
                          <Check className="mt-0.5 size-4.5 shrink-0 text-cyan" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
