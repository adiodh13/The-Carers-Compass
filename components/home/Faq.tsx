// components/home/Faq.tsx
"use client";

import { useState } from "react";
import clsx from "clsx";

const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "I’ve just found out my loved one’s diagnosis. Where do I start?",
    a: (
      <>
        We have designed this guide so that you can walk through it following your loved one’s
        diagnosis. The first section will help you take the initial steps to start processing your
        thoughts and sets you up to learn more in the following sections.
      </>
    ),
  },
  {
    q: "I’m already overwhelmed. Will this make things worse?",
    a: (
      <>
        No. The guide is deliberately short and gentle. Each task is bite-sized, you can pause
        anytime, and you’ll never be forced to do everything at once. Our focus is to help you
        start taking steps in the right direction.
      </>
    ),
  },
  {
    q: "What if my loved one’s situation is different?",
    a: (
      <>
        We focus on principles that apply across diagnoses (communication, admin, support,
        questions for clinicians), then point you to specialist info. You’ll learn the{" "}
        <em>right questions to ask</em> for your specific case.
      </>
    ),
  },
  {
    q: "How much time will this take? I already feel stretched.",
    a: (
      <>
        Most people complete the essentials in <strong className="font-medium">45–60 minutes</strong>{" "}
        across a few short sessions. Each step is 5–10 minutes. That said, there is no time
        requirement and you can go through it at your own pace.
      </>
    ),
  },
  {
    q: "Do I need an account?",
    a: (
      <>
        No. Everything is open, free, and private. We don’t collect your data or require a login.
        Your progress is remembered only in your own browser, so use what you need and take what
        works for you.
      </>
    ),
  },
  {
    q: "What if I don’t finish the guide?",
    a: (
      <>
        That’s okay. Even one section can help. Every section can be printed or saved as a PDF, so
        you can keep your place on paper and come back whenever you’re ready.
      </>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="border-t border-line">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              className="display flex w-full items-center justify-between gap-6 py-6 text-left text-[1.5rem] leading-snug md:text-[1.8rem]"
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                className={clsx(
                  "flex-none text-[1.75rem] leading-none text-ink-soft transition-transform duration-500 ease-gentle",
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </button>
            <div
              id={`faq-${i}`}
              className={clsx(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-gentle",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 leading-[1.75] text-ink-soft">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
