export default function AllSeeingEye({ size = 64, color = '#c9a84c' }) {
  // Rays radiating from triangle apex
  const rays = Array.from({ length: 9 }, (_, i) => {
    const angle = (-90 + (i - 4) * 14) * (Math.PI / 180);
    const cx = 40, cy = 6;
    const r1 = 13, r2 = 22;
    return {
      x1: cx + r1 * Math.cos(angle),
      y1: cy + r1 * Math.sin(angle),
      x2: cx + r2 * Math.cos(angle),
      y2: cy + r2 * Math.sin(angle),
    };
  });

  return (
    <svg viewBox="0 0 80 70" width={size} height={size * 70 / 80} fill="none" aria-label="All-Seeing Eye">
      {/* Radiating rays from apex */}
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={color} strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      ))}

      {/* Triangle */}
      <polygon points="40,4 77,66 3,66"
        stroke={color} strokeWidth="2.5" fill="rgba(0,0,0,0.3)"
        strokeLinejoin="round" />

      {/* Eye shape */}
      <path d="M20,44 Q40,28 60,44 Q40,60 20,44Z"
        stroke={color} strokeWidth="1.8" fill="rgba(13,8,4,0.6)" />

      {/* Iris ring */}
      <circle cx="40" cy="44" r="8" stroke={color} strokeWidth="1.5" fill="rgba(13,8,4,0.7)" />

      {/* Pupil */}
      <circle cx="40" cy="44" r="3.5" fill={color} opacity="0.9" />

      {/* Eyelid crease highlight */}
      <path d="M22,43 Q40,30 58,43" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
