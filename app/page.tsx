"use client";

import Navbar from "../components/Navbar";
import Container from "../components/Container";
import FadeIn from "../components/FadeIn";
import { AnchorIcon, CompassIcon, HandsIcon } from "../components/Icons";
import { useState } from "react";
import Link from "next/link";

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#benefits"
      className={
        "inline-flex items-center justify-center rounded-pill bg-brand-teal text-white px-8 py-5 text-[20px] md:text-[28px] font-semibold shadow-pill hover:opacity-95 active:translate-y-[1px] transition " +
        className
      }
    >
      Start the free guide
    </a>
  );
}

export default function Page() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <FadeIn as="section" className="pt-6 md:pt-10">
        <Container>
          <div>
            <h1 className="max-w-[22ch] text-[34px] leading-[1.2] md:text-[45px] font-bold mb-6">
              You don’t have to
              <br className="hidden md:block" />
              figure this out alone.
            </h1>

            <p className="max-w-[70ch] text-[18px] md:text-[22px] leading-relaxed mb-10">
              A free, task-oriented guide to help you steady yourself, support your loved one,
              and find clarity in the weeks ahead.
            </p>
                   
            <CTAButton />
          </div>
        </Container>
      </FadeIn>

      {/* BENEFITS */}
      <FadeIn as="section" className="mt-24 md:mt-40" delayMs={80}>
        <Container>
          <h2 id="benefits" className="text-[32px] md:text-[45px] font-bold text-center mb-12 md:mb-16">
            This guide will help you…
          </h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <Benefit
              icon={<AnchorIcon className="w-24 h-24 md:w-28 md:h-28" />}
              title="Feel steadier today"
              blurb="Simple steps to ease panic and overwhelm"
            />
            <Benefit
              icon={<CompassIcon className="w-24 h-24 md:w-28 md:h-28" />}
              title="Know the next step"
              blurb="Clarity on what to do when things feel chaotic"
            />
            <Benefit
              icon={<HandsIcon className="w-24 h-24 md:w-28 md:h-28" />}
              title="Find support you can lean on"
              blurb="Start building your support network today"
            />
          </div>

          {/* CTA link to the outline page */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/course-outline"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white bg-[#318484] hover:opacity-90 transition"
            >
              View the full guide outline
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

/* smaller components (unchanged) */
function Benefit({ icon, title, blurb }: { icon: React.ReactNode; title: string; blurb: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div>{icon}</div>
      <h3 className="text-[22px] md:text-[28px] font-bold leading-snug">{title}</h3>
      <p className="text-[18px] md:text-[20px] leading-relaxed text-black/70">{blurb}</p>
    </div>
  );
}

function FAQ() {
  const items = [
    "I’ve just found out my loved one’s diagnosis. Where do I start?",
    "I’m already overwhelmed. Will this make things worse?",
    "What if my loved one’s situation is different?",
    "How much time will this take? I already feel stretched.",
    "What if I don’t finish the guide?",
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="flex flex-col gap-5">
      {items.map((q, i) => (
        <li key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left rounded-pill bg-brand-teal/10 hover:bg-brand-teal/15 transition px-6 md:px-8 py-5 md:py-6 text-[18px] md:text-[22px] flex items-center justify-between gap-6"
          >
            <span className="pr-4">{q}</span>
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
          <div className={"grid transition-[grid-template-rows] duration-500 ease-gentle " + (open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
              <div className="px-6 md:px-8 pt-3 pb-1 text-[16px] md:text-[18px] text-black/75">
                This guide is designed to be gentle and practical. Start with the first module,
                spend 10–15 minutes, and stop — progress beats perfection.
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
    <div id="contact" className="rounded-3xl border border-black/10 bg-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
      <div className="text-[28px] md:text-[40px] font-bold leading-tight">
        We’re here to listen.
      </div>
      <div className="text-[18px] md:text-[24px]">
        Email us at <a className="underline" href="mailto:thecarerscompass@gmail.com">thecarerscompass@gmail.com</a>
      </div>
    </div>
  );
}
