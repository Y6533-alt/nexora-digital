import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'

const SECTION_IDS = ['home', ...navLinks.map((l) => l.id)]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <m.div
        className="fixed inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-l from-cyan via-blue to-violet"
        style={{ scaleX: progress, originX: 1 }}
        aria-hidden="true"
      />
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500 md:px-5 ${
          scrolled || open ? 'glass border-line bg-ink/70 shadow-2xl shadow-black/40' : 'border-transparent'
        }`}
      >
        <a href="#home" aria-label="NEXORA DIGITAL, חזרה לראש העמוד" className="rounded-lg" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`relative block rounded-lg px-4 py-2 font-medium transition-colors duration-200 hover:text-fg ${
                    active === link.id ? 'text-fg' : 'text-fg-soft'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-center rounded-full bg-gradient-to-l from-cyan to-violet transition-transform duration-300 ${
                      active === link.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="#contact" className="!min-h-11 !rounded-xl !px-5 !py-2 !text-base">
              בואו נדבר
            </ButtonLink>
          </div>
          <button
            ref={menuButton}
            type="button"
            className="btn-ghost grid size-11 place-items-center rounded-xl lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="ניווט ראשי במובייל"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass mx-auto mt-2 max-w-7xl rounded-2xl bg-ink/90 p-3 shadow-2xl shadow-black/50 lg:hidden"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 font-display text-xl font-bold hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
