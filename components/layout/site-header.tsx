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

export function SiteHeader() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);

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
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex shrink-0 items-center gap-2.5 text-ink"
        >
          <Logo
            className="flex items-center gap-2.5"
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
                      active ? "text-ink" : "text-ink-70 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-clay transition-transform duration-300 ease-out-soft",
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
            withArrow
            className="hidden sm:inline-flex"
            onClick={() => track("cta_click", { location: "header", label: "Get matched" })}
          >
            Get matched
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
