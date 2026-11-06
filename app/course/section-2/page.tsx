// app/course/section-2/page.tsx
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionBlock from "@/components/SectionBlock";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";
import CopyChecklistButton from "@/components/CopyChecklistButton";

const WEEKLY_REVIEW = [
  "Your current questions and answers",
  "Any new symptoms or changes",
  "Next steps or appointments coming up",
];

export default function SectionTwoPage() {

  return (
    <article className="stage">

        {/* Intro */}
        <SectionBlock>
          <h1 className="stage-title">
            <span className="stage-eyebrow">Section 2</span>
            Mapping the Road Ahead
          </h1>
          <p className="mt-4 max-w-[650px]">
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
          <h2 className="stage-step">
            Step 1: Know who can give you the answers
          </h2>
          <p className="mt-3">
            The first step is being clear on who you can turn to when you have questions:
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <MiniCard
              title="Consultant / Oncologist"
              desc="Explains diagnosis, treatment options, and expected outcomes."
            />
            <MiniCard
              title="Clinical Nurse Specialist (CNS)"
              desc="Translates medical info, explains next steps, helps you navigate hospital processes."
            />
            <MiniCard title="GP" desc="Supports overall health and liaises with hospital teams." />
            <MiniCard title="Support Worker" desc="Connects you with charities, benefits, and community help." />
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="If you don’t already know their names or contact details, note them down somewhere you can easily find later:"
            />
          </div>

        </SectionBlock>

        {/* Step 2a: Why it feels hard to ask questions */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2a: Why it feels hard to ask questions
          </h2>
          <p className="mt-3">
            Even when carers know who to ask, many still hesitate. This is completely normal.
          </p>

          <Reveal showLabel="Here are some common reasons" hideLabel="Hide common reasons">
            <div className="mt-5 panel">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Ego/pride</strong>: “I should already understand this.”</li>
                <li><strong>Embarrassment</strong>: “I’ll look stupid or annoy them.”</li>
                <li><strong>Overwhelm</strong>: “I’m too drained to think of what to say.”</li>
                <li><strong>Power imbalance</strong>: “I feel intimidated by doctors or nurses.”</li>
              </ul>
              <p className="mt-3 italic">
                There are no silly questions. Consultants and nurses expect to explain things
                more than once. It’s their job, and they don’t see it as a burden.
              </p>
            </div>
          </Reveal>
        </SectionBlock>

        {/* Step 2b: How to overcome resistance (3 Ns) */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2b: How to overcome resistance
          </h2>
          <p className="mt-3">
            If you feel resistance to asking, try the <strong>3 N’s</strong> technique:
          </p>
          <div className="mt-4 panel">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>Name</strong> the question → write it down or say it out loud.
                <div className="mt-1 text-[1.1rem] opacity-90">Example: “Can this medication cause drowsiness?”</div>
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

        </SectionBlock>

        {/* Step 2c: Practical tips */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2c: Practical tips for asking questions
          </h2>
          <div className="mt-3 panel">
            <ul className="list-disc space-y-2 pl-5">
              <li>Write your questions down in advance.</li>
              <li>Frame it as teamwork: “To support [loved one’s name] properly, I want to check I’ve got this right…”</li>
              <li>Use the repeat-back method: “So just to be clear, the next step is X?”</li>
              <li>Bring someone with you: a second set of ears can boost confidence.</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Step 3: Organising your plan */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 3: Organising your plan
          </h2>
          <p className="mt-3">
            The key is to keep everything in one central place. Pick whatever feels most natural to you.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <MiniCard title="Notebook" desc="A single place for notes & questions." />
            <MiniCard title="Folder" desc="Store letters, leaflets, printouts." />
            <MiniCard title="Notes app" desc="Always with you; quick to update." />
          </div>

          <div className="mt-5 tip">
            <p className="leading-relaxed italic">
              Helpful resource (UK): Cancer Research UK offers a free treatment record booklet.
            </p>
            <div className="mt-2">
              <ResourceCard
                name="CRUK Treatment Record Booklet"
                desc="Download the booklet to keep track of treatment details."
                href="https://publications.cancerresearchuk.org/products/your-cancer-treatment-record"
              />
            </div>
          </div>

          <div className="mt-5">
            <h3 className="stage-sub">
              What to use this for:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Notes from appointments</li>
              <li>Recording symptoms</li>
              <li>Writing down questions (and answers)</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Step 4: Weekly review */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 4: Reviewing what you know
          </h2>
          <p className="mt-3">
            It’s easy to get lost in the flood of information, but a weekly review keeps you steady.
            Set a time that works best for you. You could use a phone alarm, calendar event, or sticky note reminder.
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="What day/time will you use for your weekly review?"
              hint="e.g., Sunday at 6:30pm"
            />
          </div>

          <div className="mt-5 panel">
            <h3 className="stage-sub">
              During your review, check:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {WEEKLY_REVIEW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-4">
              <CopyChecklistButton title="Weekly review checklist" items={WEEKLY_REVIEW} />
            </div>
          </div>

        </SectionBlock>

        {/* Step 5: Staying on top of things together */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 5: Staying on top of things together
          </h2>
          <p className="mt-3">
            Having someone else up to speed can give you confidence and catch details you might miss.
            Consider whether there’s a trusted person you’d like to keep in the loop. If they’re open,
            they can help double-check your notes and progress.
          </p>

          <div className="mt-5 panel">
            <h3 className="stage-sub">
              Extra tips for staying steady:
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Summarise what you think you heard at the end of meetings and confirm.</li>
              <li>Ask: “What are the top three things I should focus on right now?”</li>
              <li>Note down questions that come later and call/email your CNS or GP.</li>
            </ul>
          </div>
        </SectionBlock>

        {/* Closing Section: ONLY place for the Section 3 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center">
            You’ve just learned practical ways to ask better questions, organise your plan, and
            stay on top of things with support. Remember, these are habits you can return to anytime
            as your loved one’s treatment continues.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-3"
              className="text-link cta inline-block"
            >
              Take me to Section 3
            </Link>
          </div>
        </SectionBlock>
    </article>
  );
}
