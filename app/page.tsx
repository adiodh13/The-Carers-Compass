"use client";

import Container from "../components/Container";
import FadeIn from "../components/FadeIn";
import { useState } from "react";
import Link from "next/link";

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/course/how-to-use"
      className={
        "inline-flex items-center justify-center rounded-pill bg-brand-teal text-white px-8 py-5 text-[20px] md:text-[28px] font-semibold shadow-pill hover:opacity-95 active:translate-y-[1px] transition " +
        className
      }
    >
      Read the Free Guide →
    </Link>
  );
}

const MODULES = [
  {
    href: "/course/section-1",
    title: "Steadying Yourself",
    blurb: "Easing panic and overwhelm, and taking your first small steps",
  },
  {
    href: "/course/section-2",
    title: "Mapping the Road Ahead",
    blurb: "Asking clinicians the right questions and organising your information",
  },
  {
    href: "/course/section-3",
    title: "Gaining Knowledge",
    blurb: "Researching what matters without burning out",
  },
  {
    href: "/course/section-4",
    title: "Building Support",
    blurb: "Finding who can help and sharing the load with family and friends",
  },
  {
    href: "/course/section-5",
    title: "Moving Forward",
    blurb: "Legal and admin basics, and caring sustainably for the road ahead",
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <FadeIn as="section" className="pt-6 md:pt-10">
        <Container>
          <div>
            <h1 className="max-w-[22ch] text-[34px] leading-[1.2] md:text-[45px] font-bold mb-6">
              You don’t have to{"\u00A0"}
              <br className="hidden md:block" />
              figure this out alone.
            </h1>

            <p className="max-w-[70ch] text-[18px] md:text-[22px] leading-relaxed mb-10">
              A free, task-oriented guide to help you steady yourself and support your loved one.
            </p>

            <CTAButton />
            <p className="mt-4 text-[15px] md:text-[17px] text-black/60">
              100% Free · No account needed · Zero data stored
            </p>
          </div>
        </Container>
      </FadeIn>

      {/* MODULE INDEX */}
      <FadeIn as="section" className="mt-20 md:mt-28" delayMs={60}>
        <Container>
          <h2 id="guide" className="text-[32px] md:text-[45px] font-bold text-center mb-4">
            What’s inside the guide
          </h2>
          <p className="text-center text-[18px] md:text-[20px] text-black/70 mb-10 md:mb-12">
            Five short sections. Read them in order, or jump to what you need right now.
          </p>

          <ol className="grid gap-4 md:grid-cols-2">
            {MODULES.map((m, i) => (
              <li key={m.href} className={i === MODULES.length - 1 ? "md:col-span-2" : undefined}>
                <Link
                  href={m.href}
                  className="group flex h-full items-start gap-4 rounded-[22px] bg-white p-5 md:p-6 border-2 border-brand-teal/30 hover:border-brand-teal transition"
                >
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/10 border-2 border-brand-teal text-brand-teal font-bold">
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[20px] md:text-[22px] font-bold leading-snug">
                      {m.title.split(" ").slice(0, -1).join(" ")}{" "}
                      {/* keep the last word and arrow together so the arrow never wraps alone */}
                      <span className="whitespace-nowrap">
                        {m.title.split(" ").slice(-1)}
                        <span
                          aria-hidden
                          className="ml-2 inline-block text-brand-teal transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </span>
                    <span className="text-[16px] md:text-[18px] leading-relaxed text-black/70">{m.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Starting point: read this before Section 1 */}
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-[16px] md:text-[18px] text-black/60">New here? Start with this.</p>
            <Link
              href="/course/how-to-use"
              className="inline-flex items-center justify-center rounded-pill bg-brand-teal text-white px-8 py-4 text-[18px] md:text-[22px] font-semibold shadow-pill hover:opacity-95 active:translate-y-[1px] transition"
            >
              How to use this guide →
            </Link>
          </div>
        </Container>
      </FadeIn>

      {/* FAQ */}
      <FadeIn as="section" className="mt-24 md:mt-36" delayMs={120}>
        <Container>
          <h2 id="faq" className="text-[32px] md:text-[45px] font-bold text-center mb-10 md:mb-12">
            Your questions, answered.
          </h2>
          <div className="mx-auto max-w-4xl">
            <FAQ />
          </div>
        </Container>
      </FadeIn>

      {/* CONTACT */}
      <FadeIn as="section" className="mt-24 md:mt-36 mb-24 md:mb-28" delayMs={140}>
        <Container>
          <Contact />
        </Container>
      </FadeIn>
    </>
  );
}

/* smaller components */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "I’ve just found out my loved one’s diagnosis. Where do I start?",
      a: (
        <span className="whitespace-pre-line">
          {`We have designed this guide so that you can walk through it following your loved one's diagnosis.
The first section will help you take the initial steps to start processing your thoughts and sets you up
to learn more in the following sections.`}
        </span>
      ),
    },
    {
      q: "I’m already overwhelmed. Will this make things worse?",
      a: (
        <>
          No. The guide is deliberately short and gentle. Each task is bite-sized, you can pause anytime,
          and you’ll never be forced to do everything at once. Our focus is to help you start taking steps
          in the right direction.
        </>
      ),
    },
    {
      q: "What if my loved one’s situation is different?",
      a: (
        <>
          We focus on principles that apply across diagnoses (communication, admin, support, questions for
          clinicians), then point you to specialist info. You’ll learn the <em>right questions to ask</em> for
          your specific case.
        </>
      ),
    },
    {
      q: "How much time will this take? I already feel stretched.",
      a: (
        <>
          Most people complete the essentials in <strong>45–60 minutes</strong> across a few short sessions.
          Each step is 5–10 minutes. That said, there is no time requirement and you can go through it at your
          own pace.
        </>
      ),
    },
    {
      q: "Do I need an account?",
      a: (
        <>
          No. Everything is open, free, and private. We don’t collect your data or require a login—use
          what you need and take what works for you.
        </>
      ),
    },
    {
      q: "What if I don’t finish the guide?",
      a: (
        <>
          That’s okay. Even one section can help. Every section can be printed or saved as a PDF, so you
          can keep your place on paper and come back whenever you’re ready.
        </>
      ),
    },
  ];

  return (
    <ul className="flex flex-col gap-5">
      {items.map((item, i) => (
        <li key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left rounded-pill bg-brand-teal/10 hover:bg-brand-teal/15 transition px-6 md:px-8 py-5 md:py-6 text-[18px] md:text-[22px] flex items-center justify-between gap-6"
          >
            <span className="pr-4">{item.q}</span>
            <span
              className={
                "shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-teal transition-transform " +
                (open === i ? "rotate-90" : "")
              }
              aria-hidden
            >
              ➜
            </span>
          </button>
          <div
            className={
              "grid transition-[grid-template-rows] duration-500 ease-gentle " +
              (open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
            }
          >
            <div className="overflow-hidden">
              <div className="px-6 md:px-8 pt-3 pb-1 text-[16px] md:text-[18px] text-black/75">
                {item.a}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Contact() {
  return (
    <div
      id="contact"
      className="rounded-3xl border border-blue/10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
    >
      <div className="md:flex-1 text-[18px] md:text-[20px] font-bold leading-tight">We’re always open to feedback.</div>
      <div className="shrink-0 text-[18px] md:text-[20px] text-center md:text-left">
        Email us at
        <br />
        <a className="underline" href="mailto:team@thecarerscompass.com">
          team@thecarerscompass.com
        </a>
      </div>
    </div>
  );
}
