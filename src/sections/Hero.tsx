import { m } from 'framer-motion'
import { FloatingElements } from '../components/hero/FloatingElements'
import { HeroScene } from '../components/hero/HeroScene'
import { ButtonLink } from '../components/ui/Button'
import { CountUp } from '../components/ui/CountUp'
import { DemoBadge } from '../components/ui/DemoBadge'
import { heroStats } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  }
}

function HeadlineLine({ children, delay, className = '' }: { children: string; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <m.span
        className={`inline-block ${className}`}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <FloatingElements />
        {/* Keeps text legible over the 3D object on narrow screens and fades into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pt-[36svh] pb-8 lg:justify-center lg:pt-32 lg:pb-12">
        <div className="max-w-[46rem]">
          <h1
            id="hero-title"
            className="font-black text-[clamp(2rem,9.7vw,3.6rem)] leading-[1.08] whitespace-nowrap tracking-[-0.03em] lg:text-[clamp(3.6rem,5.2vw,5.5rem)]"
          >
            <HeadlineLine delay={0.1}>אנחנו הופכים חשיפה</HeadlineLine>
            <HeadlineLine delay={0.22} className="text-gradient">
              לצמיחה עסקית.
            </HeadlineLine>
          </h1>

          <m.p {...fadeUp(0.45)} className="mt-6 max-w-[38rem] text-lg leading-relaxed text-fg-soft lg:text-[1.375rem]">
            פתרונות שיווק דיגיטלי מתקדמים שמביאים את העסק שלך לקהל הנכון, מגדילים מכירות ומייצרים תוצאות אמיתיות.
          </m.p>

          <m.div {...fadeUp(0.6)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
            <ButtonLink href="#contact" className="sm:!px-8">
              בואו נדבר על העסק שלך
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost">
              גלה את השירותים שלנו
            </ButtonLink>
          </m.div>
        </div>
      </div>

      <m.div {...fadeUp(0.85)} className="container-x pb-10 lg:pb-14">
        <div className="max-w-[46rem] border-t border-line pt-5">
          <DemoBadge className="mb-4">נתוני הדגמה, לא תוצאות אמיתיות</DemoBadge>
          <dl className="grid grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-[1.75rem] leading-none font-extrabold sm:text-4xl lg:text-[2.75rem]">
                  <CountUp {...stat} delay={0.9} />
                </dd>
                <dt className="mt-2 text-sm leading-snug text-fg-muted sm:text-base">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </m.div>
    </section>
  )
}
