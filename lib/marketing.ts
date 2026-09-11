// Public IDs are validated before they are interpolated into vendor snippets.
function validId(value: string | undefined, pattern: RegExp) {
  return value && pattern.test(value) ? value : undefined
}
export const marketing = {
  google: validId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/),
  meta: validId(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d+$/),
  tiktok: validId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID, /^[A-Za-z0-9_-]+$/),
}
export const hasMarketing = Object.values(marketing).some(Boolean)
export const CONSENT_KEY = "qoritum:consent:v1"
export const CONSENT_EVENT = "qoritum:consent"
export const TRACK_EVENT = "qoritum:track"
export type Consent = {
  version: 1
  analytics: boolean
  advertising: boolean
  expires: number
}
export type MarketingEvent =
  | "contact_click"
  | "select_service"
  | "form_start"
  | "form_validated"
  | "generate_lead"
export type EventParameters = {
  channel?: string
  service_id?: string
  form_id?: string
  event_id?: string
}

export function parseConsent(value: string | null): Consent | null {
  try {
    const parsed = JSON.parse(value ?? "null") as Consent | null
    if (
      parsed?.version !== 1 ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.advertising !== "boolean" ||
      !Number.isFinite(parsed.expires) ||
      parsed.expires <= Date.now()
    )
      return null
    return parsed
  } catch {
    return null
  }
}

// Call generate_lead ONLY after the future API confirms success. An event_id
// can then be shared with server-side APIs for conversion deduplication.
export function trackEvent(
  name: MarketingEvent,
  parameters: EventParameters = {}
) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent(TRACK_EVENT, { detail: { name, parameters } })
    )
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    ttq?: {
      page: () => void
      track: (
        name: string,
        params?: Record<string, unknown>,
        options?: Record<string, unknown>
      ) => void
    }
  }
}
