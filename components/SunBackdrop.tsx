// components/SunBackdrop.tsx
// The sun behind every page: a yellow glow from the top right, with faint grey rays
// fanning out of it. It sits in a fixed layer, so the page scrolls over it.

const W = 1600;
const H = 1000;
const INNER = 190; // rays start clear of the sun's centre
const OUTER = 2600;

// Angle in degrees, measured from straight left (0) to straight down (90).
// Hand-spaced rather than even, so it reads as light and not as a pinwheel.
const RAYS: { angle: number; spread: number }[] = [
  { angle: -9, spread: 0.7 },
  { angle: 2, spread: 1.1 },
  { angle: 11, spread: 0.6 },
  { angle: 19, spread: 1.3 },
  { angle: 29, spread: 0.7 },
  { angle: 37, spread: 1 },
  { angle: 46, spread: 1.4 },
  { angle: 56, spread: 0.6 },
  { angle: 64, spread: 1.1 },
  { angle: 73, spread: 0.8 },
  { angle: 83, spread: 1.2 },
  { angle: 93, spread: 0.7 },
  { angle: 101, spread: 1 },
];

function rayPoints({ angle, spread }: { angle: number; spread: number }) {
  const at = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(W - Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  };
  return [
    at(angle - spread * 0.1, INNER),
    at(angle - spread * 0.6, OUTER),
    at(angle + spread * 0.6, OUTER),
    at(angle + spread * 0.1, INNER),
  ].join(" ");
}

export default function SunBackdrop() {
  return (
    <div className="sun" aria-hidden>
      <div className="sun-glow" />
      <svg className="sun-rays" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMin slice">
        <defs>
          <radialGradient id="ray-fade" gradientUnits="userSpaceOnUse" cx={W} cy={0} r={2100}>
            <stop offset="0" stopColor="#2a2a2a" stopOpacity="0" />
            <stop offset="0.09" stopColor="#2a2a2a" stopOpacity="0.028" />
            <stop offset="0.4" stopColor="#2a2a2a" stopOpacity="0.02" />
            <stop offset="1" stopColor="#2a2a2a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {RAYS.map((ray) => (
          <polygon key={ray.angle} points={rayPoints(ray)} fill="url(#ray-fade)" />
        ))}
      </svg>
    </div>
  );
}
