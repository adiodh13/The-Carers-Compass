import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "How to use this guide • The Carer’s Compass",
  description:
    "A clear starting point for first-time primary carers: how to approach this guide and get the most out of it.",
};

export default function HowToUsePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full max-w-3xl px-6 sm:px-8 lg:px-0 py-16 sm:py-20">
        {/* Title */}
        <FadeIn>
          <h1
            className="text-[2.75rem] leading-tight font-semibold"
            style={{ color: "#2e3159" }}
          >
            How to use this guide
          </h1>
        </FadeIn>

        {/* Body copy */}
        <div className="mt-8 space-y-6 text-[1.125rem] leading-8" style={{ color: "#2e3159" }}>
          <FadeIn>
            <p>
              Caring for someone with cancer for the first time can feel overwhelming. But you
              don’t have to figure it out on your own.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              This guide was built with the help of many carers who’ve been where you are now.
              They shared what helped them, and we’ve turned those lessons into small, practical
              steps you can take for yourself and your loved one.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Each task is designed to help you steady yourself, create simple systems, and handle
              the common challenges along the way.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              No guide can give you every answer because every situation is different. But the tools
              you’ll find here can help you work out what matters most in your loved one’s care,
              while looking after yourself too.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Think of this as your first stepping stone. Take what helps, adapt it, and keep moving
              forward with confidence.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              We’re wishing you and your loved one strength as you take this next step.
            </p>
          </FadeIn>
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-12">
            <Link
              href="/course/section-1"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold shadow-sm transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-90"
              style={{
                backgroundColor: "#318484",
                color: "#ffffff",
              }}
            >
              Take me to section 1
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
