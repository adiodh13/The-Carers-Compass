// app/course/section-1/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import SectionBlock from "@/components/SectionBlock";
import TextareaWithCount from "@/components/TextareaWithCount";
import Collapse from "@/components/Collapse";
import TechniqueCard from "@/components/TechniqueCard";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Milestones = {
  calmingTried: boolean;
  smallStepTaken: boolean;
};

export default function SectionOnePage() {
  // Track milestones to nudge progress
  const [milestones, setMilestones] = useState<Milestones>({
    calmingTried: false,
    smallStepTaken: false,
  });

  // Persist milestone state (simple localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("section1:milestones");
      if (raw) setMilestones(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("section1:milestones", JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  // Scroll progress
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!pageRef.current) return;
      const total =
        pageRef.current.scrollHeight - window.innerHeight;
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

  // Each milestone adds a small bonus
  const bonusPct = useMemo(() => {
    let bonus = 0;
    if (milestones.calmingTried) bonus += 7.5;
    if (milestones.smallStepTaken) bonus += 7.5;
    return bonus;
  }, [milestones]);

  const effectiveProgress = Math.min(100, Math.max(scrollPct, bonusPct));

  // Calming techniques collapse state
  const [showTechniques, setShowTechniques] = useState(false);

  return (
    <div
      ref={pageRef}
      style={{ backgroundColor: "rgba(236, 245, 243, 0.5)" }} // off-white with soft teal tint
      className="min-h-screen"
    >
      {/* --- STICKY PROGRESS HEADER (always visible) --- */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(236,245,243,0.8)] backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-6 py-3 md:px-8">
          <div className="mb-1 flex items-center justify-between text-xs md:text-sm" style={{ color: NAVY }}>
            <span className="font-medium">Section 1 of 5</span>
            <span aria-live="polite">{Math.round(effectiveProgress)}%</span>
          </div>
          <ProgressBar value={effectiveProgress} barColor={TEAL} />
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-28 pt-6 md:px-8">
        {/* Hero / Section Intro */}
        <SectionBlock>
          <h1
            className="text-3xl font-semibold leading-snug md:text-4xl"
            style={{ color: NAVY }}
          >
            Section 1: Steadying Yourself for the Road Ahead
          </h1>
          <h2
            className="mt-3 text-xl font-semibold md:text-2xl"
            style={{ color: NAVY }}
          >
            Step 1: Finding Clarity in a Storm
          </h2>
          <p className="mt-5 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            When someone you love is diagnosed with cancer, your mind can feel like a
            crowded room where thoughts and worries all speak at once. The first step
            isn’t to solve everything. It’s simply to notice what’s happening inside you.
            <br />
            <br />
            Before we begin, let’s take 30 seconds together to pause:
          </p>

          {/* Grounding Exercise Card */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start gap-5">
              {/* Animated breathing circle */}
              <div className="hidden h-16 w-16 flex-none animate-breathe rounded-full bg-[rgba(49,132,132,0.15)] md:block" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                  Quick Grounding Exercise (30 seconds)
                </h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5" style={{ color: NAVY }}>
                  <li>Breathe in slowly through your nose for 4 seconds.</li>
                  <li>Hold that breath for 4 seconds.</li>
                  <li>Exhale gently through your mouth for 4 seconds.</li>
                  <li>Pause for 4 seconds.</li>
                  <li>Repeat once more.</li>
                </ol>
                <p className="mt-3 italic" style={{ color: NAVY }}>
                  Notice how even two rounds of this can soften the edges a little.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            Now, let’s begin reflecting. You’ll see some prompts below. You don’t need to
            answer them all right now; even completing one or two can help. There are no
            wrong answers. Getting thoughts out of your head and onto a page (or into a
            recording) makes them visible and easier to handle. You can type in the box,
            write on paper, or record your voice. The best way is whatever feels most
            natural to you.
          </p>

          {/* Reflection Prompts - Two collapsible groups */}
          <div className="mt-6 space-y-6">
            <Collapse title="Questions, worries and emotions">
              <div className="space-y-5">
                <TextareaWithCount
                  id="q1"
                  label="What questions do I have right now?"
                  storageKey="section1:q1"
                  navy={NAVY}
                />
                <TextareaWithCount
                  id="q2"
                  label="What is worrying me the most at this moment?"
                  storageKey="section1:q2"
                  navy={NAVY}
                />
                <TextareaWithCount
                  id="q3"
                  label="What emotions am I feeling?"
                  storageKey="section1:q3"
                  navy={NAVY}
                />
              </div>
            </Collapse>

            <Collapse title="Stray thoughts, talking to someone and Next steps">
              <div className="space-y-5">
                <TextareaWithCount
                  id="q4"
                  label="Are there any stray thoughts worth noting down, even if they seem small or random?"
                  storageKey="section1:q4"
                  navy={NAVY}
                />
                <TextareaWithCount
                  id="q5"
                  label="Do I want to talk to someone (professional or otherwise)? What would I like to say?"
                  storageKey="section1:q5"
                  navy={NAVY}
                />
                <TextareaWithCount
                  id="q6"
                  label="Were we told or recommended to do anything next?"
                  storageKey="section1:q6"
                  navy={NAVY}
                />
              </div>
            </Collapse>
            <p className="text-sm" style={{ color: NAVY }}>
              Remember: you can come back and add more at any time.
            </p>
          </div>

          {/* Resource Links */}
          <div className="mt-8">
            <p className="mb-4 text-sm" style={{ color: NAVY }}>
              If you’d prefer to talk instead of write, these resources are here whenever you need them:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResourceCard
                name="Maggie’s Centres"
                desc="Free support and drop-in locations."
                href="https://www.maggies.org/"
                navy={NAVY}
                teal={TEAL}
              />
              <ResourceCard
                name="Macmillan Cancer Support"
                desc="Helpline & local opportunities."
                href="https://community.macmillan.org.uk/"
                navy={NAVY}
                teal={TEAL}
              />
              <ResourceCard
                name="Samaritans"
                desc="24/7 listening line."
                href="https://www.samaritans.org/how-we-can-help/contact-samaritan/"
                navy={NAVY}
                teal={TEAL}
              />
            </div>
          </div>
        </SectionBlock>

        {/* Step 2: Calming Panic */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2: Calming Panic When It Arises
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Moments of panic or anxiety are normal. Your heart may race, your chest may feel
            tight, or your thoughts may spiral. You are not alone in this. And the good news is:
            there are simple ways to calm your body and mind.
          </p>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="reflect-anxiety"
              label="Reflection first: When I feel anxious, what do I usually do?"
              storageKey="section1:anxiety"
              navy={NAVY}
            />
          </div>

          <button
            onClick={() => setShowTechniques((s) => !s)}
            className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
            style={{ backgroundColor: TEAL }}
            aria-expanded={showTechniques}
          >
            {showTechniques ? "Hide calming techniques" : "Show me calming techniques"}
          </button>

          {showTechniques && (
            <div className="mt-6 space-y-4">
              <TechniqueCard
                title="Box Breathing (under 1 minute)"
                steps={["Inhale through your nose for 4 seconds.", "Hold your breath for 4.", "Exhale through your mouth for 4.", "Pause for 4."]}
                subtext="Just 3 rounds can calm your body’s stress response."
                navy={NAVY}
              />
              <TechniqueCard
                title="Grounding with Your Senses (2 minutes)"
                steps={[
                  "Name 5 things you can see.",
                  "4 things you can feel.",
                  "3 things you can hear.",
                  "2 things you can smell.",
                  "1 thing you can taste.",
                ]}
                subtext="This pulls you back from spiralling thoughts into the present moment."
                navy={NAVY}
              />
              <TechniqueCard
                title="Quick Muscle Release (1–2 minutes)"
                steps={[
                  "Tighten your shoulders for 5 seconds, then let go.",
                  "Clench your fists, then release.",
                  "Press your jaw shut, then relax.",
                ]}
                subtext="Letting your muscles soften helps your mind follow."
                navy={NAVY}
              />
            </div>
          )}

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="peer h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.calmingTried ? TEAL : "white",
                boxShadow: milestones.calmingTried ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.calmingTried}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, calmingTried: e.target.checked }))
              }
              aria-label="I’ve tried a calming technique."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve tried a calming technique.
            </span>
          </label>
        </SectionBlock>

        {/* Step 3: Taking Small Steps */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 3: Taking Small Steps Forward
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Overwhelm grows when everything feels too big. The antidote is starting small. Tiny
            steps may feel almost trivial, but they shift you from frozen to moving. Have a look
            back at your reflections. Choose 1–3 small, low-effort steps you could take today.
          </p>

          {/* Examples mini-cards */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <MiniCard
              title="Emotional"
              icon="💬"
              desc="Send a short text to a friend."
              navy={NAVY}
            />
            <MiniCard
              title="Practical"
              icon="🗓️"
              desc="Put tomorrow’s appointment letter in your bag."
              navy={NAVY}
            />
            <MiniCard
              title="Self-care"
              icon="❤️"
              desc="Drink a glass of water or step outside for fresh air."
              navy={NAVY}
            />
          </div>

          {/* Tip box */}
          <div className="mt-5 rounded-xl bg-[rgba(49,132,132,0.08)] p-4 ring-1 ring-[rgba(49,132,132,0.2)]">
            <p className="italic leading-relaxed" style={{ color: NAVY }}>
              Tip: Try turning one of your ideas into an “If–then” plan:
              <br />
              “If I feel panic rising, then I will try 2 rounds of box breathing.”
              <br />
              “If–then” plans give you a ready-made action when your mind feels stuck. You can
              reuse them anytime…
            </p>
          </div>

          <div className="mt-5 max-w-[650px]">
            <TextareaWithCount
              id="small-steps"
              label="Jot down 1 to 3 steps here. They don’t have to be perfect:"
              placeholder="Write your small steps here…"
              storageKey="section1:smallsteps"
              navy={NAVY}
            />
          </div>

          <label className="mt-6 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="peer h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.smallStepTaken ? TEAL : "white",
                boxShadow: milestones.smallStepTaken ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.smallStepTaken}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, smallStepTaken: e.target.checked }))
              }
              aria-label="I have taken at least one small step to steady myself."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I have taken at least one small step to steady myself.
            </span>
          </label>
        </SectionBlock>

        {/* Closing Section — the ONLY place the Section 2 CTA appears */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center leading-relaxed" style={{ color: NAVY }}>
            You’ve just done some of the hardest work: pausing, calming, and starting to sort
            through the noise. This isn’t about fixing everything today. It’s about building a
            steady foundation for what comes next.
            <br />
            <br />
            When you’re ready, move on to Section 2.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/Course/section-2"
              className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
              style={{ backgroundColor: TEAL }}
            >
              Take me to Section 2
            </Link>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}
