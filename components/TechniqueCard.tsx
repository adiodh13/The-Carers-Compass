// components/TechniqueCard.tsx
"use client";

type Props = {
  title: string;
  steps: string[];
  subtext?: string;
  navy: string;
};

export default function TechniqueCard({ title, steps, subtext, navy }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="text-[17px] font-semibold" style={{ color: navy }}>
        {title}
      </h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5" style={{ color: navy }}>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      {subtext && (
        <p className="mt-3 italic" style={{ color: navy }}>
          {subtext}
        </p>
      )}
    </div>
  );
}
