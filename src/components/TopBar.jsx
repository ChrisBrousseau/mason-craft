export default function TopBar({ xp, streak, hearts, onBack, accentColor }) {
  const accent = accentColor || '#c9a84c';
  return (
    <div className="top-bar">
      <button className="back-btn" onClick={onBack} aria-label="Back to home">
        ←
      </button>
      <div className="top-stats">
        <div className="stat-pill" style={{ color: '#ff7043' }}>🔥 {streak}</div>
        <div className="stat-pill" style={{ color: accent }}>⭐ {xp} XP</div>
        <div className="stat-pill hearts-pill">
          {[0, 1, 2].map(i => (
            <span key={i} className={i < hearts ? 'heart-active' : 'heart-empty'}>♥</span>
          ))}
        </div>
      </div>
    </div>
  );
}
