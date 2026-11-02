import { AnimatePresence, m } from 'framer-motion'
import { AlertCircle, ArrowLeft, Check, ChevronDown, Info, LoaderCircle } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { budgetOptions, serviceOptions } from '../data/content'
import { submitLead, type SubmitResult } from '../lib/submitLead'
import { emptyLead, validateField, validateLead, type LeadErrors, type LeadForm } from '../lib/validation'

type Status = 'idle' | 'submitting' | 'error' | SubmitResult

const FIELD_ORDER: (keyof LeadForm)[] = ['fullName', 'phone', 'email', 'business', 'budget', 'service']

interface FieldShellProps {
  name: keyof LeadForm
  label: string
  error?: string
  children: ReactNode
}

function FieldShell({ name, label, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-semibold">
        {label}
        <span className="text-cyan" aria-hidden="true">
          {' '}
          *
        </span>
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.9375rem] text-danger">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function SuccessPanel({ status, onReset }: { status: SubmitResult; onReset: () => void }) {
  const isDemo = status === 'demo'
  return (
    <m.div
      key="success"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      className="flex min-h-[26rem] flex-col items-center justify-center p-4 text-center"
    >
      <span className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-violet to-blue shadow-[0_0_60px_-6px_rgb(109_59_240/0.9)]">
        <Check className="size-9" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h3 className="mt-7 text-3xl font-extrabold">{isDemo ? 'כל הפרטים תקינים' : 'הפרטים התקבלו, תודה!'}</h3>
      <p className="mt-3 max-w-md text-lg text-fg-soft">
        {isDemo
          ? 'האתר במצב הדגמה: הטופס עדיין לא מחובר למערכת Backend, ולכן הפרטים לא נשלחו ולא נשמרו בשום מקום.'
          : 'נחזור אליכם בהקדם כדי לבנות יחד אסטרטגיית צמיחה שמתאימה לעסק שלכם.'}
      </p>
      <button type="button" onClick={onReset} className="btn-ghost mt-8 min-h-12 cursor-pointer rounded-xl px-6 font-display font-bold">
        מילוי טופס חדש
      </button>
    </m.div>
  )
}

export function Contact() {
  const [form, setForm] = useState<LeadForm>(emptyLead)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof LeadForm
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear an error as soon as the value is fixed, but do not nag while typing
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof LeadForm
    if (e.target.value) setErrors((prev) => ({ ...prev, [field]: validateField(field, e.target.value) }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validateLead(form)
    setErrors(nextErrors)
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      setStatus(await submitLead(form))
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setForm(emptyLead)
    setErrors({})
    setStatus('idle')
  }

  const fieldProps = (name: keyof LeadForm) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    required: true,
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: 'field',
  })

  const finished = status === 'demo' || status === 'sent'

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto size-[56rem] max-w-full rounded-full bg-[radial-gradient(circle,rgb(109_59_240/0.22),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <Reveal>
          <h2 id="contact-title" className="text-[2.6rem] leading-[1.05] font-black sm:text-6xl lg:text-[4.25rem]">
            מוכנים לקחת את העסק שלכם <span className="text-gradient">לשלב הבא?</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-fg-soft lg:text-xl">
            השאירו פרטים ונחזור אליכם כדי לבנות יחד אסטרטגיית צמיחה שמתאימה לעסק שלכם.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {finished ? (
                <SuccessPanel status={status} onReset={handleReset} />
              ) : (
                <m.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  aria-label="טופס יצירת קשר"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FieldShell name="fullName" label="שם מלא" error={errors.fullName}>
                      <input {...fieldProps('fullName')} type="text" autoComplete="name" placeholder="ישראל ישראלי" />
                    </FieldShell>
                    <FieldShell name="phone" label="מספר טלפון" error={errors.phone}>
                      <input
                        {...fieldProps('phone')}
                        type="tel"
                        dir="ltr"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="050-1234567"
                        className="field text-right"
                      />
                    </FieldShell>
                    <FieldShell name="email" label="כתובת אימייל" error={errors.email}>
                      <input
                        {...fieldProps('email')}
                        type="email"
                        dir="ltr"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        className="field text-right"
                      />
                    </FieldShell>
                    <FieldShell name="business" label="שם העסק" error={errors.business}>
                      <input {...fieldProps('business')} type="text" autoComplete="organization" placeholder="שם העסק שלכם" />
                    </FieldShell>
                    <FieldShell name="budget" label="תקציב שיווק חודשי" error={errors.budget}>
                      <div className="relative">
                        <select {...fieldProps('budget')} className="field cursor-pointer appearance-none pe-11">
                          <option value="" disabled>
                            בחירת טווח
                          </option>
                          {budgetOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-5 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
                      </div>
                    </FieldShell>
                    <FieldShell name="service" label="איזה שירות מעניין אתכם?" error={errors.service}>
                      <div className="relative">
                        <select {...fieldProps('service')} className="field cursor-pointer appearance-none pe-11">
                          <option value="" disabled>
                            בחירת שירות
                          </option>
                          {serviceOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-5 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
                      </div>
                    </FieldShell>
                  </div>

                  <m.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary group mt-7 flex min-h-15 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-6 py-3 font-display text-lg font-bold text-white disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <>
                        אני רוצה להתחיל לצמוח
                        <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
                      </>
                    )}
                  </m.button>

                  {status === 'error' && (
                    <p role="alert" className="mt-3 flex items-center gap-2 text-danger">
                      <AlertCircle className="size-4.5 shrink-0" aria-hidden="true" />
                      השליחה נכשלה. נסו שוב בעוד רגע.
                    </p>
                  )}

                  {!import.meta.env.VITE_LEAD_ENDPOINT && (
                    <p className="mt-4 flex items-start gap-2 text-[0.9375rem] leading-snug text-fg-muted">
                      <Info className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                      מצב הדגמה: הטופס עדיין לא מחובר למערכת, ופרטים שתזינו לא יישלחו.
                    </p>
                  )}
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
