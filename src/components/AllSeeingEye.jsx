/**
 * AllSeeingEye — Eye of Providence
 *
 * Classic Masonic symbol: an open eye inside a radiant equilateral triangle,
 * surrounded by a glory of light rays. Draws entirely with SVG primitives.
 */
export default function AllSeeingEye({ size = 64, color = '#c9a84c' }) {
  const cx = 50, cy = 52;   // eye centre
  const triApex = { x: 50, y: 8 };
  const triLeft = { x: 6,  y: 92 };
  const triRight = { x: 94, y: 92 };

  // 16 glory rays radiating outward from the triangle
  const numRays = 16;
  const rays = Array.from({ length: numRays }, (_, i) => {
    const angleDeg = (i / numRays) * 360 - 90; // start from top
    const rad = angleDeg * (Math.PI / 180);
    const innerR = 38, outerR = 54;
    const isLong = i % 2 === 0;
    return {
      x1: 50 + innerR * Math.cos(rad),
      y1: 50 + innerR * Math.sin(rad),
      x2: 50 + (isLong ? outerR : outerR - 6) * Math.cos(rad),
      y2: 50 + (isLong ? outerR : outerR - 6) * Math.sin(rad),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      aria-label="All-Seeing Eye of Providence"
    >
      {/* Glory rays — behind everything */}
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={color} strokeWidth={i % 2 === 0 ? 1.2 : 0.7}
          opacity={i % 2 === 0 ? 0.55 : 0.30}
          strokeLinecap="round"
        />
      ))}

      {/* Triangle fill (dark interior) */}
      <polygon
        points={`${triApex.x},${triApex.y} ${triLeft.x},${triLeft.y} ${triRight.x},${triRight.y}`}
        fill="rgba(13,8,4,0.85)"
      />
      {/* Triangle stroke */}
      <polygon
        points={`${triApex.x},${triApex.y} ${triLeft.x},${triLeft.y} ${triRight.x},${triRight.y}`}
        stroke={color} strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Eye whites / sclera shape */}
      <path
        d={`M22,${cy} Q${cx},${cy - 20} 78,${cy} Q${cx},${cy + 20} 22,${cy}Z`}
        fill="rgba(13,8,4,0.5)" stroke={color} strokeWidth="1.5"
      />

      {/* Upper eyelid crease */}
      <path
        d={`M24,${cy - 1} Q${cx},${cy - 16} 76,${cy - 1}`}
        stroke={color} strokeWidth="0.7" opacity="0.4"
      />

      {/* Iris */}
      <circle cx={cx} cy={cy} r="9" fill="rgba(13,8,4,0.8)" stroke={color} strokeWidth="1.5" />

      {/* Pupil */}
      <circle cx={cx} cy={cy} r="4.5" fill={color} opacity="0.95" />

      {/* Highlight spark */}
      <circle cx={cx + 3} cy={cy - 3} r="1.5" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}
