/// app/course/section-4/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import SectionBlock from "@/components/SectionBlock";
import TextareaWithCount from "@/components/TextareaWithCount";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Milestones = {
  ventBuddyChosen: boolean;
  shapedAsk: boolean;
  healthAlly: boolean;
  connectedPeer: boolean;
  sharedSystem: boolean;
  reflectGaps: boolean;
};

export default function SectionFourPage() {
  // ----- Milestones (progress nudges; phrased as achievements)
  const [milestones, setMilestones] = useState<Milestones>({
    ventBuddyChosen: false,
    shapedAsk: false,
    healthAlly: false,
    connectedPeer: false,
    sharedSystem: false,
    reflectGaps: false,
  });

  // Load/persist to localStorage (so users can return later)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("section4:milestones");
      if (raw) setMilestones(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("section4:milestones", JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  // ----- Scroll progress (header stays sticky/visible)
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

  // Each achievement adds a small bonus; doesn’t force 100% if users simply scroll
  const bonusPct = useMemo(() => {
    let b = 0;
    if (milestones.ventBuddyChosen) b += 5.2;
    if (milestones.shapedAsk) b += 5.2;
    if (milestones.healthAlly) b += 5.2;
    if (milestones.connectedPeer) b += 5.2;
    if (milestones.sharedSystem) b += 5.2;
    if (milestones.reflectGaps) b += 5.2;
    return b;
  }, [milestones]);

  const effectiveProgress = Math.min(100, Math.max(scrollPct, bonusPct));

  return (
    <div
      ref={pageRef}
      style={{ backgroundColor: "rgba(236, 245, 243, 0.5)" }} // off-white with soft teal tint
      className="min-h-screen"
    >
      {/* Sticky progress header (always visible) */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(236,245,243,0.8)] backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-6 py-3 md:px-8">
          <div className="mb-1 flex items-center justify-between text-xs md:text-sm" style={{ color: NAVY }}>
            <span className="font-medium">Section 4 of 5</span>
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
            Section 4 – Building Your Support System
          </h1>
          <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            Being a carer is intensive, and it’s not sustainable to do everything alone. Setting up a support
            system for yourself helps prevent burnout and gives your loved one the best care you can offer.
            Think in three pillars: <strong>Emotional</strong>, <strong>Practical</strong>, and <strong>Informational</strong>.
            The steps below help you build each pillar steadily.
          </p>
        </SectionBlock>

        {/* Step 1: Emotional Support – Vent Buddy & Check-in Friend */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 1: Emotional Support – Vent Buddy & Check-in Friend
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Having a safe space for your feelings is foundational. When you can offload the weight you’re
            carrying, you’re better equipped to support your loved one.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
            <li><strong>Vent Buddy</strong> – someone you can talk to without judgment.</li>
            <li><strong>Check-in Friend</strong> – someone who agrees to message you once a week.</li>
          </ul>
          <p className="mt-2 opacity-90" style={{ color: NAVY }}>
            It helps to set a gentle reminder in both your calendars so these check-ins don’t slip. Think of
            one or two people you’d trust in these roles. If you feel ready, send them a quick message.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.ventBuddyChosen ? TEAL : "white",
                boxShadow: milestones.ventBuddyChosen ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.ventBuddyChosen}
              onChange={(e) => setMilestones((m) => ({ ...m, ventBuddyChosen: e.target.checked }))}
              aria-label="I know who my vent buddy and check-in friend could be."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I know who my vent buddy and check-in friend could be.
            </span>
          </label>
        </SectionBlock>

        {/* Step 2: Practical Support – Small Tasks Without Guilt */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2: Practical Support – Small Tasks Without Guilt
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            You’ll have plenty on your plate. Focusing on the important things means letting others take on
            some of the lighter tasks. Start by identifying 1–3 small, specific tasks someone could do:
            (e.g., cook a meal, do the school run, pick up groceries).
          </p>

          <div className="mt-4 max-w-[650px]">
            <TextareaWithCount
              id="tasks-list"
              label="List a few specific tasks others could help with:"
              placeholder="Cooking a meal, school run, supermarket trip…"
              storageKey="section4:tasksList"
              navy={NAVY}
            />
          </div>

          <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>Use the 3-Step Ask:</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5" style={{ color: NAVY }}>
              <li><strong>Be specific</strong>: “Could you cook a meal for us next Thursday?”</li>
              <li><strong>Be time-bound</strong>: “Just this once / once a month.”</li>
              <li><strong>Show why it helps</strong>: “It frees me up to focus on the appointment.”</li>
            </ol>
          </div>

          <div className="mt-4 max-w-[650px]">
            <TextareaWithCount
              id="shape-ask"
              label="Try shaping one ask below:"
              placeholder={`What?\nWhen?\nWhy?`}
              storageKey="section4:shapeAsk"
              navy={NAVY}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.shapedAsk ? TEAL : "white",
                boxShadow: milestones.shapedAsk ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.shapedAsk}
              onChange={(e) => setMilestones((m) => ({ ...m, shapedAsk: e.target.checked }))}
              aria-label="I now know how to shape a small ask."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I now know how to shape a small ask.
            </span>
          </label>
        </SectionBlock>

        {/* Step 3: Informational Support – Your Health Ally */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 3: Informational Support – Your Health Ally
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Sometimes medical information feels overwhelming. Having someone in your circle with health
            knowledge (a pharmacist, nurse, or GP friend) can boost your confidence before talking to doctors.
          </p>

          <div className="mt-4 max-w-[650px]">
            <TextareaWithCount
              id="health-ally-who"
              label="Who might you know with health knowledge?"
              placeholder="My pharmacist, a friend who is a nurse…"
              storageKey="section4:healthAllyWho"
              navy={NAVY}
            />
          </div>

          <p className="mt-2 opacity-90" style={{ color: NAVY }}>
            Don’t worry if nobody comes to mind right now; this can grow over time.
          </p>

          <div className="mt-4 max-w-[650px]">
            <TextareaWithCount
              id="health-ally-msg"
              label="If you’d like, prepare a message here:"
              placeholder={`“Sometimes the medical info feels overwhelming. Could I check in with you now and then so I’m clearer before speaking to the consultant?”`}
              storageKey="section4:healthAllyMsg"
              navy={NAVY}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.healthAlly ? TEAL : "white",
                boxShadow: milestones.healthAlly ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.healthAlly}
              onChange={(e) => setMilestones((m) => ({ ...m, healthAlly: e.target.checked }))}
              aria-label="I know how to reach out to a health ally and maybe who."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I know how to reach out to a health ally (and maybe who).
            </span>
          </label>
        </SectionBlock>

        {/* Step 4: Emotional & Informational – People Who “Get It” */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 4: Emotional & Informational – People Who “Get It”
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Other carers often understand you in ways others can’t. Shared experience reduces isolation and
            brings practical wisdom. Do you know someone who has been a carer? Note their name, or explore:
          </p>
          <ul className="mt-2 list-disc pl-5" style={{ color: NAVY }}>
            <li>
              <a
                href="https://community.macmillan.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: TEAL }}
              >
                Macmillan Online Community
              </a>
            </li>
            <li>
              <a
                href="https://forum.carersuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: TEAL }}
              >
                Carers UK Forum
              </a>
            </li>
          </ul>
          <p className="mt-2" style={{ color: NAVY }}>
            Even one conversation, coffee, or online chat can help.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.connectedPeer ? TEAL : "white",
                boxShadow: milestones.connectedPeer ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.connectedPeer}
              onChange={(e) => setMilestones((m) => ({ ...m, connectedPeer: e.target.checked }))}
              aria-label="I’ve connected with, or identified, someone who ‘gets it’."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve connected with, or identified, someone who “gets it”.
            </span>
          </label>
        </SectionBlock>

        {/* Step 5: Practical Support – Shared Systems */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 5: Practical Support – Shared Systems
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Juggling communication can be confusing. Simple systems make it easier:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
            <li>Create a group chat for quick updates.</li>
            <li>Add one recurring task (like weekly shopping) to a shared calendar.</li>
            <li>Rotate tasks monthly so no one feels overburdened.</li>
          </ul>
          <p className="mt-2 opacity-90" style={{ color: NAVY }}>
            Start small: even adding one or two people to a chat or calendar makes a difference.
          </p>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.sharedSystem ? TEAL : "white",
                boxShadow: milestones.sharedSystem ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.sharedSystem}
              onChange={(e) => setMilestones((m) => ({ ...m, sharedSystem: e.target.checked }))}
              aria-label="I’ve set up, or feel confident setting up, a shared system."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve set up, or feel confident setting up, a shared system.
            </span>
          </label>
        </SectionBlock>

        {/* Step 6: Developing Your Support System Over Time */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 6: Developing Your Support System Over Time
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Your support system won’t be perfect right away. Use your weekly review (from Section 2) to spot
            gaps and build deliberately.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5" style={{ color: NAVY }}>
            <li>“When did I feel most alone this week?”</li>
            <li>“What drained me that could have been shared?”</li>
          </ul>
          <p className="mt-2" style={{ color: NAVY }}>
            If you find a gap, decide which pillar it belongs to (Emotional, Practical, Informational), then
            return to the matching step to build it.
          </p>

          <div className="mt-4 max-w-[650px]">
            <TextareaWithCount
              id="gap-reflection"
              label="Capture one gap and where it belongs:"
              placeholder={`Gap I noticed: …\nPillar it belongs to (Emotional/Practical/Informational): …\nNext micro-step: …`}
              storageKey="section4:gapReflection"
              navy={NAVY}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.reflectGaps ? TEAL : "white",
                boxShadow: milestones.reflectGaps ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.reflectGaps}
              onChange={(e) => setMilestones((m) => ({ ...m, reflectGaps: e.target.checked }))}
              aria-label="I know how to reflect on gaps and build my support system gradually."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I know how to reflect on gaps and build my support system gradually.
            </span>
          </label>
        </SectionBlock>

        {/* Closing — only place for Section 5 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center leading-relaxed" style={{ color: NAVY }}>
            You now have the foundations of a comprehensive support system—people to lean on emotionally,
            practically, and informationally. This isn’t built in a day; it grows with you. By taking small steps,
            you’re already making caring easier on you and your loved one.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-5"
              className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
              style={{ backgroundColor: TEAL }}
            >
              Take me to Section 5
            </Link>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}
