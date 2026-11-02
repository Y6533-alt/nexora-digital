import {
  BrainCircuit,
  ChartNoAxesCombined,
  Clapperboard,
  Eye,
  Fingerprint,
  Gem,
  MonitorSmartphone,
  Target,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export const navLinks = [
  { id: 'services', label: 'שירותים' },
  { id: 'results', label: 'תוצאות' },
  { id: 'why', label: 'למה אנחנו' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'contact', label: 'צור קשר' },
]

export const heroStats = [
  { value: 320, suffix: '%', label: 'עלייה בהכנסות' },
  { value: 5.2, prefix: 'פי ', decimals: 1, label: 'החזר על ההשקעה' },
  { value: 185, suffix: '%', label: 'יותר לידים איכותיים' },
]

export const channels = ['פייסבוק', 'אינסטגרם', 'גוגל', 'טיקטוק', 'סרטוני UGC', 'תוכן AI', 'דפי נחיתה', 'אופטימיזציה להמרות']

export type ServiceVisualKind = 'paid' | 'social' | 'content' | 'web'

export interface Service {
  title: string
  blurb: string
  icon: LucideIcon
  visual: ServiceVisualKind
  items: string[]
}

export const services: Service[] = [
  {
    title: 'שיווק ממומן',
    blurb: 'כל שקל מפרסום עובד מול הקהל שהכי סביר שיקנה, ומשתפר עם כל בדיקה.',
    icon: Target,
    visual: 'paid',
    items: ['פרסום בפייסבוק ובאינסטגרם', 'קמפיינים בגוגל', 'פרסום בטיקטוק', 'אופטימיזציה ושיפור ביצועים'],
  },
  {
    title: 'ניהול רשתות חברתיות',
    blurb: 'נוכחות עקבית שבונה קהל נאמן, ולא רק עוד פוסט בלוח התוכן.',
    icon: UsersRound,
    visual: 'social',
    items: ['אסטרטגיית תוכן', 'ניהול אינסטגרם וטיקטוק', 'בניית קהילה', 'הגדלת חשיפה אורגנית'],
  },
  {
    title: 'יצירת תוכן וקריאייטיב',
    blurb: 'רעיון חזק, ביצוע מדויק ופורמטים שנבנו כדי לעצור את הגלילה.',
    icon: Clapperboard,
    visual: 'content',
    items: ['הפקת סרטוני פרסום', 'סרטוני UGC', 'יצירת תוכן באמצעות AI', 'עיצוב מודעות וקמפיינים'],
  },
  {
    title: 'בניית אתרים ודפי נחיתה',
    blurb: 'חוויה מהירה ומרשימה שהופכת את התנועה שהבאתם ללקוחות משלמים.',
    icon: MonitorSmartphone,
    visual: 'web',
    items: ['אתרי תדמית', 'דפי נחיתה ממירים', 'חוויית משתמש מתקדמת', 'אופטימיזציה להמרות'],
  },
]

export interface CaseStudy {
  id: string
  sector: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  metricLabel: string
  chartTitle: string
  yTicks: number[]
  formatValue: (v: number) => string
  series: number[]
  actions: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce',
    sector: 'מותג איקומרס',
    value: 320,
    suffix: '%',
    metricLabel: 'עלייה בהכנסות',
    chartTitle: 'הכנסות חודשיות, מדד (חודש 1 = 100)',
    yTicks: [0, 100, 200, 300, 400, 500],
    formatValue: (v) => String(Math.round(v)),
    series: [100, 128, 171, 236, 318, 420],
    actions: ['מבנה קמפיינים חדש בפייסבוק ובגוגל', 'דף מוצר שנבנה מחדש לפי נתוני המרה', 'שיווק חוזר לפי שלב בתהליך הקנייה'],
  },
  {
    id: 'fashion',
    sector: 'מותג אופנה',
    value: 5.2,
    prefix: 'פי ',
    decimals: 1,
    metricLabel: 'החזר על השקעה',
    chartTitle: 'החזר על הוצאות פרסום (ROAS)',
    yTicks: [0, 2, 4, 6],
    formatValue: (v) => `פי ${v.toFixed(1)}`,
    series: [1.8, 2.4, 3.1, 3.9, 4.6, 5.2],
    actions: ['סדרת סרטוני UGC לכל קולקציה', 'בדיקות קריאייטיב שבועיות בטיקטוק', 'העברת תקציב למודעות המנצחות'],
  },
  {
    id: 'software',
    sector: 'חברת תוכנה',
    value: 185,
    suffix: '%',
    metricLabel: 'עלייה בלידים איכותיים',
    chartTitle: 'לידים איכותיים בחודש, מדד (חודש 1 = 100)',
    yTicks: [0, 100, 200, 300],
    formatValue: (v) => String(Math.round(v)),
    series: [100, 122, 151, 198, 246, 285],
    actions: ['חיבור בין נתוני הקמפיינים למערכת המכירות', 'מיקוד בגוגל במילות חיפוש עם כוונת רכישה', 'דפי נחיתה ייעודיים לכל קהל'],
  },
]

export interface Advantage {
  title: string
  text: string
  icon: LucideIcon
}

export const advantages: Advantage[] = [
  {
    title: 'אסטרטגיה מבוססת נתונים',
    text: 'כל החלטה נשענת על מדידה: מה עובד, למי ובאיזו עלות. התקציב זז לאן שהמספרים מראים.',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'שימוש בטכנולוגיות AI מתקדמות',
    text: 'כלי AI מאיצים בדיקות קריאייטיב, ניתוח קהלים ואופטימיזציה, ואנשי מקצוע מחליטים מה עולה לאוויר.',
    icon: BrainCircuit,
  },
  {
    title: 'קריאייטיב ברמה גבוהה',
    text: 'מודעות וסרטונים שנראים כמו של מותג מוביל, בכל פלטפורמה ובכל פורמט.',
    icon: Gem,
  },
  {
    title: 'שקיפות מלאה מול הלקוחות',
    text: 'גישה מלאה לחשבונות, לנתונים ולדוחות. תמיד תדעו לאן הלך כל שקל ומה הוא החזיר.',
    icon: Eye,
  },
  {
    title: 'התאמת אסטרטגיה אישית לכל עסק',
    text: 'בלי תבניות מוכנות. התוכנית נבנית סביב השוק, היעדים והתקציב של העסק שלכם.',
    icon: Fingerprint,
  },
]

export const testimonials = [
  {
    quote: 'סוף סוף הבנתי לאן כל שקל בקמפיין הולך. הדוחות ברורים, ואפשר לקבל החלטות מהר.',
    persona: 'בעלים של חנות אונליין',
  },
  {
    quote: 'הקריאייטיב החדש נראה כמו של מותג הרבה יותר גדול, וגם הקהל הגיב בהתאם.',
    persona: 'ניהול שיווק במותג אופנה',
  },
  {
    quote: 'במקום עוד לידים קיבלנו לידים שאפשר באמת לסגור. צוות המכירות הרגיש את זה מיד.',
    persona: 'ניהול מכירות בחברת תוכנה',
  },
]

export const budgetOptions = ['עד 5,000 ₪', '5,000 עד 15,000 ₪', '15,000 עד 50,000 ₪', 'מעל 50,000 ₪', 'עדיין לא הוחלט']

export const serviceOptions = [...services.map((s) => s.title), 'כמה שירותים יחד', 'עדיין לא בטוחים']

export const contactExample = {
  phone: '03-000-0000',
  phoneHref: 'tel:+97230000000',
  email: 'hello@nexora-digital.example',
  address: 'רחוב הדוגמה 1, תל אביב',
}
