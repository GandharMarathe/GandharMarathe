const COUNT = 520;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TILT = 0.42;

type Dot = { cx: number; cy: number; r: number; opacity: number; accent: boolean };

// A Fibonacci sphere, tilted and projected flat. Computed once at module load
// and rounded so server and client markup match exactly.
const dots: Dot[] = Array.from({ length: COUNT }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / COUNT;
  const ring = Math.sqrt(1 - y * y);
  const theta = i * GOLDEN_ANGLE;
  const x = Math.cos(theta) * ring;
  const z = Math.sin(theta) * ring;
  const ty = y * Math.cos(TILT) - z * Math.sin(TILT);
  const tz = y * Math.sin(TILT) + z * Math.cos(TILT);
  const depth = (tz + 1) / 2;
  return {
    cx: Math.round((50 + x * 40) * 100) / 100,
    cy: Math.round((50 - ty * 40) * 100) / 100,
    r: Math.round((0.22 + depth * 0.5) * 100) / 100,
    opacity: Math.round((0.12 + depth * 0.8) * 100) / 100,
    accent: i % 7 === 0,
  };
});

/**
 * Static dot-matrix orb. Stands in for the WebGL scene while it loads, when
 * WebGL is unavailable, and when the visitor prefers reduced motion.
 */
export function DotSphere({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={`size-full animate-breathe ${className}`}
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          opacity={d.opacity}
          className={d.accent ? "fill-accent" : "fill-fg"}
        />
      ))}
    </svg>
  );
}
