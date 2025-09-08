// components/Icons.tsx
export function LogoCompass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke="#2e3159" strokeWidth="2" />
      <path d="M32 8v48M8 32h48" stroke="#2e3159" strokeWidth="2" />
      <path d="M24 40l8-24 8 24-8-6-8 6z" fill="none" stroke="#2e3159" strokeWidth="2" />
    </svg>
  );
}

export function AnchorIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <g fill="none" stroke="#318484" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="36" cy="16" r="4" />
        <path d="M36 20v28" />
        <path d="M20 38c2 10 9 16 16 16s14-6 16-16" />
        <path d="M12 40c6 6 12 8 24 8s18-2 24-8" />
        <path d="M28 48l8-8 8 8" />
      </g>
    </svg>
  );
}

export function CompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <g fill="none" stroke="#318484" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="36" cy="36" r="24" />
        <circle cx="36" cy="16" r="3" />
        <path d="M26 46l10-28 10 28-10-8-10 8z" />
      </g>
    </svg>
  );
}

export function HandsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 72" className={className} aria-hidden="true">
      <g fill="none" stroke="#318484" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 40c10-6 18-2 26 4 8 6 14 8 26 2" />
        <path d="M18 30c8-4 12-2 20 3 8 5 16 6 26-1" />
        <path d="M64 26c6-4 12-4 18 2" />
        <path d="M62 36c8-6 16-6 22 0" />
      </g>
    </svg>
  );
}
