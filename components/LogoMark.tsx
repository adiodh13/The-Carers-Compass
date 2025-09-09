// components/LogoMark.tsx
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer ring */}
        <circle cx="48" cy="48" r="40.5" />
        {/* North/South needle (slightly extended tips) */}
        <path d="M48 8 L48 88" />
        {/* East/West */}
        <path d="M8 48 L88 48" />
        {/* Diagonals */}
        <path d="M22 22 L74 74" />
        <path d="M74 22 L22 74" />
        {/* Small centre diamond (reads well at small sizes) */}
        <path d="M48 42 L42 48 L48 54 L54 48 Z" />
      </g>
    </svg>
  );
}

