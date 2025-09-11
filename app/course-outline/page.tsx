import FadeInScroll from "@/components/FadeInScroll";

export const metadata = {
  title: "What to expect",
};

const NAVY = "#2e3159"; // main text color
const TEAL = "#318484"; // accent color

type Card = {
  step: string;
  title: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    step: "1",
    title: "Steadying Yourself",
    bullets: [
      "Understand the head space you are in",
      "Find your way to overcome panic",
      "Take small steps to begin reaching out",
    ],
  },
  {
    step: "2",
    title: "Mapping the road ahead",
    bullets: [
      "Begin to understand the road ahead",
      "Learn how to ask the right questions",
      "Start organising your information today",
    ],
  },
  {
    step: "3",
    title: "Gaining Knowledge",
    bullets: [
      "Learn how to use knowledge to help your loved one without getting burnt out",
      "Use techniques to help your research",
    ],
  },
  {
    step: "4",
    title: "Building Support",
    bullets: [
      "Start building your support network",
      "Find out who can help",
      "Keep caring sustainably",
    ],
  },
  {
    step: "5",
    title: "Moving Forward",
    bullets: [
      "Advice moving forwards",
      "Things to remember during your journey",
      "Be confident in your new role",
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fffef7]">
      <section
        className="mx-auto w-full max-w-[960px] px-6 py-16"
        style={{ color: NAVY }}
      >
        {/* Page title (always visible) */}
        <h1 className="mb-12 text-center text-3xl md:text-4xl font-bold tracking-wide">
          What to expect
        </h1>

        {/* Cards */}
        <div className="mt-10 space-y-8">
          {CARDS.map((c, i) => (
            <FadeInScroll
              key={c.step}
              delayMs={i * 80}
              live={true}
              centerBandPct={0.5}
            >
              <article
                className="rounded-[22px] p-4 md:p-5"
                style={{
                  border: `3px solid ${TEAL}`,
                  boxShadow: `inset 0 0 0 8px rgba(49,132,132,0.15)`,
                  background: "#ffffff",
                }}
              >
                {/* Header bar (pill) */}
                <div
                  className="mx-auto mb-4 inline-flex min-h-[46px] items-center justify-center rounded-full px-5 text-center text-base md:text-lg font-semibold"
                  style={{
                    background: "#f1faf9",
                    border: `2px solid ${TEAL}`,
                  }}
                >
                  {c.step}: {c.title}
                </div>

                {/* Inner content area */}
                <div
                  className="rounded-[18px] px-6 py-5 text-[17px] leading-7"
                  style={{
                    border: `2px solid ${TEAL}`,
                    background: "#f7fbfb",
                  }}
                >
                  <ul className="list-disc space-y-2 pl-5">
                    {c.bullets.map((b, bi) => (
                      <li key={bi} className="font-medium tracking-[0.01em]">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeInScroll>
          ))}
        </div>

        {/* CTA at the bottom */}
        <div className="mt-16 flex justify-center">
          <a
            href="/course/start" /* adjust to your actual first-module route */
            className="inline-flex items-center justify-center rounded-full px-8 py-4
                       text-lg font-semibold text-white bg-[#318484] hover:opacity-90
                       active:translate-y-[1px] transition"
          >
            Start the guide
          </a>
        </div>
      </section>
    </main>
  );
}
