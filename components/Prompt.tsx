// components/Prompt.tsx
// A reflection prompt. Nothing is typed or stored here: visitors answer on paper,
// in their own notes app, or out loud. GuideActions can copy or print every prompt.

export default function Prompt({ label, hint }: { label: string; hint?: string }) {
  return (
    <div data-prompt={label} className="prompt w-full print:break-inside-avoid">
      <p className="font-medium leading-relaxed">{label}</p>
      {hint && (
        <p className="mt-1 whitespace-pre-line text-[1.1rem] italic leading-relaxed text-ink-soft">
          {hint}
        </p>
      )}
      {/* Space to write by hand when printed */}
      <div className="hidden h-24 border-b border-dashed border-black/20 print:block" aria-hidden />
    </div>
  );
}
