import "server-only";
import { NextResponse } from "next/server";
import { z } from "zod";
import { clientKey, hit } from "./rate-limit";
import { fieldErrors } from "./validation";
import { deliver, type SubmissionKind } from "./deliver";

const JSON_HEADERS = { "Cache-Control": "no-store" } as const;

export function jsonError(status: number, error: string, extra?: object) {
  return NextResponse.json({ error, ...extra }, { status, headers: JSON_HEADERS });
}

/**
 * Same-origin check. Browsers always attach Origin to a cross-origin POST, so
 * rejecting a mismatch stops a third-party page from posting on a visitor's
 * behalf without needing a token round-trip.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser client; the rest of the checks still apply
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

interface HandleOptions<T extends z.ZodType> {
  request: Request;
  schema: T;
  kind: SubmissionKind;
  /** Submissions allowed per IP per hour. */
  limit?: number;
  /** Strip anything that should not leave the request. */
  redact?: (data: z.infer<T>) => Record<string, unknown>;
}

/**
 * The shared pipeline for every form endpoint: origin check, rate limit,
 * body-size guard, schema validation, honeypot, then delivery.
 */
export async function handleSubmission<T extends z.ZodType>({
  request,
  schema,
  kind,
  limit = 5,
  redact,
}: HandleOptions<T>) {
  if (!isSameOrigin(request)) {
    return jsonError(403, "This form can only be submitted from the Zidi website.");
  }

  const rate = hit(clientKey(request.headers, kind), limit);
  if (!rate.ok) {
    return NextResponse.json(
      {
        error:
          "That's several submissions in a short time. Give it an hour, or email hello@zeedeelearn.com and we'll pick it up straight away.",
      },
      {
        status: 429,
        headers: { ...JSON_HEADERS, "Retry-After": String(rate.retryAfter) },
      },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 32_000) {
      return jsonError(413, "That message is longer than we can accept. Please shorten it and try again.");
    }
    body = JSON.parse(raw);
  } catch {
    return jsonError(400, "We couldn't read that submission. Please reload the page and try again.");
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Some answers need another look — we've marked them below.", {
      fieldErrors: fieldErrors(parsed.error),
    });
  }

  // Honeypot: quietly accept so a bot has nothing to learn from the response.
  const data = parsed.data as Record<string, unknown>;
  if (typeof data.company === "string" && data.company.length > 0) {
    return NextResponse.json({ ok: true }, { headers: JSON_HEADERS });
  }
  delete data.company;

  const outcome = await deliver(kind, redact ? redact(parsed.data) : data);

  if (!outcome.ok) {
    return jsonError(
      503,
      outcome.unconfigured
        ? "Our submission inbox isn't reachable right now. Please email hello@zeedeelearn.com and we'll pick it up straight away — sorry about that."
        : "We couldn't file that on our side. Your answers are saved, so try again in a moment, or email hello@zeedeelearn.com.",
    );
  }

  return NextResponse.json({ ok: true }, { headers: JSON_HEADERS });
}
