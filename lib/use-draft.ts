"use client";

/*
 * set-state-in-effect is disabled for this file by design. sessionStorage cannot
 * be read while rendering on the server, so a saved draft can only be adopted
 * after mount. The restore runs exactly once and costs a single extra render.
 */
/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Draft persistence for the long flows, so a mis-tap or a dropped connection
 * doesn't cost someone eight steps of answers.
 *
 * sessionStorage rather than localStorage on purpose: these forms can carry a
 * child's first name and age range, and that should not outlive the tab.
 *
 * The `status` gate matters. Writing must not begin until the read has
 * finished, or the empty initial value is flushed to storage first and the
 * saved draft is read back blank — which is exactly what happens when effects
 * are invoked twice, as they are under React Strict Mode.
 */
export function useDraft<T extends object>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [restored, setRestored] = useState(false);
  const didRestore = useRef(false);

  useEffect(() => {
    if (didRestore.current) {
      setStatus("ready");
      return;
    }
    didRestore.current = true;
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<T>;
        setValue((current) => ({ ...current, ...parsed }));
        setRestored(true);
      }
    } catch {
      // Corrupt or unavailable storage — start fresh rather than fail.
    }
    setStatus("ready");
  }, [key]);

  useEffect(() => {
    if (status !== "ready") return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked; the form still works, it just won't persist.
    }
  }, [key, value, status]);

  const clear = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Nothing to do.
    }
  }, [key]);

  const update = useCallback((patch: Partial<T>) => {
    setValue((current) => ({ ...current, ...patch }));
  }, []);

  return { value, update, setValue, clear, restored };
}
