export default function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="m14.6 9.4-2.5 6-6 2.5 2.5-6 6-2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
