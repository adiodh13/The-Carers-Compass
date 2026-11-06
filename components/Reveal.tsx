// components/Reveal.tsx
// Every show-and-hide in the guide fades through RevealPanel, so they all move the same way.
// The content stays on the page while hidden, so printing and copying still include it.
"use client";

import { PropsWithChildren, useId, useState } from "react";

export function RevealPanel({
  id,
  open,
  children,
}: PropsWithChildren<{ id: string; open: boolean }>) {
  return (
    <div id={id} className="reveal" data-open={open} inert={!open}>
      <div className="reveal-clip">{children}</div>
    </div>
  );
}

/** Underlined text that shows or hides what follows it. */
export default function Reveal({
  showLabel,
  hideLabel,
  children,
}: PropsWithChildren<{ showLabel: string; hideLabel: string }>) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="text-link mt-5 inline-block print:hidden"
      >
        {open ? hideLabel : showLabel}
      </button>
      <RevealPanel id={id} open={open}>
        {children}
      </RevealPanel>
    </>
  );
}
