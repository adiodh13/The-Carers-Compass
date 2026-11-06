// components/TechniqueCard.tsx
"use client";

type Props = {
  title: string;
  steps: string[];
  subtext?: string;
};

export default function TechniqueCard({ title, steps, subtext }: Props) {
  return (
    <div className="panel">
      <h3 className="stage-sub">{title}</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      {subtext && <p className="mt-3 italic text-ink-soft">{subtext}</p>}
    </div>
  );
}
