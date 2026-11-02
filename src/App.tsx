import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileCta } from './components/layout/MobileCta'
import { Hero } from './sections/Hero'
import { ChannelMarquee } from './sections/ChannelMarquee'
import { Services } from './sections/Services'
import { Results } from './sections/Results'
import { WhyUs } from './sections/WhyUs'
import { Testimonials } from './sections/Testimonials'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-xl bg-white px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
        >
          דילוג לתוכן הראשי
        </a>

        <div className="aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="grain" aria-hidden="true" />

        <Header />
        <main id="main">
          <Hero />
          <ChannelMarquee />
          <Services />
          <Results />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <MobileCta />
      </MotionConfig>
    </LazyMotion>
  )
}
