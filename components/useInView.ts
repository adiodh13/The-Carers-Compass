"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** % of viewport height for the center band (0.1–0.9). Example: 0.3 = middle 30% */
  centerBandPct?: number;
  /** if true, it will keep toggling (fade-in/out). If false, it fades in once */
  live?: boolean;
};

export function useInView<T extends HTMLElement>({
  centerBandPct = 0.3,
  live = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clamp and build a rootMargin that leaves only the middle band “observable”
    const band = Math.min(0.9, Math.max(0.1, centerBandPct)); // safety
    const trimPercent = ((1 - band) / 2) * 100;               // top & bottom trim
    const rootMargin = `-${trimPercent}% 0px -${trimPercent}% 0px`;

    const obs = new IntersectionObserver(
      (entries) => {
        const isOn = entries.some((e) => e.isIntersecting);
        if (live) {
          setInView(isOn);
        } else if (isOn) {
          setInView(true);
          entries.forEach((e) => obs.unobserve(e.target));
        }
      },
      { root: null, rootMargin, threshold: 0 } // 0 = toggle when it touches the band
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [centerBandPct, live]);

  return { ref, inView };
}
