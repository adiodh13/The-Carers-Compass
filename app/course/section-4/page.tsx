// app/course/section-4/page.tsx
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";

export default function SectionFourPage() {

  return (
    <article className="stage">

        {/* Intro */}
        <SectionBlock>
          <h1 className="stage-title">
            <span className="stage-eyebrow">Section 4</span>
            Building Your Support System
          </h1>
          <p className="mt-4 max-w-[650px]">
            Being a carer is intensive, and it’s not sustainable to do everything alone. Setting up a support
            system for yourself helps prevent burnout and gives your loved one the best care you can offer.
            Think in three pillars: <strong>Emotional</strong>, <strong>Practical</strong>, and <strong>Informational</strong>.
            The steps below help you build each pillar steadily.
          </p>
          <GuideActions title="Section 4: Building Your Support System" />
        </SectionBlock>

        {/* Step 1: Emotional Support – Vent Buddy & Check-in Friend */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 1: Emotional Support – Vent Buddy & Check-in Friend
          </h2>
          <p className="mt-3">
            Having a safe space for your feelings is foundational. When you can offload the weight you’re
            carrying, you’re better equipped to support your loved one.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Vent Buddy</strong>: someone you can talk to without judgment.</li>
            <li><strong>Check-in Friend</strong>: someone who agrees to message you once a week.</li>
          </ul>
          <p className="mt-2 opacity-90">
            It helps to set a gentle reminder in both your calendars so these check-ins don’t slip. Think of
            one or two people you’d trust in these roles. If you feel ready, send them a quick message.
          </p>

        </SectionBlock>

        {/* Step 2: Practical Support – Small Tasks Without Guilt */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2: Practical Support – Small Tasks Without Guilt
          </h2>
          <p className="mt-3">
            You’ll have plenty on your plate. Focusing on the important things means letting others take on
            some of the lighter tasks. Start by identifying 1–3 small, specific tasks someone could do:
            (e.g., cook a meal, do the school run, pick up groceries).
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="List a few specific tasks others could help with:"
              hint="Cooking a meal, school run, supermarket trip…"
            />
          </div>

          <div className="mt-5 panel">
            <h3 className="stage-sub">Use the 3-Step Ask:</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li><strong>Be specific</strong>: “Could you cook a meal for us next Thursday?”</li>
              <li><strong>Be time-bound</strong>: “Just this once / once a month.”</li>
              <li><strong>Show why it helps</strong>: “It frees me up to focus on the appointment.”</li>
            </ol>
          </div>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="Try shaping one ask below:"
              hint={`What?\nWhen?\nWhy?`}
            />
          </div>

        </SectionBlock>

        {/* Step 3: Informational Support – Your Health Ally */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 3: Informational Support – Your Health Ally
          </h2>
          <p className="mt-3">
            Sometimes medical information feels overwhelming. Having someone in your circle with health
            knowledge (a pharmacist, nurse, or GP friend) can boost your confidence before talking to doctors.
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="Who might you know with health knowledge?"
              hint="My pharmacist, a friend who is a nurse…"
            />
          </div>

          <p className="mt-2 opacity-90">
            Don’t worry if nobody comes to mind right now; this can grow over time.
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="If you’d like, prepare a message:"
              hint={`“Sometimes the medical info feels overwhelming. Could I check in with you now and then so I’m clearer before speaking to the consultant?”`}
            />
          </div>

        </SectionBlock>

        {/* Step 4: Emotional & Informational – People Who “Get It” */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 4: Emotional & Informational – People Who “Get It”
          </h2>
          <p className="mt-3">
            Other carers often understand you in ways others can’t. Shared experience reduces isolation and
            brings practical wisdom. Do you know someone who has been a carer? Note their name, or explore:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              <a
                href="https://community.macmillan.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                
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
                
              >
                Carers UK Forum
              </a>
            </li>
          </ul>
          <p className="mt-2">
            Even one conversation, coffee, or online chat can help.
          </p>

        </SectionBlock>

        {/* Step 5: Practical Support – Shared Systems */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 5: Practical Support – Shared Systems
          </h2>
          <p className="mt-3">
            Juggling communication can be confusing. Simple systems make it easier:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Create a group chat for quick updates.</li>
            <li>Add one recurring task (like weekly shopping) to a shared calendar.</li>
            <li>Rotate tasks monthly so no one feels overburdened.</li>
          </ul>
          <p className="mt-2 opacity-90">
            Start small: even adding one or two people to a chat or calendar makes a difference.
          </p>

        </SectionBlock>

        {/* Step 6: Developing Your Support System Over Time */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 6: Developing Your Support System Over Time
          </h2>
          <p className="mt-3">
            Your support system won’t be perfect right away. Use your weekly review (from Section 2) to spot
            gaps and build deliberately.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>“When did I feel most alone this week?”</li>
            <li>“What drained me that could have been shared?”</li>
          </ul>
          <p className="mt-2">
            If you find a gap, decide which pillar it belongs to (Emotional, Practical, Informational), then
            return to the matching step to build it.
          </p>

          <div className="mt-4 max-w-[650px]">
            <Prompt
              label="Capture one gap and where it belongs:"
              hint={`Gap I noticed: …\nPillar it belongs to (Emotional/Practical/Informational): …\nNext micro-step: …`}
            />
          </div>

        </SectionBlock>

        {/* Closing: only place for Section 5 CTA */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center">
            You now have the foundations of a comprehensive support system: people to lean on emotionally,
            practically, and informationally. This isn’t built in a day; it grows with you. By taking small steps,
            you’re already making caring easier on you and your loved one.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-5"
              className="text-link cta inline-block"
            >
              Take me to Section 5
            </Link>
          </div>
        </SectionBlock>
    </article>
  );
}
