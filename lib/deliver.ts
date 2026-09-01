import "server-only";

/**
 * Where a submission actually goes.
 *
 * Configure one of these before launch:
 *   ZIDI_WEBHOOK_URL   — POSTs the JSON payload (Zapier, Make, n8n, your own API)
 *   RESEND_API_KEY + ZIDI_NOTIFY_EMAIL + ZIDI_FROM_EMAIL — emails the team directly
 *
 * With neither set, development logs the payload and production refuses the
 * request with a 503. That is deliberate: silently accepting an enquiry nobody
 * will ever read is worse than telling the sender to email us instead.
 */

export type SubmissionKind = "enquiry" | "tutor-application" | "contact" | "newsletter";

export interface DeliveryOutcome {
  ok: boolean;
  /** Set when delivery could not be attempted at all. */
  unconfigured?: boolean;
}

const LABELS: Record<SubmissionKind, string> = {
  enquiry: "New tutor match enquiry",
  "tutor-application": "New tutor application",
  contact: "New contact message",
  newsletter: "New subject-waitlist signup",
};

function isConfigured() {
  return Boolean(
    process.env.ZIDI_WEBHOOK_URL ||
      (process.env.RESEND_API_KEY && process.env.ZIDI_NOTIFY_EMAIL),
  );
}

function asText(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
}

async function viaWebhook(
  url: string,
  kind: SubmissionKind,
  payload: Record<string, unknown>,
): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
  });
  return res.ok;
}

async function viaResend(
  kind: SubmissionKind,
  payload: Record<string, unknown>,
): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ZIDI_FROM_EMAIL ?? "Zidi website <onboarding@resend.dev>",
      to: [process.env.ZIDI_NOTIFY_EMAIL],
      reply_to: typeof payload.email === "string" ? payload.email : undefined,
      subject: `${LABELS[kind]} — ${payload.contactName ?? payload.fullName ?? payload.name ?? payload.email}`,
      text: asText(payload),
    }),
  });
  return res.ok;
}

export async function deliver(
  kind: SubmissionKind,
  payload: Record<string, unknown>,
): Promise<DeliveryOutcome> {
  if (!isConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        `[zidi] ${kind} could not be delivered: no ZIDI_WEBHOOK_URL or RESEND_API_KEY configured.`,
      );
      return { ok: false, unconfigured: true };
    }
    console.info(`[zidi] ${LABELS[kind]} (development — not delivered)\n${asText(payload)}`);
    return { ok: true };
  }

  try {
    const webhook = process.env.ZIDI_WEBHOOK_URL;
    if (webhook) return { ok: await viaWebhook(webhook, kind, payload) };
    return { ok: await viaResend(kind, payload) };
  } catch (error) {
    console.error(`[zidi] ${kind} delivery threw`, error);
    return { ok: false };
  }
}
