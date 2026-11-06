// components/MiniCard.tsx
"use client";

type Props = {
  title: string;
  desc: string;
};

export default function MiniCard({ title, desc }: Props) {
  return (
    <div className="min-w-0 border-t border-line pt-3">
      <h4 className="display text-[1.3rem] leading-tight">{title}</h4>
      <p className="mt-1 break-words text-[1.1rem] leading-relaxed text-ink-soft">
        {/* Allow line breaks after slashes so "charity/hospital/professional" can wrap */}
        {desc.replace(/\//g, "/​")}
      </p>
    </div>
  );
}
