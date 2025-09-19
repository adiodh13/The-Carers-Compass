// components/FadeIn.tsx
"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Which element/component to render as, e.g. "section", "div", "article" */
  as?: ElementType;
  delayMs?: number;
};

export default function FadeIn({
  children,
  className,
  as,
  delayMs = 0,
}: Props) {
  // Default to 'section' but allow any valid element or component
  const Component = (as || "section") as ElementType;

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = setTimeout(() => setVisible(true), delayMs);
            obs.disconnect();
            return () => clearTimeout(id);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delayMs]);

  return (
    <Component
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-gentle will-change-[transform,opacity]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </Component>
  );
}
