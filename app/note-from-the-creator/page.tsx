import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "A Note from the Creator • The Carer’s Compass",
  description: "Why The Carer’s Compass was made, and who it’s for.",
};

export default function NoteFromTheCreatorPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full max-w-3xl px-6 sm:px-8 lg:px-0 py-16 sm:py-20">
        <FadeIn>
          <h1
            className="text-[2.75rem] leading-tight font-semibold"
            style={{ color: "#2e3159" }}
          >
            A Note from the Creator
          </h1>
        </FadeIn>

        <div className="mt-8 space-y-6 text-[1.125rem] leading-8" style={{ color: "#2e3159" }}>
          <FadeIn>
            <p>
              I created The Carer’s Compass after watching how hard the carers close to me worked to
              take care of their partners. It seemed to me that, whilst patients get a lot of
              resources, there is a gap for carers, even for something as simple as a “here’s where
              to go next”.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              I watched my aunt take care of my uncle when I was a teenager, and a few years later I
              watched my mum take care of my dad, both of whom were diagnosed with cancer. I saw the
              mental pressure they endured and the toll it takes. I saw the feeling of
              responsibility, fear and, above all, the courage that a carer holds.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              After my dad passed away, I began talking to other carers whose loved ones - whether a
              parent, a sibling, or a partner - were diagnosed with cancer. I began to understand
              their different experiences and how each person’s circumstances change the process.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              In an attempt to weave together these common experiences, I created this short and
              simple guide - informed by each carer I spoke to - for a primary carer who doesn’t know
              where to start and hasn’t been in this position before. Everyone’s circumstances are
              different, and no single piece of information will solve everything, but I hope that a
              carer can at least take one thing from this guide. I hope that it continues to be
              shaped by carers and can, one day, become something more.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="italic">Adi</p>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-12 flex justify-center">
            <Link
              href="/course/how-to-use"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold shadow-sm transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-90"
              style={{ backgroundColor: "#318484", color: "#ffffff" }}
            >
              How to use this guide
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
