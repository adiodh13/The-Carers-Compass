// components/home/CreatorNote.tsx
"use client";

import { useRef, useState } from "react";

const COLLAPSED_HEIGHT = "19rem";

export default function CreatorNote() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>(COLLAPSED_HEIGHT);

  const expand = () => {
    setMaxHeight(`${bodyRef.current?.scrollHeight ?? 2000}px`);
    setOpen(true);
  };

  return (
    <div>
      <div
        ref={bodyRef}
        id="creator-note-text"
        className="note display space-y-6 text-[1.45rem] leading-[1.5] md:text-[1.6rem]"
        data-open={open}
        style={{ maxHeight, letterSpacing: 0 }}
        // Let the text reflow freely once the opening animation is done
        onTransitionEnd={(e) => {
          if (open && e.propertyName === "max-height") setMaxHeight("none");
        }}
      >
        <p>
          I created The Carer’s Compass after watching how hard the carers close to me worked to
          take care of their partners. It seemed to me that, whilst patients get a lot of
          resources, there is a gap for carers, even for something as simple as a “here’s where to
          go next”.
        </p>
        <p>
          I watched my aunt take care of my uncle when I was a teenager, and a few years later I
          watched my mum take care of my dad, both of whom were diagnosed with cancer. I saw the
          mental pressure they endured and the toll it takes. I saw the feeling of responsibility,
          fear and, above all, the courage that a carer holds.
        </p>
        <p>
          After my dad passed away, I began talking to other carers whose loved ones, whether a
          parent, a sibling, or a partner, were diagnosed with cancer. I began to understand their
          different experiences and how each person’s circumstances change the process.
        </p>
        <p>
          In an attempt to weave together these common experiences, I created this short and simple
          guide, informed by each carer I spoke to, for a primary carer who doesn’t know where to
          start and hasn’t been in this position before. Everyone’s circumstances are different, and
          no single piece of information will solve everything, but I hope that a carer can at
          least take one thing from this guide. I hope that it continues to be shaped by carers and
          can, one day, become something more.
        </p>
        <p className="italic">Adi</p>
      </div>

      {!open && (
        <button
          type="button"
          onClick={expand}
          aria-expanded={open}
          aria-controls="creator-note-text"
          className="text-link cta mt-3"
        >
          Read the whole note
        </button>
      )}
    </div>
  );
}
