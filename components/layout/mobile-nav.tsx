"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button";
import { Close, Menu } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

/**
 * Built on native <dialog>: focus trapping, Escape-to-close and inert
 * background come from the platform rather than from us re-implementing them.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function close() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.close();
  }

  function show() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    setOpen(true);
  }

  // Close on navigation, so a link tap never leaves the panel hanging open.
  useEffect(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  // Keep the page behind from scrolling while the panel is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className={cn(
          "on-dark m-0 h-full max-h-none w-full max-w-none bg-kola text-bone",
          "backdrop:bg-ink/60 open:animate-[zidi-fade_0.2s_ease-out]",
        )}
      >
        <div className="grain flex h-full flex-col">
          <div className="relative z-1 flex items-center justify-between px-5 py-4">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5 text-bone"
              aria-label={`${site.name} — home`}
            >
              <Logo
                className="flex items-center gap-2.5"
                wordmarkClassName="font-display text-[1.6rem] leading-none tracking-[-0.01em]"
              />
            </Link>
            <button
              type="button"
              onClick={close}
              className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-bone/10"
            >
              <Close className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav
            aria-label="Main"
            className="relative z-1 flex-1 overflow-y-auto px-5 pt-6"
          >
            <ul className="space-y-1">
              {primaryNav.map((item, i) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href} className="border-b border-kola-600/60">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-4 font-display text-[2rem] leading-tight tracking-[-0.02em] transition-colors hover:text-amber aria-[current=page]:text-amber"
                    >
                      <span className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-bone/40">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-1 space-y-3 border-t border-kola-600/60 px-5 py-6">
            <ButtonLink
              href="/get-matched"
              size="lg"
              fullWidth
              withArrow
              onClick={() => {
                track("cta_click", { location: "mobile_nav", label: "Get matched" });
                close();
              }}
            >
              Get matched with a tutor
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="on-dark-outline"
              size="lg"
              fullWidth
              onClick={close}
            >
              Talk to Zidi
            </ButtonLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
