// components/home/Roadmap.tsx
// The guide as a winding path. Each stop is measured where it lands in the page and a curve
// is drawn between them, so the road fits any screen. Reading a section fills in the stretch
// of road leading away from it, using progress kept only in this browser.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import FadeIn from "@/components/FadeIn";
import { clearProgress, useProgress } from "@/src/lib/progress";
import { FINISH, HOW_TO_USE, SECTIONS, STOPS } from "@/src/lib/stages";

type Point = { x: number; y: number };

function curve(a: Point, b: Point) {
  const pull = (b.y - a.y) * 0.74;
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + pull}, ${b.x} ${b.y - pull}, ${b.x} ${b.y}`;
}

function centreOf(el: HTMLElement, within: HTMLElement): Point {
  // Offsets rather than bounding boxes, so they stay right however the page has scrolled
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== within) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function stateOf(fraction: number) {
  if (fraction >= 1) return "done";
  return fraction > 0 ? "started" : "idle";
}

export default function Roadmap() {
  const progress = useProgress();
  const roadRef = useRef<HTMLOListElement | null>(null);
  const revealRef = useRef<SVGRectElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Trace the road through wherever the stops ended up
  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;
    const measure = () => {
      const nodes = Array.from(road.querySelectorAll<HTMLElement>("[data-stop]"));
      setPoints(nodes.map((node) => centreOf(node, road)));
      setSize({ width: road.offsetWidth, height: road.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(road);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  // The road draws itself as the page scrolls
  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const reached = window.innerHeight * 0.72 - road.getBoundingClientRect().top;
      revealRef.current?.setAttribute("height", String(Math.max(0, reached)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [size]);

  const segments = useMemo(
    () => points.slice(1).map((point, i) => curve(points[i], point)),
    [points]
  );

  const started = Object.values(progress).some((fraction) => fraction > 0);
  const nextSlug = SECTIONS.find((s) => (progress[s.slug] ?? 0) < 1)?.slug;
  const finished = (progress[SECTIONS[SECTIONS.length - 1].slug] ?? 0) >= 1;

  return (
    <div>
      <ol ref={roadRef} className="relative">
        {points.length > 1 && (
          <svg
            className="pointer-events-none absolute left-0 top-0"
            width={size.width}
            height={size.height}
            fill="none"
            aria-hidden
          >
            <defs>
              <clipPath id="road-reveal">
                <rect ref={revealRef} x="-20" y="0" width={size.width + 40} height="0" />
              </clipPath>
            </defs>
            <g clipPath="url(#road-reveal)" strokeLinecap="round">
              {segments.map((d) => (
                <path key={d} d={d} stroke="rgba(42,42,42,0.2)" strokeWidth="1.25" />
              ))}
              {segments.map((d, i) => (
                <path
                  key={`fill-${d}`}
                  className="road-fill"
                  d={d}
                  pathLength={1}
                  stroke="var(--color-sun)"
                  strokeWidth="3"
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - (progress[STOPS[i].slug] ?? 0)}
                />
              ))}
            </g>
          </svg>
        )}

        {/* Where to begin */}
        <FadeIn as="li" className="relative pb-20 pl-7 md:pb-28 md:pl-[46%]">
          <Link href={HOW_TO_USE.href} className="group flex items-center gap-5 md:gap-6">
            <span className="flex w-[3.25rem] flex-none justify-center">
              <span
                data-stop
                className={clsx(
                  "h-4 w-4 rounded-full border transition-colors duration-700",
                  (progress[HOW_TO_USE.slug] ?? 0) > 0
                    ? "border-sun bg-sun"
                    : "border-[rgba(42,42,42,0.32)] bg-white"
                )}
              />
            </span>
            <span>
              <span className="block text-ink-soft">New here? Start with this.</span>
              <span className="display block text-[1.75rem] leading-tight">
                <span className="text-link">{HOW_TO_USE.title}</span>
              </span>
            </span>
          </Link>
        </FadeIn>

        {/* The five sections */}
        {SECTIONS.map((section, i) => {
          const fraction = progress[section.slug] ?? 0;
          const swungRight = i % 2 === 1;
          return (
            <FadeIn
              as="li"
              key={section.slug}
              className={clsx(
                "relative pb-20 md:pb-40",
                swungRight ? "pl-7 md:pl-[46%]" : "md:pl-10"
              )}
            >
              <Link href={section.href} className="group flex items-start gap-5 md:gap-6">
                <span
                  data-stop
                  className="road-node"
                  data-state={stateOf(fraction)}
                  data-next={started && section.slug === nextSlug}
                >
                  {section.number}
                </span>
                <span className="min-w-0 pt-1">
                  <span className="display block text-[1.9rem] leading-[1.12] md:text-[2.25rem]">
                    <span className="text-link">{section.title}</span>
                  </span>
                  <span className="mt-2 block max-w-[30ch] leading-relaxed text-ink-soft">
                    {section.blurb}
                  </span>
                  {fraction > 0 && (
                    <span className="accent mt-2 block text-ink-soft">
                      {fraction >= 1 ? "Read" : "Part way through"}
                    </span>
                  )}
                </span>
              </Link>
            </FadeIn>
          );
        })}

        {/* The end of the road */}
        <FadeIn as="li" className="relative">
          <Link
            href={FINISH.href}
            aria-label="Finish the guide"
            className="ml-[2.75rem] flex w-fit items-center md:ml-[calc(46%+0.75rem)]"
          >
            <span
              data-stop
              className={clsx(
                "h-7 w-7 rounded-full transition-all duration-1000",
                finished
                  ? "bg-sun shadow-[0_0_44px_14px_rgba(255,197,51,0.6)]"
                  : "bg-[rgba(255,197,51,0.45)] shadow-[0_0_24px_6px_rgba(255,197,51,0.25)]"
              )}
            />
          </Link>
        </FadeIn>
      </ol>

      <p className="mt-12 text-[1.05rem] text-ink-soft">
        Your place on this path is saved in this browser, on this device, and nowhere else.
        {started && (
          <>
            {" "}
            <button type="button" className="text-link" onClick={clearProgress}>
              Clear my progress
            </button>
          </>
        )}
      </p>
    </div>
  );
}
