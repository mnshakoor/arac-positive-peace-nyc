/**
 * Eight-segment ring: one segment per Pillar of Positive Peace. Used as the
 * site mark and as the motif on stories that have no cover photo yet.
 */
export function PeaceMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  const segments = Array.from({ length: 8 }, (_, i) => i);
  const r = 13;
  const c = 2 * Math.PI * r;
  const gap = 2.2;
  const len = c / 8 - gap;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      {segments.map((i) => (
        <circle
          key={i}
          cx="16"
          cy="16"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? "var(--arac-gold)" : "var(--arac-gold-light)"}
          strokeWidth="3.2"
          strokeDasharray={`${len} ${c - len}`}
          strokeDashoffset={-(i * (c / 8)) - gap / 2}
          transform="rotate(-90 16 16)"
        />
      ))}
      <circle cx="16" cy="16" r="4.2" fill="var(--arac-gold)" />
    </svg>
  );
}
