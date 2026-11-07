// components/GuideActions.tsx
"use client";

import CopyChecklistButton from "@/components/CopyChecklistButton";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-link print:hidden"
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
    <div className="tip mt-6 print:hidden">
      <p className="text-[1.1rem] leading-relaxed">
        Prefer to work on paper or in your own notes? Print this section, or copy its
        questions into any notes app. Nothing you write is collected by us.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        <PrintButton />
        <CopyChecklistButton title={title} getItems={getPrompts} label="Copy the questions" />
      </div>
    </div>
  );
}
