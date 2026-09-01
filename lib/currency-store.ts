"use client";

import { useSyncExternalStore } from "react";
import { currencies, type Currency } from "@/data/pricing";

/**
 * The chosen display currency, held outside React so it can be read during
 * render without an effect — and so every price on a page moves together.
 *
 * Server-rendered HTML always shows naira, which is how the business quotes.
 * On the client the stored choice takes over, falling back to a guess from the
 * browser's locale the first time someone visits.
 */
const STORAGE_KEY = "zidi:currency";
const listeners = new Set<() => void>();
let snapshot: Currency | null = null;

function guessFromLocale(): Currency {
  try {
    const region = new Intl.Locale(navigator.language || "en-NG").maximize().region;
    if (region === "GB" || region === "IE") return "GBP";
    if (region === "US") return "USD";
    if (region === "CA") return "CAD";
  } catch {
    // Intl.Locale unavailable or the tag is malformed — fall through.
  }
  return "NGN";
}

function read(): Currency {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (stored && (currencies as readonly string[]).includes(stored)) return stored;
  } catch {
    // Private browsing or blocked storage.
  }
  return guessFromLocale();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Cached, so repeated renders don't re-read storage or loop. */
function getSnapshot(): Currency {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

function getServerSnapshot(): Currency {
  return "NGN";
}

export function setCurrency(next: Currency) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice just won't persist across visits.
  }
  for (const listener of listeners) listener();
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
