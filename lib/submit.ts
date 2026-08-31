"use client";

/**
 * Shared POST helper for the three forms. Turns every failure into a message
 * that says what happened and what to do about it — the API is expected to
 * send a usable `error` string, and this fills the gaps when it cannot.
 */
export interface SubmitResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function postForm(endpoint: string, payload: unknown): Promise<SubmitResult> {
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      error:
        "We couldn't reach our server — that usually means the connection dropped. Your answers are saved, so check your internet and try again.",
    };
  }

  let data: { error?: string; fieldErrors?: Record<string, string> } = {};
  try {
    data = (await res.json()) as typeof data;
  } catch {
    // Non-JSON response; fall through to the status-based messages.
  }

  if (res.ok) return { ok: true };

  if (res.status === 429) {
    return {
      ok: false,
      error:
        data.error ??
        "That's several submissions in a short time. Give it an hour, or email hello@zeedeelearn.com and we'll pick it up straight away.",
    };
  }

  if (res.status === 400) {
    return {
      ok: false,
      error:
        data.error ??
        "Some answers need another look — we've marked them below.",
      fieldErrors: data.fieldErrors,
    };
  }

  return {
    ok: false,
    error:
      data.error ??
      "Something failed on our side, not yours. Your answers are saved — try again in a moment, or email hello@zeedeelearn.com and we'll take it from there.",
  };
}
