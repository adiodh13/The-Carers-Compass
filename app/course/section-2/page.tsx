// app/course/section-2/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import SectionBlock from "@/components/SectionBlock";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";
import CopyChecklistButton from "@/components/CopyChecklistButton";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Milestones = {
  knowContacts: boolean;
  use3Ns: boolean;
  chosenLog: boolean;
  weeklyReviewSet: boolean;
  hasSupport: boolean;
};

const WEEKLY_REVIEW = [
  "Your current questions and answers",
  "Any new symptoms or changes",
  "Next steps or appointments coming up",
];

export default function SectionTwoPage() {

  // ----- Milestones (nudge progress) -----
  const [milestones, setMilestones] = useState<Milestones>({
    knowContacts: false,
    use3Ns: false,
    chosenLog: false,
    weeklyReviewSet: false,
    hasSupport: false,
  });

  // Load/persist to localStorage (milestones only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("section2:milestones");
      if (raw) setMilestones(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("section2:milestones", JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  // ----- Scroll progress -----
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

  // Each milestone gives a small additive bonus (subtle, motivating)
  const bonusPct = useMemo(() => {
    let b = 0;
    if (milestones.knowContacts) b += 5.5;
    if (milestones.use3Ns) b += 5.5;
    if (milestones.chosenLog) b += 5.5;
    if (milestones.weeklyReviewSet) b += 5.5;
    if (milestones.hasSupport) b += 5.5;
    return b;
  }, [milestones]);

  const effectiveProgress = Math.min(100, Math.max(scrollPct, bonusPct));

  // ----- UI State -----
  const [showWhyHard, setShowWhyHard] = useState(false);

  return (
    <div
      ref={pageRef}
      style={{ backgroundColor: "rgba(236, 245, 243, 0.5)" }}
      className="min-h-screen"
    >
      {/* Sticky progress header (always visible) */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(236,245,243,0.8)] backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-6 py-3 md:px-8">
          <div
            className="mb-1 flex items-center justify-between text-xs md:text-sm"
            style={{ color: NAVY }}
          >
            <span className="font-medium">Section 2 of 5</span>
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
            Section 2: Mapping the Road Ahead
          </h1>
          <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            After the first shock of diagnosis, one of the most grounding things you can do is
            get a sense of what’s coming next. Not every detail, but enough to know where you
            are, what the immediate steps are, and how to prepare for them. Clarity on the next
            30 days gives you confidence, helps you spot potential challenges early, and makes it
            easier to support your loved one.
          </p>
          <GuideActions title="Section 2: Mapping the Road Ahead" />
        </SectionBlock>

        {/* Step 1: Know who can give you the answers */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 1: Know who can give you the answers
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            The first step is being clear on who you can turn to when you have questions:
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <MiniCard
              title="Consultant / Oncologist"
              icon="🩺"
              desc="Explains diagnosis, treatment options, and expected outcomes."
              navy={NAVY}
            />
            <MiniCard
              title="Clinical Nurse Specialist (CNS)"
              icon="👩‍⚕️"
              desc="Translates medical info, explains next steps, helps you navigate hospital processes."
              navy={NAVY}
            />
            <MiniCard title="GP" icon="🏥" desc="Supports overall health and liaises with hospital teams." navy={NAVY} />
            <MiniCard title="Support Worker" icon="🤝" desc="Connects you with charities, benefits, and community help." navy={NAVY} />
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="If you don’t already know their names or contact details, note them down somewhere you can easily find later:"
            />
          </div>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.knowContacts ? TEAL : "white",
                boxShadow: milestones.knowContacts ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.knowContacts}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, knowContacts: e.target.checked }))
              }
              aria-label="I now know who I can ask for different kinds of questions."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I now know who I can ask for different kinds of questions.
            </span>
          </label>
        </SectionBlock>

        {/* Step 2a: Why it feels hard to ask questions */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2a: Why it feels hard to ask questions
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Even when carers know who to ask, many still hesitate. This is completely normal.
          </p>

          <button
            onClick={() => setShowWhyHard((s) => !s)}
            className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
            style={{ backgroundColor: TEAL }}
            aria-expanded={showWhyHard}
          >
            {showWhyHard ? "Hide common reasons" : "Here are some common reasons"}
          </button>

          {showWhyHard && (
            <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <ul className="list-disc space-y-2 pl-5" style={{ color: NAVY }}>
                <li><strong>Ego/pride</strong> – “I should already understand this.”</li>
                <li><strong>Embarrassment</strong> – “I’ll look stupid or annoy them.”</li>
                <li><strong>Overwhelm</strong> – “I’m too drained to think of what to say.”</li>
                <li><strong>Power imbalance</strong> – “I feel intimidated by doctors or nurses.”</li>
              </ul>
              <p className="mt-3 italic" style={{ color: NAVY }}>
                There are no silly questions. Consultants and nurses expect to explain things
                more than once. It’s their job, and they don’t see it as a burden.
              </p>
            </div>
          )}
        </SectionBlock>

        {/* Step 2b: How to overcome resistance (3 Ns) */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2b: How to overcome resistance
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            If you feel resistance to asking, try the <strong>3 N’s</strong> technique:
          </p>
          <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <ol className="list-decimal space-y-2 pl-5" style={{ color: NAVY }}>
              <li>
                <strong>Name</strong> the question → write it down or say it out loud.
                <div className="mt-1 text-sm opacity-90">Example: “Can this medication cause drowsiness?”</div>
              </li>
              <li>
                <strong>Notice</strong> the resistance → ask yourself: “What’s holding me back from asking this?”
                (e.g. “I don’t want to look stupid.” / “The doctors are busy.” / “I should already know this.”)
              </li>
              <li>
                <strong>Neutralise</strong> the resistance → reality check each thought
                (e.g. “It’s part of their job to answer.” / “Better to clarify than risk a mistake.” / “Nobody can know everything.”)
              </li>
            </ol>
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Have a go at practising this now with one of your current questions:"
              hint={`Name:\nNotice:\nNeutralise:`}
            />
          </div>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.use3Ns ? TEAL : "white",
                boxShadow: milestones.use3Ns ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.use3Ns}
              onChange={(e) => setMilestones((m) => ({ ...m, use3Ns: e.target.checked }))}
              aria-label="I can use the 3 N’s to help me ask my questions."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I can use the 3 N’s to help me ask my questions.
            </span>
          </label>
        </SectionBlock>

        {/* Step 2c: Practical tips */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2c: Practical tips for asking questions
          </h2>
          <div className="mt-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <ul className="list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              <li>Write your questions down in advance.</li>
              <li>Frame it as teamwork: “To support [loved one’s name] properly, I want to check I’ve got this right…”</li>
              <li>Use the repeat-back method: “So just to be clear, the next step is X?”</li>
              <li>Bring someone with you: a second set of ears can boost confidence.</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Step 3: Organising your plan */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 3: Organising your plan
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            The key is to keep everything in one central place. Pick whatever feels most natural to you.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <MiniCard title="Notebook" icon="📓" desc="A single place for notes & questions." navy={NAVY} />
            <MiniCard title="Folder" icon="📂" desc="Store letters, leaflets, printouts." navy={NAVY} />
            <MiniCard title="Notes app" icon="📱" desc="Always with you; quick to update." navy={NAVY} />
          </div>

          <div className="mt-5 rounded-xl bg[rgba(49,132,132,0.08)] p-4 ring-1 ring-[rgba(49,132,132,0.2)]">
            <p className="leading-relaxed italic" style={{ color: NAVY }}>
              Helpful resource (UK): Cancer Research UK offers a free treatment record booklet.
            </p>
            <div className="mt-2">
              <ResourceCard
                name="CRUK Treatment Record Booklet"
                desc="Download the booklet to keep track of treatment details."
                href="https://publications.cancerresearchuk.org/products/your-cancer-treatment-record"
                navy={NAVY}
                teal={TEAL}
              />
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.chosenLog ? TEAL : "white",
                boxShadow: milestones.chosenLog ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.chosenLog}
              onChange={(e) => setMilestones((m) => ({ ...m, chosenLog: e.target.checked }))}
              aria-label="I have chosen a way to keep track of things more easily."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I have chosen a way to keep track of things more easily.
            </span>
          </label>

          <div className="mt-5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
              What to use this for:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              <li>Notes from appointments</li>
              <li>Recording symptoms</li>
              <li>Writing down questions (and answers)</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Step 4: Weekly review */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 4: Reviewing what you know
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            It’s easy to get lost in the flood of information, but a weekly review keeps you steady.
            Set a time that works best for you. You could use a phone alarm, calendar event, or sticky note reminder.
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="What day/time will you use for your weekly review?"
              hint="e.g., Sunday at 6:30pm"
            />
          </div>

          <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
              During your review, check:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              {WEEKLY_REVIEW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-4">
              <CopyChecklistButton title="Weekly review checklist" items={WEEKLY_REVIEW} />
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.weeklyReviewSet ? TEAL : "white",
                boxShadow: milestones.weeklyReviewSet ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.weeklyReviewSet}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, weeklyReviewSet: e.target.checked }))
              }
              aria-label="I’ve set up a weekly review reminder."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve set up a weekly review reminder.
            </span>
          </label>
        </SectionBlock>

        {/* Step 5: Staying on top of things together */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 5: Staying on top of things together
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Having someone else up to speed can give you confidence and catch details you might miss.
            Consider whether there’s a trusted person you’d like to keep in the loop. If they’re open,
            they can help double-check your notes and progress.
          </p>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.hasSupport ? TEAL : "white",
                boxShadow: milestones.hasSupport ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.hasSupport}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, hasSupport: e.target.checked }))
              }
              aria-label="I know who I could ask to support me."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I know who I could ask to support me.
            </span>
          </label>

          <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
              Extra tips for staying steady:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              <li>Summarise what you think you heard at the end of meetings and confirm.</li>
              <li>Ask: “What are the top three things I should focus on right now?”</li>
              <li>Note down questions that come later and call/email your CNS or GP.</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Closing Section — ONLY place for the Section 3 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center leading-relaxed" style={{ color: NAVY }}>
            You’ve just learned practical ways to ask better questions, organise your plan, and
            stay on top of things with support. Remember, these are habits you can return to anytime
            as your loved one’s treatment continues.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-3"
              className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
              style={{ backgroundColor: TEAL }}
            >
              Take me to Section 3
            </Link>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}
