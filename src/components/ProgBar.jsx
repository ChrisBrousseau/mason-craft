export default function ProgBar({ val, max, color }) {
  const pct = max ? Math.min(100, (val / max) * 100) : 0;
  return (
    <div className="prog-wrap">
      <div
        className="prog-fill"
        style={{ width: `${pct}%`, background: color || undefined }}
      />
    </div>
  );
}
