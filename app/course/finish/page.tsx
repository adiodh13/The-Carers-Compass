// app/course/finish/page.tsx
import Link from "next/link";

const NAVY = "#2e3159";
const TEAL = "#318484";

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
    <div className="min-h-screen" style={{ backgroundColor: "rgba(236,245,243,0.5)" }}>
      <main className="mx-auto w-full max-w-3xl px-6 py-10 md:px-8">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ color: NAVY }}>
          Help Us Make The Carer’s Compass Even Better
        </h1>
        <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
          Thank you for walking through this guide.
          If you’d like, you can share a few thoughts about your experience. This is completely optional and
          only takes a couple of minutes. Your feedback will help us improve the guide for future carers.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-semibold" style={{ color: NAVY }}>
            A few questions you could answer
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed" style={{ color: NAVY }}>
            {FEEDBACK_QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed opacity-80" style={{ color: NAVY }}>
            Answer as many or as few as you like. Nothing is stored on this site.
          </p>
          <p className="mt-4 leading-relaxed" style={{ color: NAVY }}>
            Send your thoughts to{" "}
            <span className="select-all font-semibold">{FEEDBACK_EMAIL}</span>
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="leading-relaxed" style={{ color: NAVY }}>
            <em>
              “Every carer’s voice helps shape this guide, and yours will make a difference for the next
              person who walks this path.”
            </em>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/course-outline"
              className="inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition hover:bg-[rgba(49,132,132,0.08)]"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              Revisit any section
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
