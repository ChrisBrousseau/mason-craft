/**
 * MasonicEmblem — Square and Compasses with G
 *
 * Geometry:
 *  - SQUARE: two flat arms rising from a shared bottom vertex (50,78),
 *    meeting at exactly 90° — left arm goes upper-left, right goes upper-right.
 *    This forms the recognisable V-shape, NOT an L.
 *  - COMPASSES: two legs emanating from a top hinge (50,19),
 *    spreading downward and outward to pointed tips.
 *  - G centred in the overlap zone.
 */
export default function MasonicEmblem({ size = 96, color = '#c9a84c' }) {
  const bg = '#0d0804';

  return (
    <svg
      viewBox="0 0 100 105"
      width={size}
      height={Math.round(size * 1.05)}
      fill="none"
      aria-label="Square and Compasses of Freemasonry"
    >

      {/* ═══════════════════════════════════════════════
          SQUARE  (carpenter's square)
          Both arms are 8 px wide rectangles — clearly
          two separate arms, not a single L stroke.
          Vertex at bottom-centre: (50, 78)
          Left tip:  (11, 39)   Right tip: (89, 39)
          Angle between arms = 90°
          ═══════════════════════════════════════════════ */}

      {/* Left arm */}
      <line
        x1="50" y1="78" x2="11" y2="39"
        stroke={color} strokeWidth="8" strokeLinecap="butt"
      />
      {/* Right arm */}
      <line
        x1="50" y1="78" x2="89" y2="39"
        stroke={color} strokeWidth="8" strokeLinecap="butt"
      />
      {/* Flat end-caps perpendicular to each arm — gives tool-like feel */}
      {/* Left end cap  (perpendicular to direction (-1,-1)) */}
      <line x1="7"  y1="43" x2="15" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round"/>
      {/* Right end cap (perpendicular to direction (+1,-1)) */}
      <line x1="85" y1="35" x2="93" y2="43" stroke={color} strokeWidth="4" strokeLinecap="round"/>
      {/* Small right-angle marker at the vertex — unambiguously a SQUARE */}
      <path
        d="M44,78 L44,72 L50,72"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        opacity="0.75"
      />

      {/* ═══════════════════════════════════════════════
          COMPASSES  (drawing compass)
          Hinge at top-centre: (50, 19)
          Left tip:  (17, 91)   Right tip: (83, 91)
          ═══════════════════════════════════════════════ */}

      {/* Left leg */}
      <line
        x1="50" y1="19" x2="17" y2="91"
        stroke={color} strokeWidth="5" strokeLinecap="round"
      />
      {/* Right leg */}
      <line
        x1="50" y1="19" x2="83" y2="91"
        stroke={color} strokeWidth="5" strokeLinecap="round"
      />
      {/* Pivot / hinge */}
      <circle cx="50" cy="19" r="6"   fill={color} />
      <circle cx="50" cy="19" r="2.8" fill={bg} />
      {/* Pointed tips */}
      <circle cx="17" cy="91" r="3.5" fill={color} />
      <circle cx="83" cy="91" r="3.5" fill={color} />

      {/* ═══════════════════════════════════════════════
          G  (God / Geometry)
          ═══════════════════════════════════════════════ */}
      <text
        x="50" y="59"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="23"
        fontWeight="700"
        fontFamily="'Cinzel Decorative', 'Cinzel', Georgia, 'Times New Roman', serif"
      >G</text>
    </svg>
  );
}
