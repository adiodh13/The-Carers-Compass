// app/course/section-3/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import SectionBlock from "@/components/SectionBlock";
import TextareaWithCount from "@/components/TextareaWithCount";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Milestones = {
  timesSet: boolean;
  baselineSources: boolean;
  use3Cs: boolean;
  keepRelevant: boolean;
  summarised: boolean;
};

export default function SectionThreePage() {
  // ----- Milestones (for gentle progress nudges)
  const [milestones, setMilestones] = useState<Milestones>({
    timesSet: false,
    baselineSources: false,
    use3Cs: false,
    keepRelevant: false,
    summarised: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("section3:milestones");
      if (raw) setMilestones(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("section3:milestones", JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  // ----- Scroll progress (sticky header stays in view)
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!pageRef.current) return;
      const total = pageRef.current.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Small additive bonuses from checkboxes
  const bonusPct = useMemo(() => {
    let b = 0;
    if (milestones.timesSet) b += 5.5;
    if (milestones.baselineSources) b += 5.5;
    if (milestones.use3Cs) b += 5.5;
    if (milestones.keepRelevant) b += 5.5;
    if (milestones.summarised) b += 5.5;
    return b;
  }, [milestones]);

  const effectiveProgress = Math.min(100, Math.max(scrollPct, bonusPct));

  return (
    <div
      ref={pageRef}
      style={{ backgroundColor: "rgba(236, 245, 243, 0.5)" }} // off-white with soft teal tint
      className="min-h-screen"
    >
      {/* Sticky progress header */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(236,245,243,0.8)] backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-6 py-3 md:px-8">
          <div className="mb-1 flex items-center justify-between text-xs md:text-sm" style={{ color: NAVY }}>
            <span className="font-medium">Section 3 of 5</span>
            <span aria-live="polite">{Math.round(effectiveProgress)}%</span>
          </div>
          <ProgressBar value={effectiveProgress} barColor={TEAL} />
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-28 pt-6 md:px-8">
        {/* Intro */}
        <SectionBlock>
          <h1 className="text-3xl font-semibold leading-snug md:text-4xl" style={{ color: NAVY }}>
            Section 3: Building Your Knowledge Base
          </h1>
          <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            As a primary carer, you’ll naturally want to understand more about your loved one’s condition
            and how best to help them. Learning can make you feel more confident and work better with doctors.
            There is also a risk: research rabbit holes, conflicting information, and overwhelm. With the right
            system, you can learn without exhausting yourself. This section shows you how to build knowledge in
            a way that supports your loved one’s care while keeping you steady.
          </p>
        </SectionBlock>

        {/* Step 1: Pick your learning time */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 1: Pick your learning time
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Short, focused bursts work best: 30–60 minutes, a couple of times a week. Choose times that fit your
            schedule. Set a timer so you don’t go over. When your session ends, wrap up with Steps 4 & 5 below,
            then leave the room and do something different—this makes stopping easier.
          </p>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="learning-times"
              label='When do you want your learning windows to be?'
              placeholder="e.g. Tuesday evenings, Saturday mornings"
              storageKey="section3:times"
              navy={NAVY}
            />
          </div>

          <p className="mt-2 text-sm opacity-90" style={{ color: NAVY }}>
            Don’t forget to add reminders: alarms, calendar alerts, or sticky notes.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.timesSet ? TEAL : "white",
                boxShadow: milestones.timesSet ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.timesSet}
              onChange={(e) => setMilestones((m) => ({ ...m, timesSet: e.target.checked }))}
              aria-label="I have established my dedicated learning times."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I have established my dedicated learning times.
            </span>
          </label>
        </SectionBlock>

        {/* Step 2: Choose your trusted sources */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2: Choose your trusted sources
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Having a baseline of trusted sources protects you from misinformation and conflicting claims. Pick
            3–5 sources you’ll rely on first. If you’re not sure where to begin, these are safe places to start:
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ResourceCard
              name="NHS Website"
              desc="Official UK health information and guidance."
              href="https://www.nhs.uk/"
              navy={NAVY}
              teal={TEAL}
            />
            <ResourceCard
              name="Macmillan Cancer Support"
              desc="Reliable info plus helpline and local services."
              href="https://www.macmillan.org.uk/"
              navy={NAVY}
              teal={TEAL}
            />
            <ResourceCard
              name="Maggie’s"
              desc="In-person centres, courses and practical support."
              href="https://www.maggies.org/"
              navy={NAVY}
              teal={TEAL}
            />
            <ResourceCard
              name="Cancer Research UK"
              desc="Evidence-based information on cancer types & treatment."
              href="https://www.cancerresearchuk.org/"
              navy={NAVY}
              teal={TEAL}
            />
          </div>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="baseline-sources"
              label="What are your trusted sources?"
              placeholder="List 3–5 trusted sources"
              storageKey="section3:baseline"
              navy={NAVY}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.baselineSources ? TEAL : "white",
                boxShadow: milestones.baselineSources ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.baselineSources}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, baselineSources: e.target.checked }))
              }
              aria-label="I know my baseline trusted sources."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I know my baseline trusted sources.
            </span>
          </label>
        </SectionBlock>

        {/* Step 3: Evaluating information (3C Test) */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 3: Evaluating information
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            It’s fine to go beyond your baseline sources. But when you do, be more critical.
          </p>

          <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
              Try using the 3C Test:
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
              <MiniCard
                title="Check the source"
                icon="🔎"
                desc="Who wrote it? Recognised charity/hospital/professional? If anonymous or salesy—treat with caution."
                navy={NAVY}
              />
              <MiniCard
                title="Compare with baseline"
                icon="📚"
                desc="Does it match NHS, Macmillan, Maggie’s, CRUK? If not, flag it for your clinical team."
                navy={NAVY}
              />
              <MiniCard
                title="Confirm before you act"
                icon="✅"
                desc="Never change meds/diet/care without medical advice. Use new info as questions, not instructions."
                navy={NAVY}
              />
            </div>
          </div>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="3cs"
              label="Have a go yourself. If you’ve found something outside your trusted sources, run it through the 3Cs:"
              placeholder={`Check:\nCompare:\nConfirm:`}
              storageKey="section3:3cs"
              navy={NAVY}
            />
          </div>

          <p className="mt-2 text-sm opacity-90" style={{ color: NAVY }}>
            If you don’t have anything yet, that’s fine. Just remember this tool for later.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.use3Cs ? TEAL : "white",
                boxShadow: milestones.use3Cs ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.use3Cs}
              onChange={(e) => setMilestones((m) => ({ ...m, use3Cs: e.target.checked }))}
              aria-label="I can use the 3Cs to evaluate new information."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I can use the 3Cs to evaluate new information.
            </span>
          </label>
        </SectionBlock>

        {/* Step 4: Keeping it relevant */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 4: Keeping it relevant
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            The goal of learning is to make life easier for you and your loved one. Avoid drifting into
            detail that doesn’t help you day to day.
          </p>
          <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <ul className="list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              <li>What does this mean in plain words?</li>
              <li>Does this matter for us now, or later?</li>
              <li>What action (if any) should I take?</li>
            </ul>
          </div>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="relevance"
              label="Try it now with something you’ve read recently:"
              placeholder={`Plain words: …\nMatters now or later: …\nAction: …`}
              storageKey="section3:relevance"
              navy={NAVY}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.keepRelevant ? TEAL : "white",
                boxShadow: milestones.keepRelevant ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.keepRelevant}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, keepRelevant: e.target.checked }))
              }
              aria-label="I can identify how to use what I learn."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I can identify how to use what I learn.
            </span>
          </label>

          <p className="mt-2 text-sm italic opacity-90" style={{ color: NAVY }}>
            Tip: To make this a habit, run through these three questions at the end of each learning session.
          </p>
        </SectionBlock>

        {/* Step 5: Remembering and understanding */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 5: Remembering and understanding
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            To make your learning stick, summarise in your own words at the end of each session. If you notice gaps,
            write down your questions for your next appointment or session.
          </p>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="summary"
              label="Have a go now: write one thing you’ve learned recently, in your own words."
              placeholder="My summary…"
              storageKey="section3:summary"
              navy={NAVY}
            />
          </div>

          <p className="mt-2 text-sm opacity-90" style={{ color: NAVY }}>
            If you’re unsure what to summarise, try summarising what you learned in this section.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.summarised ? TEAL : "white",
                boxShadow: milestones.summarised ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.summarised}
              onChange={(e) => setMilestones((m) => ({ ...m, summarised: e.target.checked }))}
              aria-label="I have closed a learning session by summarising."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I have closed a learning session by summarising.
            </span>
          </label>
        </SectionBlock>

        {/* Closing Section — ONLY place for the Section 4 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center leading-relaxed" style={{ color: NAVY }}>
            You now have a system to learn without burning out:
            <br />
            Set clear times for learning • Rely on trusted sources • Use the 3Cs • Keep it relevant • Summarise
            <br />
            This isn’t about knowing everything at once—it’s about steadily building the knowledge you need, when you need it.
            You can be confident that you’ll always have a way to find and make sense of the right information.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/Course/section-4"
              className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
              style={{ backgroundColor: TEAL }}
            >
              Take me to Section 4
            </Link>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}
