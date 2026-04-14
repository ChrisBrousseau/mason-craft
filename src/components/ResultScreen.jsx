export default function ResultScreen({ score, total, xpEarned, onHome, onRetry }) {
  const pct  = total > 0 ? Math.round((score / total) * 100) : 100;
  const stars = pct >= 90 ? '🌟🌟🌟' : pct >= 70 ? '⭐⭐' : pct >= 50 ? '⭐' : '💪';
  const msg   = pct >= 80 ? 'Excellent, Brother!' : pct >= 60 ? 'Well done!' : 'Keep at it — the Craft rewards perseverance!';
  return (
    <div className="result-screen fadeUp">
      <div className="result-stars">{stars}</div>
      <h2 className="result-title">{msg}</h2>
      <p className="result-sub">{score} of {total} correct — {pct}%</p>
      <div className="result-xp-box">
        <div className="result-xp-val">+{xpEarned} XP</div>
        <div className="result-xp-lbl">earned this lesson</div>
      </div>
      <div className="result-actions">
        <button className="btn-outline" onClick={onRetry}>🔄 Retry</button>
        <button className="btn-gold"    onClick={onHome}>Continue →</button>
      </div>
    </div>
  );
}
