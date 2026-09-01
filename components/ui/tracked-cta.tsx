"use client";

import type { ComponentPropsWithoutRef } from "react";
import { ButtonLink } from "./button";
import { track } from "@/lib/analytics";

/**
 * A ButtonLink that reports where it was clicked. Keeps section components
 * on the server while still measuring the funnel.
 */
export function TrackedCta({
  location,
  label,
  ...props
}: ComponentPropsWithoutRef<typeof ButtonLink> & {
  location: string;
  label: string;
}) {
  return (
    <ButtonLink
      {...props}
      onClick={() => track("cta_click", { location, label })}
    />
  );
}
