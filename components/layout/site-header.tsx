"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MobileNav } from "./mobile-nav";

/**
 * Routes whose hero is a full-bleed photograph. Over one of these the header
 * has to invert to light type until it settles into ivory on scroll.
 */
const DARK_HERO_ROUTES = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const overDark = !lifted && DARK_HERO_ROUTES.has(pathname);

  // The bar is transparent over the top of the page and settles into ivory
  // once you start scrolling. rAF-throttled so it costs nothing.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setLifted(window.scrollY > 12);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-soft",
        lifted
          ? "border-b border-line bg-bone/85 backdrop-blur-md supports-[backdrop-filter]:bg-bone/75"
          : "border-b border-transparent bg-transparent",
        overDark && "on-dark",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className={cn(
            "flex shrink-0 items-center gap-2.5",
            overDark ? "text-bone" : "text-ink",
          )}
        >
          <Logo
            className="flex items-center gap-2.5"
            markClassName={overDark ? "text-amber" : "text-clay"}
            wordmarkClassName="font-display text-[1.6rem] leading-none tracking-[-0.01em] md:text-[1.75rem]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-150",
                      overDark
                        ? active
                          ? "text-bone"
                          : "text-bone/80 hover:text-bone"
                        : active
                          ? "text-ink"
                          : "text-ink-70 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300 ease-out-soft",
                        overDark ? "bg-amber" : "bg-clay",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/get-matched"
            size="sm"
            variant={overDark ? "on-dark" : "primary"}
            withArrow
            className="hidden sm:inline-flex"
            onClick={() => track("cta_click", { location: "header", label: "Get matched" })}
          >
            Get matched
          </ButtonLink>
          <MobileNav onDark={overDark} />
        </div>
      </div>
    </header>
  );
}
