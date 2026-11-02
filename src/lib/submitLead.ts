import type { LeadForm } from './validation'

export type SubmitResult = 'demo' | 'sent'

/**
 * Without VITE_LEAD_ENDPOINT nothing leaves the browser and the result is 'demo',
 * so the UI can say plainly that the details were not sent.
 */
export async function submitLead(lead: LeadForm): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined
  if (!endpoint) return 'demo'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
  if (!response.ok) throw new Error(`Lead endpoint responded ${response.status}`)
  return 'sent'
}
