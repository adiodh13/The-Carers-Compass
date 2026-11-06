// components/course/CourseShell.tsx
// The frame around every guide page: the sidebar on larger screens, a slim bar that opens
// the same list on phones. It stays mounted between pages so the line moves, not reloads.
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import StageRail from "@/components/course/StageRail";
import { requestOpening } from "@/src/lib/opening";
import { recordProgress } from "@/src/lib/progress";
import { STOPS } from "@/src/lib/stages";

export default function CourseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  const stop = STOPS.find((s) => s.slug === slug);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Arriving on a new page closes the phone menu
  useEffect(() => setMenuOpen(false), [pathname]);

  // Scroll position, written straight to a CSS variable so reading never re-renders the page.
  // Layout effect: a new page must not paint for a frame with the last page's position.
  useLayoutEffect(() => {
    rootRef.current?.style.setProperty("--live", "0");
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 1;
      rootRef.current?.style.setProperty("--live", fraction.toFixed(4));
      if (slug !== "finish") recordProgress(slug, fraction);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slug]);

  const mobileLabel = stop?.number ? `Section ${stop.number} of 5` : stop?.title;

  return (
    <div ref={rootRef} className="lg:flex">
      {/* Phones and small tablets */}
      <div className="stage-nav sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md lg:hidden">
        <div className="top-line" aria-hidden />
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <Link href="/" onClick={requestOpening} className="display text-[1.3rem]">
            The Carer’s Compass
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="stage-menu"
            className="flex items-center gap-2 text-[1rem] text-ink-soft"
          >
            {mobileLabel}
            <span
              aria-hidden
              className={clsx(
                "text-[1.25rem] leading-none transition-transform duration-500 ease-gentle",
                menuOpen && "rotate-45"
              )}
            >
              +
            </span>
          </button>
        </div>
        <div
          id="stage-menu"
          className={clsx(
            "grid transition-[grid-template-rows] duration-500 ease-gentle",
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
          inert={!menuOpen}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 pt-2">
              <StageRail currentSlug={slug} onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* Larger screens */}
      <aside className="stage-nav sticky top-0 hidden h-svh w-[300px] flex-none flex-col justify-center gap-10 px-10 lg:flex xl:w-[340px] xl:pl-14">
        <Link href="/" onClick={requestOpening} className="display text-[1.7rem] leading-tight">
          The Carer’s Compass
        </Link>
        <nav aria-label="Guide sections">
          <StageRail currentSlug={slug} />
        </nav>
      </aside>

      <main id="main" className="min-w-0 flex-1 px-5 pb-28 pt-10 md:px-8 lg:pt-24">
        <div className="mx-auto w-full max-w-[680px]">
          {children}
        </div>
      </main>
    </div>
  );
}
