/**
 * A deliberately thin event layer. No vendor script ships with the site.
 *
 * Events are pushed to `window.dataLayer` (the shape GTM, GA4 and most
 * warehouse pipelines already understand) and mirrored to an optional
 * `window.zidiAnalytics` hook so a first-party collector can be wired in
 * without touching component code. If neither exists the call is a no-op,
 * which is the default state of the site as shipped.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "match_started"
  | "match_step_completed"
  | "match_completed"
  | "match_failed"
  | "tutor_application_started"
  | "tutor_application_completed"
  | "tutor_application_failed"
  | "contact_submitted"
  | "contact_failed"
  | "pricing_currency_changed"
  | "pricing_cta_click"
  | "waitlist_interest"
  | "faq_open";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    zidiAnalytics?: (event: string, payload: Payload) => void;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;
  const clean: Payload = {};
  for (const [k, v] of Object.entries(payload)) {
    if (v !== undefined && v !== "") clean[k] = v;
  }
  try {
    window.dataLayer?.push({ event, ...clean });
    window.zidiAnalytics?.(event, clean);
  } catch {
    // Analytics must never break the page.
  }
}
