// components/MiniCard.tsx
"use client";

type Props = {
  title: string;
  icon: string; // emoji or small svg
  desc: string;
  navy: string;
};

export default function MiniCard({ title, icon, desc, navy }: Props) {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-xl">{icon}</span>
        <h4 className="text-[15px] font-semibold" style={{ color: navy }}>
          {title}
        </h4>
      </div>
      <p className="mt-2 text-sm opacity-90 break-words" style={{ color: navy }}>
        {/* Allow line breaks after slashes so "charity/hospital/professional" can wrap */}
        {desc.replace(/\//g, "/​")}
      </p>
    </div>
  );
}
