// app/course/section-5/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import SectionBlock from "@/components/SectionBlock";
import { useAuth } from "@/components/useAuth";
import AutoSaveTextarea from "@/components/AutoSaveTextarea";
import FBSelect from "@/components/FBSelect";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Milestones = {
  legalStep: boolean;
  momentsIntentional: boolean;
  letterWritten: boolean;
};

export default function SectionFivePage() {
  const { user } = useAuth();
  const docPath = user ? `user_progress/${user.uid}/sections/section-5` : null;

  // Helper for textareas (gate behind sign-in)
  const Field: React.FC<{
    field: string;
    label: string;
    placeholder?: string;
    rows?: number;
  }> = ({ field, label, placeholder, rows = 6 }) => {
    if (!docPath) {
      return (
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium" style={{ color: NAVY }}>
            {label}
          </label>
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600">
            Sign in to save
          </div>
        </div>
      );
    }
    return (
      <AutoSaveTextarea
        key={`${docPath}:${field}`}
        docPath={docPath}
        field={field}
        label={label}
        placeholder={placeholder}
        rows={rows}
      />
    );
  };

  // Helper for selects: show dashed sign-in box if logged out; otherwise render FBSelect unchanged
  const SelectField: React.FC<{
    label: string;
    fieldKey: string;
    options: { value: string; label: string }[];
  }> = ({ label, fieldKey, options }) => {
    if (!docPath) {
      return (
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium" style={{ color: NAVY }}>
            {label}
          </label>
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600">
            Sign in to save
          </div>
        </div>
      );
    }
    // We keep FBSelect's existing API (sectionId/fieldKey) so your component logic continues to work.
    return (
      <FBSelect
        sectionId="section-5"
        fieldKey={fieldKey}
        label={label}
        navy={NAVY}
        options={options}
      />
    );
  };

  // ----- Milestones (progress nudges)
  const [milestones, setMilestones] = useState<Milestones>({
    legalStep: false,
    momentsIntentional: false,
    letterWritten: false,
  });

  // Load/persist milestones (local only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("section5:milestones");
      if (raw) setMilestones(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("section5:milestones", JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  // ----- Scroll progress (sticky header stays visible)
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

  // Subtle additive bonus for each milestone
  const bonusPct = useMemo(() => {
    let b = 0;
    if (milestones.legalStep) b += 7;
    if (milestones.momentsIntentional) b += 7;
    if (milestones.letterWritten) b += 7;
    return b;
  }, [milestones]);

  const effectiveProgress = Math.min(100, Math.max(scrollPct, bonusPct));

  return (
    <div
      ref={pageRef}
      style={{ backgroundColor: "rgba(236, 245, 243, 0.5)" }}
      className="min-h-screen"
    >
      {/* Sticky progress header (always visible) */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(236,245,243,0.8)] backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-6 py-3 md:px-8">
          <div className="mb-1 flex items-center justify-between text-xs md:text-sm" style={{ color: NAVY }}>
            <span className="font-medium">Section 5 of 5</span>
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
            Section 5 – Taking It Forward
          </h1>
          <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
            You’ve built systems, gathered tools, and practised new ways of caring. This final section ties
            it together and sends you off with confidence—a pocket-sized guide for the road ahead.
          </p>
        </SectionBlock>

        {/* Step 1: Legal and Admin */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 1: Legal and Admin
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            Legal and admin work can be daunting, but getting even one thing sorted can bring peace of mind.
            Every family’s situation is different, and readiness comes at different times. If you aren’t ready
            yet, that’s okay—come back when you are.
          </p>

          <h3 className="mt-4 text-lg font-semibold" style={{ color: NAVY }}>
            Here are four areas where you could start:
          </h3>

          <p className="mt-4 text-sm opacity-90" style={{ color: NAVY }}>
            For each, ask yourself: Do I know if this applies to us? (Yes / No / Unsure)
            Then choose one item you’re unsure about and write how you’ll find out (ask your GP, call Macmillan, check Citizens Advice).
          </p>

          <div className="mt-3 space-y-3">
            <SelectField
              fieldKey="poa"
              label="Power of Attorney (finance/health)"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Unsure", label: "Unsure" },
              ]}
            />
            <SelectField
              fieldKey="advance"
              label="Advance wishes (treatment preferences, DNACPR, etc.)"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Unsure", label: "Unsure" },
              ]}
            />
            <SelectField
              fieldKey="benefits"
              label="Benefits & entitlements (Carer’s Allowance, blue badge, travel help)"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Unsure", label: "Unsure" },
              ]}
            />
            <SelectField
              fieldKey="wills"
              label="Wills & inheritance"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Unsure", label: "Unsure" },
              ]}
            />
          </div>

          <div className="mt-4 max-w-[650px]">
            <Field
              field="legalFollowUp"
              label="Item I’ll follow up on + how I’ll do it:"
              placeholder="e.g. Blue badge — call council helpline; Power of Attorney — check gov.uk guidance, ask CNS for signposting…"
              rows={6}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.legalStep ? TEAL : "white",
                boxShadow: milestones.legalStep ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.legalStep}
              onChange={(e) => setMilestones((m) => ({ ...m, legalStep: e.target.checked }))}
              aria-label="I’ve taken one step towards peace of mind."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve taken one step towards peace of mind.
            </span>
          </label>
        </SectionBlock>

        {/* Step 2: Cherish the Moments */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 2: Cherish the Moments
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            It’s easy to get caught up in tasks. Be intentional about time to simply be with your loved one—the
            little moments carry you through the hardest days.
          </p>

          <div className="mt-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>Moments That Matter</h3>
            <p className="mt-2" style={{ color: NAVY }}>
              Write down 3 types of moments you most want to make space for (quiet tea, music, favourite show, short walk…).
              Add a simple reminder (phone, calendar, sticky note). Vary them: daily, weekly, or with others.
            </p>
          </div>

          <div className="mt-4 max-w-[650px]">
            <Field
              field="moments"
              label="My moments:"
              placeholder="Tea together, music, evening walk…"
              rows={6}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.momentsIntentional ? TEAL : "white",
                boxShadow: milestones.momentsIntentional ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.momentsIntentional}
              onChange={(e) =>
                setMilestones((m) => ({ ...m, momentsIntentional: e.target.checked }))
              }
              aria-label="I am intentional about my “Moments That Matter”."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I am intentional about my “Moments That Matter”.
            </span>
          </label>
        </SectionBlock>

        {/* Step 3: Letter to Future Me */}
        <SectionBlock>
          <h2 className="text-2xl font-semibold md:text-[28px]" style={{ color: NAVY }}>
            Step 3: Letter to Future Me
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            There will be tough days. A few lines in your own words can steady you. Pin it up, save it on your
            phone, or keep it in your wallet.
          </p>

          <div className="mt-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <ul className="list-disc space-y-2 pl-5" style={{ color: NAVY }}>
              <li>What I want to remember when things get tough</li>
              <li>One strength I know I have</li>
              <li>One thing I’ll keep doing for myself</li>
            </ul>
            <p className="mt-2 text-sm opacity-90" style={{ color: NAVY }}>
              (Invite your loved one to add a short line for you, if you like.)
            </p>
          </div>

          <div className="mt-4 max-w-[650px]">
            <Field
              field="futureLetter"
              label="My three lines:"
              placeholder="Line 1 / Line 2 / Line 3 / Line 4"
              rows={6}
            />
          </div>

          <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
              style={{
                backgroundColor: milestones.letterWritten ? TEAL : "white",
                boxShadow: milestones.letterWritten ? "inset 0 0 0 2px white" : "none",
              }}
              checked={milestones.letterWritten}
              onChange={(e) => setMilestones((m) => ({ ...m, letterWritten: e.target.checked }))}
              aria-label="I’ve written my Letter to Future Me."
            />
            <span className="text-[15px]" style={{ color: NAVY }}>
              I’ve written my Letter to Future Me.
            </span>
          </label>
        </SectionBlock>

        {/* Closing — only place for Finish CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center leading-relaxed" style={{ color: NAVY }}>
            This guide has given you tools, systems, and confidence. Start small, keep what helps, and adapt as
            you go. Remind yourself that you are not alone. You already carry more strength and wisdom than you may realise.
            We wish you steadiness and moments of peace as you go forward.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/finish"
              className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
              style={{ backgroundColor: TEAL }}
            >
              Finish Guide
            </Link>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}
