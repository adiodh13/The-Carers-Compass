// app/page.tsx
import FadeIn from "@/components/FadeIn";
import CreatorNote from "@/components/home/CreatorNote";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Roadmap from "@/components/home/Roadmap";

const EMAIL = "team@thecarerscompass.com";

export default function Page() {
  return (
    <>
      <Hero />

      <main id="main" className="mx-auto w-full max-w-[920px] px-5 md:px-8">
        {/* What this is */}
        <FadeIn as="section" className="scroll-mt-24 pt-24 md:pt-40">
          <div id="about" className="scroll-mt-32" />
          <h2 className="display max-w-[16ch] text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.05]">
            You don’t have to figure this out <em>alone.</em>
          </h2>
          <p className="lede mt-8 max-w-[58ch]">
            A free, task-oriented guide for anyone caring for someone with cancer for the first
            time. It helps you steady yourself and support your loved one, and was built with the
            help of many carers who’ve been where you are now. What helped them has been turned
            into small, practical steps.
          </p>
          <p className="mt-6 text-ink-soft">
            100% free · No account needed · Nothing leaves your device
          </p>
        </FadeIn>

        {/* The road through the guide */}
        <section className="pt-28 md:pt-44">
          <FadeIn as="div" className="mb-16 md:mb-20">
            <h2
              id="guide"
              className="display scroll-mt-24 text-[clamp(2.4rem,5.5vw,3.5rem)] leading-[1.08]"
            >
              What’s inside the guide
            </h2>
            <p className="lede mt-4 text-ink-soft">
              Five short sections. Read them in order, or jump to what you need right now.
            </p>
          </FadeIn>
          <Roadmap />
        </section>

        {/* Note from the creator */}
        <FadeIn as="section" className="max-w-[680px] pt-32 md:pt-48">
          <h2
            id="note"
            className="display scroll-mt-24 text-[clamp(2.4rem,5.5vw,3.5rem)] leading-[1.08]"
          >
            A note from the creator
          </h2>
          <div className="mt-8">
            <CreatorNote />
          </div>
        </FadeIn>

        {/* Questions */}
        <FadeIn as="section" className="pt-32 md:pt-48">
          <h2
            id="faq"
            className="display mb-10 scroll-mt-24 text-[clamp(2.4rem,5.5vw,3.5rem)] leading-[1.08] md:mb-14"
          >
            Your questions, <em>answered.</em>
          </h2>
          <Faq />
        </FadeIn>

        {/* Feedback */}
        <FadeIn as="section" className="pb-24 pt-32 text-center md:pb-36 md:pt-48">
          <h2 className="display text-[clamp(2.4rem,5.5vw,3.5rem)] leading-[1.08]">
            We’re always open to feedback.
          </h2>
          <p className="lede mt-5 text-ink-soft">Email us at</p>
          <a
            id="contact"
            href={`mailto:${EMAIL}`}
            className="display text-link mt-1 inline-block break-all text-[clamp(1.6rem,4.5vw,2.5rem)] italic"
          >
            {EMAIL}
          </a>
        </FadeIn>
      </main>
    </>
  );
}
