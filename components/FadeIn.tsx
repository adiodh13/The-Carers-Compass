// components/FadeIn.tsx
// The site's one fade: content rests in place and its opacity rises as it comes into view.
// It is deliberately opacity alone. Sliding text re-renders it, which reads as a jolt.
"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Which element to render as, e.g. "section", "div", "article" */
  as?: ElementType;
};

export default function FadeIn({ children, className, as }: Props) {
  const Component = (as || "section") as ElementType;

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Any overlap counts, because some of these blocks are several screens tall
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={ref} className={clsx("fade", className)} data-visible={visible}>
      {children}
    </Component>
  );
}
