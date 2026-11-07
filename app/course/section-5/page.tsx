// app/course/section-5/page.tsx
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";
import CopyChecklistButton from "@/components/CopyChecklistButton";

const LEGAL_AREAS = [
  "Power of Attorney (finance/health)",
  "Advance wishes (treatment preferences, DNACPR, etc.)",
  "Benefits & entitlements (Carer’s Allowance, blue badge, travel help)",
  "Wills & inheritance",
];

export default function SectionFivePage() {

  return (
    <article className="stage">

        {/* Intro */}
        <SectionBlock>
          <h1 className="stage-title">
            <span className="stage-eyebrow">Section 5</span>
            Taking It Forward
          </h1>
          <p className="mt-4 max-w-[650px]">
            You’ve built systems, gathered tools, and practised new ways of caring. This final section ties
            it together and sends you off with confidence: a pocket-sized guide for the road ahead.
          </p>
          <GuideActions title="Section 5: Taking It Forward" />
        </SectionBlock>

        {/* Step 1: Legal and Admin */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 1: Legal and Admin
          </h2>
          <p className="mt-3">
            Legal and admin work can be daunting, but getting even one thing sorted can bring peace of mind.
            Every family’s situation is different, and readiness comes at different times. If you aren’t ready
            yet, that’s okay. Come back when you are.
          </p>

          <h3 className="mt-4 stage-sub">
            Here are four areas where you could start:
          </h3>

          <p className="mt-4 text-[1.1rem] opacity-90">
            For each, ask yourself: Do I know if this applies to us? (Yes / No / Unsure)
            Then choose one item you’re unsure about and write how you’ll find out (ask your GP, call Macmillan, check Citizens Advice).
          </p>

          <ul className="panel mt-3 list-disc space-y-2 pl-10">
            {LEGAL_AREAS.map((area) => (
              <li key={area}>
                {area}
                <span className="ml-2 italic text-ink-soft">Yes / No / Unsure</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <CopyChecklistButton
              title="Legal and admin: does this apply to us? (Yes / No / Unsure)"
              items={LEGAL_AREAS}
            />
          </div>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="Item I’ll follow up on + how I’ll do it:"
              hint="e.g. Blue badge: call council helpline; Power of Attorney: check gov.uk guidance, ask CNS for signposting…"
            />
          </div>

        </SectionBlock>

        {/* Step 2: Cherish the Moments */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2: Cherish the Moments
          </h2>
          <p className="mt-3">
            It’s easy to get caught up in tasks. Be intentional about time to simply be with your loved one: the
            little moments carry you through the hardest days.
          </p>

          <div className="mt-3 panel">
            <h3 className="stage-sub">Moments That Matter</h3>
            <p className="mt-2">
              Write down 3 types of moments you most want to make space for (quiet tea, music, favourite show, short walk…).
              Add a simple reminder (phone, calendar, sticky note). Vary them: daily, weekly, or with others.
            </p>
          </div>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="My moments:"
              hint="Tea together, music, evening walk…"
            />
          </div>

        </SectionBlock>

        {/* Step 3: Letter to Future Me */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 3: Letter to Future Me
          </h2>
          <p className="mt-3">
            There will be tough days. A few lines in your own words can steady you. Pin it up, save it on your
            phone, or keep it in your wallet.
          </p>

          <div className="mt-3 panel">
            <ul className="list-disc space-y-2 pl-5">
              <li>What I want to remember when things get tough</li>
              <li>One strength I know I have</li>
              <li>One thing I’ll keep doing for myself</li>
            </ul>
            <p className="mt-2 text-[1.1rem] opacity-90">
              (Invite your loved one to add a short line for you, if you like.)
            </p>
          </div>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="My three lines:"
              hint="Line 1 / Line 2 / Line 3 / Line 4"
            />
          </div>

        </SectionBlock>

        {/* Closing: only place for Finish CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center">
            This guide has given you tools, systems, and confidence. Start small, keep what helps, and adapt as
            you go. Remind yourself that you are not alone. You already carry more strength and wisdom than you may realise.
            We wish you steadiness and moments of peace as you go forward.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/finish"
              className="text-link cta inline-block"
            >
              Finish Guide
            </Link>
          </div>
        </SectionBlock>
    </article>
  );
}
