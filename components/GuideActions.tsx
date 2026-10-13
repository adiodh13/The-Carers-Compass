// components/GuideActions.tsx
"use client";

import CopyChecklistButton from "@/components/CopyChecklistButton";

const NAVY = "#2e3159";
const TEAL = "#318484";

export function PrintButton() {
  const onClick = () => {
    // Expand collapsed groups so every prompt makes it onto the page
    document.querySelectorAll("details").forEach((d) => (d.open = true));
    window.print();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95 active:translate-y-[1px] print:hidden"
      style={{ backgroundColor: TEAL }}
    >
      Print / Save as PDF
    </button>
  );
}

/** Print + copy-all-prompts toolbar for a guide section. Nothing is stored. */
export default function GuideActions({ title }: { title: string }) {
  const getPrompts = () =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-prompt]")).map(
      (el) => el.dataset.prompt ?? ""
    );

  return (
    <div className="mt-6 rounded-xl bg-[rgba(49,132,132,0.08)] p-4 ring-1 ring-[rgba(49,132,132,0.2)] print:hidden">
      <p className="text-sm leading-relaxed" style={{ color: NAVY }}>
        Prefer to work on paper or in your own notes? Print this section, or copy its
        questions into any notes app. Nothing you write is collected by us.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <PrintButton />
        <CopyChecklistButton title={title} getItems={getPrompts} label="Copy the questions" />
      </div>
    </div>
  );
}
