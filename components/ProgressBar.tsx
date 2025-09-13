// components/ProgressBar.tsx
"use client";

type Props = {
  value: number; // 0..100
  barColor?: string;
};

export default function ProgressBar({ value, barColor = "#318484" }: Props) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(49,132,132,0.15)]">
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: barColor }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        role="progressbar"
      />
    </div>
  );
}
