import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "How to use this guide • The Carer’s Compass",
  description:
    "A clear starting point for first-time primary carers: how to approach this guide and get the most out of it.",
};

export default function HowToUsePage() {
  return (
    <FadeIn as="article" className="stage">
      <h1 className="stage-title">How to use this guide</h1>

      <div className="lede mt-10 space-y-6">
        <p>
          Caring for someone with cancer for the first time can feel overwhelming. But you don’t
          have to figure it out on your own.
        </p>
        <p>
          This guide was built with the help of many carers who’ve been where you are now. They
          shared what helped them, and we’ve turned those lessons into small, practical steps you
          can take for yourself and your loved one.
        </p>
        <p>
          Each task is designed to help you steady yourself, create simple systems, and handle the
          common challenges along the way.
        </p>
        <p>
          No guide can give you every answer because every situation is different. But the tools
          you’ll find here can help you work out what matters most in your loved one’s care, while
          looking after yourself too.
        </p>
        <p>
          Think of this as your first stepping stone. Take what helps, adapt it, and keep moving
          forward with confidence.
        </p>
        <p>We’re wishing you and your loved one strength as you take this next step.</p>
      </div>

      <div className="mt-12">
        <Link href="/course/section-1" className="text-link cta inline-block">
          Take me to section 1
        </Link>
      </div>
    </FadeIn>
  );
}
