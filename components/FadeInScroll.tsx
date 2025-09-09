"use client";

import { PropsWithChildren } from "react";
import { useInView } from "./useInView";

type Props = PropsWithChildren<{
  delayMs?: number;
  live?: boolean;
  /** middle band size; 0.3 = middle 30% of viewport */
  centerBandPct?: number;
}>;

export default function FadeInScroll({
  children,
  delayMs = 0,
  live = true,
  centerBandPct = 0.3,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ centerBandPct, live });

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
        opacity: inView ? 1 : 0,
        transitionProperty: "opacity",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "opacity",
      }}
    >
      {children}
    </div>
  );
}
