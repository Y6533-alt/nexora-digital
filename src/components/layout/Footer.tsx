import { Mail, MapPin, Phone } from 'lucide-react'
import { contactExample, navLinks, services } from '../../data/content'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from '../ui/BrandIcons'
import { DemoBadge } from '../ui/DemoBadge'
import { Logo } from '../ui/Logo'

const socials = [
  { label: 'אינסטגרם', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'פייסבוק', href: 'https://www.facebook.com/', Icon: FacebookIcon },
  { label: 'טיקטוק', href: 'https://www.tiktok.com/', Icon: TikTokIcon },
  { label: 'לינקדאין', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
]

const headingClass = 'mb-4 font-display text-base font-bold text-fg'
const linkClass = 'inline-block py-1 text-fg-soft transition-colors hover:text-cyan'

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-raised/70 pt-16 pb-28 sm:pb-10">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.4fr]">
          <div>
            <a href="#home" aria-label="NEXORA DIGITAL, חזרה לראש העמוד" className="inline-block rounded-lg">
              <Logo />
            </a>
            <p className="mt-5 max-w-xs text-fg-soft">סוכנות שיווק דיגיטלי שהופכת חשיפה לצמיחה עסקית.</p>
            <ul className="mt-6 flex gap-2" aria-label="רשתות חברתיות (קישורים לדוגמה)">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (קישור לדוגמה, ייפתח בחלון חדש)`}
                    className="btn-ghost grid size-11 place-items-center rounded-xl text-fg-soft transition-colors hover:text-white"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="ניווט בתחתית העמוד">
            <h2 className={headingClass}>ניווט</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>שירותים</h2>
            <ul>
              {services.map((service) => (
                <li key={service.title}>
                  <a href="#services" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>פרטי קשר</h2>
            <DemoBadge className="mb-3">פרטים לדוגמה</DemoBadge>
            <ul className="space-y-1">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-cyan" aria-hidden="true" />
                <a href={contactExample.phoneHref} dir="ltr" className={linkClass}>
                  {contactExample.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-cyan" aria-hidden="true" />
                <a href={`mailto:${contactExample.email}`} dir="ltr" className={`${linkClass} break-all`}>
                  {contactExample.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 py-1 text-fg-soft">
                <MapPin className="size-4 shrink-0 text-cyan" aria-hidden="true" />
                {contactExample.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NEXORA DIGITAL. כל הזכויות שמורות.</p>
          <p>הנתונים, מקרי ההצלחה וההמלצות באתר מוצגים להמחשה בלבד.</p>
        </div>
      </div>
    </footer>
  )
}
