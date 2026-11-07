import Link from "next/link";
import Reveal from "@/components/Reveal";

import SectionBlock from "@/components/SectionBlock";
import Collapse from "@/components/Collapse";
import TechniqueCard from "@/components/TechniqueCard";
import ResourceCard from "@/components/ResourceCard";
import MiniCard from "@/components/MiniCard";
import Prompt from "@/components/Prompt";
import GuideActions from "@/components/GuideActions";

export default function SectionOnePage() {

  return (
    <article className="stage">

        {/* Hero / Section Intro */}
        <SectionBlock>
          <h1 className="stage-title">
            <span className="stage-eyebrow">Section 1</span>
            Steadying Yourself for the Road Ahead
          </h1>
          <h2
            className="stage-sub mt-5"
          >
            Step 1: Finding Clarity in a Storm
          </h2>
          <p className="mt-5 max-w-[650px]">
            When someone you love is diagnosed with cancer, your mind can feel like a
            crowded room where thoughts and worries all speak at once. The first step
            isn’t to solve everything. It’s simply to notice what’s happening inside you.
            <br />
            <br />
            Before we begin, let’s take 30 seconds together to pause:
          </p>

          {/* Grounding Exercise Card */}
          <div className="mt-6 panel">
            <div className="flex items-start gap-5">
              <div className="hidden h-16 w-16 flex-none animate-breathe rounded-full md:block" />
              <div className="flex-1">
                <h3 className="stage-sub">
                  Quick Grounding Exercise (30 seconds)
                </h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  <li>Breathe in slowly through your nose for 4 seconds.</li>
                  <li>Hold that breath for 4 seconds.</li>
                  <li>Exhale gently through your mouth for 4 seconds.</li>
                  <li>Pause for 4 seconds.</li>
                  <li>Repeat once more.</li>
                </ol>
                <p className="mt-3 italic">
                  Notice how even two rounds of this can soften the edges a little.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-[650px]">
            Now, let’s begin reflecting. You’ll see some prompts below. You don’t need to
            answer them all right now; even completing one or two can help. There are no
            wrong answers. Getting thoughts out of your head and onto a page (or into a
            recording) makes them visible and easier to handle. You can write on paper,
            jot them in your phone’s notes app, or record your voice. The best way is
            whatever feels most natural to you.
          </p>

          <GuideActions title="Section 1: Steadying Yourself for the Road Ahead" />

          {/* Reflection Prompts */}
          <div className="mt-6 space-y-6">
            <Collapse title="Questions, worries and emotions">
              <div className="space-y-5">
                <Prompt
                  label="What questions do I have right now?"
                />
                <Prompt
                  label="What is worrying me the most at this moment?"
                />
                <Prompt
                  label="What emotions am I feeling?"
                />
              </div>
            </Collapse>

            <Collapse title="Stray thoughts, talking to someone and Next steps">
              <div className="space-y-5">
                <Prompt
                  label="Are there any stray thoughts worth noting down, even if they seem small or random?"
                />
                <Prompt
                  label="Do I want to talk to someone (professional or otherwise)? What would I like to say?"
                />
                <Prompt
                  label="Were we told or recommended to do anything next?"
                />
              </div>
            </Collapse>
            <p className="text-[1.1rem]">
              Remember: you can come back to these questions at any time.
            </p>
          </div>

          {/* Resource Links */}
          <div className="mt-8">
            <p className="mb-4 text-[1.1rem]">
              If you’d prefer to talk instead of write, these resources are here whenever you need them:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResourceCard
                name="Maggie’s Centres"
                desc="Free support and drop-in locations."
                href="https://www.maggies.org/"
              />
              <ResourceCard
                name="Macmillan Cancer Support"
                desc="Helpline & local opportunities."
                href="https://community.macmillan.org.uk/"
              />
              <ResourceCard
                name="Samaritans"
                desc="24/7 listening line."
                href="https://www.samaritans.org/how-we-can-help/contact-samaritan/"
              />
            </div>
          </div>
        </SectionBlock>

        {/* Step 2: Calming Panic */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 2: Calming Panic When It Arises
          </h2>
          <p className="mt-3">
            Moments of panic or anxiety are normal. Your heart may race, your chest may feel
            tight, or your thoughts may spiral. You are not alone in this. And the good news is:
            there are simple ways to calm your body and mind.
          </p>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Reflection first: When I feel anxious, what do I usually do?"
            />
          </div>

          <Reveal showLabel="Show me calming techniques" hideLabel="Hide calming techniques">
            <div className="mt-1 space-y-4 pt-5">
              <TechniqueCard
                title="Box Breathing (under 1 minute)"
                steps={[
                  "Inhale through your nose for 4 seconds.",
                  "Hold your breath for 4.",
                  "Exhale through your mouth for 4.",
                  "Pause for 4.",
                ]}
                subtext="Just 3 rounds can calm your body’s stress response."
              />
              <TechniqueCard
                title="Grounding with Your Senses (2 minutes)"
                steps={[
                  "Name 5 things you can see.",
                  "4 things you can feel.",
                  "3 things you can hear.",
                  "2 things you can smell.",
                  "1 thing you can taste.",
                ]}
                subtext="This pulls you back from spiralling thoughts into the present moment."
              />
              <TechniqueCard
                title="Quick Muscle Release (1–2 minutes)"
                steps={[
                  "Tighten your shoulders for 5 seconds, then let go.",
                  "Clench your fists, then release.",
                  "Press your jaw shut, then relax.",
                ]}
                subtext="Letting your muscles soften helps your mind follow."
              />
            </div>
          </Reveal>

        </SectionBlock>

        {/* Step 3: Taking Small Steps */}
        <SectionBlock>
          <h2 className="stage-step">
            Step 3: Taking Small Steps Forward
          </h2>
          <p className="mt-3">
            Overwhelm grows when everything feels too big. The antidote is starting small. Tiny
            steps may feel almost trivial, but they shift you from frozen to moving. Have a look
            back at your reflections. Choose 1–3 small, low-effort steps you could take today.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <MiniCard title="Emotional" desc="Send a short text to a friend." />
            <MiniCard title="Practical" desc="Put tomorrow’s appointment letter in your bag." />
            <MiniCard title="Self-care" desc="Drink a glass of water or step outside for fresh air." />
          </div>

          <div className="mt-5 tip">
            <p className="italic">
              Tip: Try turning one of your ideas into an “If–then” plan:
              <br />
              “If I feel panic rising, then I will try 2 rounds of box breathing.”
              <br />
              “If–then” plans give you a ready-made action when your mind feels stuck. You can
              reuse them anytime…
            </p>
          </div>

          <div className="mt-5 max-w-[650px]">
            <Prompt
              label="Jot down 1 to 3 steps. They don’t have to be perfect:"
              hint="Write your small steps here…"
            />
          </div>

        </SectionBlock>

        {/* Closing Section */}
        <SectionBlock>
          <p className="mx-auto max-w-[650px] text-center">
            You’ve just done some of the hardest work: pausing, calming, and starting to sort
            through the noise. This isn’t about fixing everything today. It’s about building a
            steady foundation for what comes next.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/course/section-2"
              className="text-link cta inline-block"
            >
              Take me to Section 2
            </Link>
          </div>
        </SectionBlock>
    </article>
  );
}
