// components/Prompt.tsx
// A reflection prompt. Nothing is typed or stored here: visitors answer on paper,
// in their own notes app, or out loud. GuideActions can copy or print every prompt.

const NAVY = "#2e3159";
const TEAL = "#318484";

export default function Prompt({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      data-prompt={label}
      className="w-full rounded-lg bg-white px-4 py-3 ring-1 ring-black/5 print:break-inside-avoid print:ring-0"
      style={{ borderLeft: `3px solid ${TEAL}` }}
    >
      <p className="text-[15px] font-medium leading-relaxed" style={{ color: NAVY }}>
        {label}
      </p>
      {hint && (
        <p
          className="mt-1 whitespace-pre-line text-sm italic leading-relaxed opacity-70"
          style={{ color: NAVY }}
        >
          {hint}
        </p>
      )}
      {/* Space to write by hand when printed */}
      <div className="hidden h-24 border-b border-dashed border-black/20 print:block" aria-hidden />
    </div>
  );
}
