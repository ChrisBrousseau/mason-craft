export default function MasonicEmblem({ size = 88, color = '#c9a84c', dimColor = '#5a4010' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      aria-label="Square and Compasses"
    >
      {/* ── Square (set-square, L-shape) ── */}
      {/* Vertical arm */}
      <line x1="30" y1="88" x2="30" y2="36" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
      {/* Horizontal arm */}
      <line x1="30" y1="88" x2="78" y2="88" stroke={color} strokeWidth="5.5" strokeLinecap="round" />

      {/* ── Compasses (V-shape with top hinge) ── */}
      {/* Left arm */}
      <line x1="60" y1="22" x2="32" y2="82" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="60" y1="22" x2="88" y2="82" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Adjustment bar */}
      <line x1="42" y1="56" x2="78" y2="56" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Top hinge pivot */}
      <circle cx="60" cy="22" r="5" fill={color} />
      {/* Foot points */}
      <circle cx="32" cy="82" r="3.5" fill={color} />
      <circle cx="88" cy="82" r="3.5" fill={color} />

      {/* ── G ── */}
      <text
        x="60"
        y="57"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="18"
        fontWeight="700"
        fontFamily="Cinzel, Georgia, 'Times New Roman', serif"
        letterSpacing="0"
      >
        G
      </text>
    </svg>
  );
}
