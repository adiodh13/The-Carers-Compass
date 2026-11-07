// app/course/finish/page.tsx
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const FEEDBACK_EMAIL = "team@thecarerscompass.com";

// Feedback is sent by email from the visitor's own account; the site stores nothing.
const FEEDBACK_QUESTIONS = [
  "How helpful did you find the guide overall? (1–5)",
  "Was there one section or exercise that stood out as especially helpful?",
  "Is there anything you felt was missing, unclear, or less useful?",
  "Do you feel more confident than when you started? What shifted for you?",
  "Any other feedback or suggestions you’d like to share?",
];

export default function FinishPage() {
  return (
    <FadeIn as="article" className="stage">
      <h1 className="stage-title">Help Us Make The Carer’s Compass Even Better</h1>
      <p className="lede mt-8">
        Thank you for walking through this guide. If you’d like, you can share a few thoughts about
        your experience. This is completely optional and only takes a couple of minutes. Your
        feedback will help us improve the guide for future carers.
      </p>

      <section className="mt-14">
        <h2 className="stage-sub">A few questions you could answer</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {FEEDBACK_QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="mt-4 text-[1.05rem] text-ink-soft">
          Answer as many or as few as you like. Nothing is stored on this site.
        </p>
        <p className="mt-6">
          Send your thoughts to{" "}
          <a href={`mailto:${FEEDBACK_EMAIL}`} className="text-link font-medium">
            {FEEDBACK_EMAIL}
          </a>
        </p>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="display text-[1.7rem] italic leading-snug">
          “Every carer’s voice helps shape this guide, and yours will make a difference for the
          next person who walks this path.”
        </p>
        <Link href="/#guide" className="text-link cta mt-8 inline-block">
          Revisit any section
        </Link>
      </section>
    </FadeIn>
  );
}
