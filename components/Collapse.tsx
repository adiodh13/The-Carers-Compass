// components/Collapse.tsx
"use client";

import { PropsWithChildren, useId, useState } from "react";

import { RevealPanel } from "@/components/Reveal";

type Props = {
  title: string;
};

export default function Collapse({ title, children }: PropsWithChildren<Props>) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="collapse-row border-b border-t border-line py-4" data-open={open}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="collapse-toggle"
      >
        {title}
      </button>
      <RevealPanel id={id} open={open}>
        <div className="pb-1 pt-4">{children}</div>
      </RevealPanel>
    </div>
  );
}
