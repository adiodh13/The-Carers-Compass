// app/course/section-3/page.tsx
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";

export default function SectionThreePage() {

  return (
    <article className="stage">

        {/* Intro */}
        <SectionBlock>
          <h1 className="stage-title">
            <span className="stage-eyebrow">Section 3</span>
            Building Your Knowledge Base
          </h1>
          <p className="mt-4 max-w-[650px]">
            As a primary carer, you’ll naturally want to understand more about your loved one’s condition
            and how best to help them. Learning can make you feel more confident and work better with doctors.
            There is also a risk: research rabbit holes, conflicting information, and overwhelm. With the right
            system, you can learn without exhausting yourself. This section shows you how to build knowledge in
            a way that supports your loved one’s care while keeping you steady.
          </p>
          <GuideActions title="Section 3: Building Your Knowledge Base" />
        </SectionBlock>

        {/* Step 1: Pick your learning time */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 1: Pick your learning time
          </h2>
          <p className="mt-3">
            Short, focused bursts work best: 30–60 minutes, a couple of times a week. Choose times that fit your
            schedule. Set a timer so you don’t go over. When your session ends, wrap up with Steps 4 &amp; 5 below,
            then leave the room and do something different. This makes stopping easier.
          </p>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="When do you want your learning windows to be?"
              hint="e.g. Tuesday evenings, Saturday mornings"
            />
          </div>

          <p className="mt-2 text-[1.1rem] opacity-90">
            Don’t forget to add reminders: alarms, calendar alerts, or sticky notes.
          </p>

        </SectionBlock>

        {/* Step 2: Choose your trusted sources */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2: Choose your trusted sources
          </h2>
          <p className="mt-3">
            Having a baseline of trusted sources protects you from misinformation and conflicting claims. Pick
            3–5 sources you’ll rely on first. If you’re not sure where to begin, these are safe places to start:
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ResourceCard
              name="NHS Website"
              desc="Official UK health information and guidance."
              href="https://www.nhs.uk/"
            />
            <ResourceCard
              name="Macmillan Cancer Support"
              desc="Reliable info plus helpline and local services."
              href="https://www.macmillan.org.uk/"
            />
            <ResourceCard
              name="Maggie’s"
              desc="In-person centres, courses and practical support."
              href="https://www.maggies.org/"
            />
            <ResourceCard
              name="Cancer Research UK"
              desc="Evidence-based information on cancer types & treatment."
              href="https://www.cancerresearchuk.org/"
            />
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="What are your trusted sources?"
              hint="List 3–5 trusted sources"
            />
          </div>

        </SectionBlock>

        {/* Step 3: Evaluating information (3C Test) */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 3: Evaluating information
          </h2>
          <p className="mt-3">
            It’s fine to go beyond your baseline sources. But when you do, be more critical.
          </p>

          <div className="mt-4 panel">
            <h3 className="stage-sub">
              Try using the 3C Test:
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
              <MiniCard
                title="Check the source"
                desc="Who wrote it? Recognised charity/hospital/professional? If it’s anonymous or salesy, treat with caution."
              />
              <MiniCard
                title="Compare with baseline"
                desc="Does it match NHS, Macmillan, Maggie’s, CRUK? If not, flag it for your clinical team."
              />
              <MiniCard
                title="Confirm before you act"
                desc="Never change meds/diet/care without medical advice. Use new info as questions, not instructions."
              />
            </div>
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Have a go yourself. If you’ve found something outside your trusted sources, run it through the 3Cs:"
              hint={`Check:\nCompare:\nConfirm:`}
            />
          </div>

          <p className="mt-2 text-[1.1rem] opacity-90">
            If you don’t have anything yet, that’s fine. Just remember this tool for later.
          </p>

        </SectionBlock>

        {/* Step 4: Keeping it relevant */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 4: Keeping it relevant
          </h2>
          <p className="mt-3">
            The goal of learning is to make life easier for you and your loved one. Avoid drifting into
            detail that doesn’t help you day to day.
          </p>
          <div className="mt-4 panel">
            <ul className="list-disc space-y-2 pl-5">
              <li>What does this mean in plain words?</li>
              <li>Does this matter for us now, or later?</li>
              <li>What action (if any) should I take?</li>
            </ul>
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Try it now with something you’ve read recently:"
              hint={`Plain words: …\nMatters now or later: …\nAction: …`}
            />
          </div>

          <p className="mt-2 text-[1.1rem] italic opacity-90">
            Tip: To make this a habit, run through these three questions at the end of each learning session.
          </p>
        </SectionBlock>

        {/* Step 5: Remembering and understanding */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 5: Remembering and understanding
          </h2>
          <p className="mt-3">
            To make your learning stick, summarise in your own words at the end of each session. If you notice gaps,
            write down your questions for your next appointment or session.
          </p>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Have a go now: write one thing you’ve learned recently, in your own words."
              hint="My summary…"
            />
          </div>

          <p className="mt-2 text-[1.1rem] opacity-90">
            If you’re unsure what to summarise, try summarising what you learned in this section.
          </p>

        </SectionBlock>

        {/* Closing Section: ONLY place for the Section 4 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center">
            You now have a system to learn without burning out:
            <br />
            Set clear times for learning, rely on trusted sources, use the 3Cs, keep it relevant, and summarise.
            <br />
            This isn’t about knowing everything at once. It’s about steadily building the knowledge you need, when you need it.
            You can be confident that you’ll always have a way to find and make sense of the right information.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-4"
              className="text-link cta inline-block"
            >
              Take me to Section 4
            </Link>
          </div>
        </SectionBlock>
    </article>
  );
}
