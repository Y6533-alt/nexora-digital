import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Bottom CTA on phones: appears after the hero, hides while the form is on screen. */
export function MobileCta() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.id === 'home') setHeroVisible(entry.isIntersecting)
        if (entry.target.id === 'contact') setContactVisible(entry.isIntersecting)
      }
    })
    for (const id of ['home', 'contact']) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {!heroVisible && !contactVisible && (
        <m.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-ink/80 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden"
        >
          <a
            href="#contact"
            className="btn-primary block rounded-xl py-3 text-center font-display text-[1.0625rem] font-bold text-white"
          >
            בואו נדבר על העסק שלך
          </a>
        </m.div>
      )}
    </AnimatePresence>
  )
}
