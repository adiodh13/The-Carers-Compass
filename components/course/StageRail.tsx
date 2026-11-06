// components/course/StageRail.tsx
// Every stop in the guide on one line. The line fills as people read: earlier reading is
// remembered from this browser, and the page being read follows the scroll via --live.
"use client";

import Link from "next/link";
import clsx from "clsx";

import { useProgress } from "@/src/lib/progress";
import { STOPS } from "@/src/lib/stages";

export default function StageRail({
  currentSlug,
  onNavigate,
}: {
  currentSlug: string;
  onNavigate?: () => void;
}) {
  const progress = useProgress();

  return (
    <ol>
      {STOPS.map((stop, i) => {
        const fraction = progress[stop.slug] ?? 0;
        const here = stop.slug === currentSlug;
        const isLast = i === STOPS.length - 1;
        const state = here ? "here" : fraction >= 1 ? "done" : fraction > 0 ? "started" : "idle";

        return (
          <li key={stop.slug} className="rail-stop">
            <span className="rail-dot" data-state={state} aria-hidden />
            {!isLast && (
              <span
                className="rail-line"
                data-live={here}
                style={{ "--fill": fraction } as React.CSSProperties}
                aria-hidden
              >
                <span className="rail-fill" />
                {here && <span className="rail-marker" />}
              </span>
            )}
            <Link
              href={stop.href}
              onClick={onNavigate}
              aria-current={here ? "page" : undefined}
              className={clsx(
                "text-[1.1rem] leading-snug transition-colors duration-300 hover:text-ink",
                here ? "font-medium text-ink" : "text-ink-soft"
              )}
            >
              {stop.number ? `${stop.number}. ` : ""}
              {stop.title}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
