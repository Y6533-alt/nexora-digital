export interface LeadForm {
  fullName: string
  phone: string
  email: string
  business: string
  budget: string
  service: string
}

export type LeadErrors = Partial<Record<keyof LeadForm, string>>

export const emptyLead: LeadForm = {
  fullName: '',
  phone: '',
  email: '',
  business: '',
  budget: '',
  service: '',
}

const ISRAELI_PHONE = /^(?:\+?972|0)(?:[23489]|5\d|7\d)\d{7}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: keyof LeadForm, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case 'fullName':
      if (!value) return 'נא למלא שם מלא'
      if (value.length < 2) return 'השם קצר מדי'
      return undefined
    case 'phone':
      if (!value) return 'נא למלא מספר טלפון'
      if (!ISRAELI_PHONE.test(value.replace(/[\s()-]/g, ''))) return 'מספר הטלפון לא תקין. לדוגמה: 050-1234567'
      return undefined
    case 'email':
      if (!value) return 'נא למלא כתובת אימייל'
      if (!EMAIL.test(value)) return 'כתובת האימייל לא תקינה. לדוגמה: name@example.com'
      return undefined
    case 'business':
      if (!value) return 'נא למלא את שם העסק'
      if (value.length < 2) return 'שם העסק קצר מדי'
      return undefined
    case 'budget':
      return value ? undefined : 'נא לבחור טווח תקציב'
    case 'service':
      return value ? undefined : 'נא לבחור שירות'
  }
}

export function validateLead(form: LeadForm): LeadErrors {
  const errors: LeadErrors = {}
  for (const field of Object.keys(form) as (keyof LeadForm)[]) {
    const message = validateField(field, form[field])
    if (message) errors[field] = message
  }
  return errors
}
