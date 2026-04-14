import { useState } from 'react';
import ProgBar from './ProgBar.jsx';

export default function WorkingToolsLesson({
  onComplete, addXP, loseHeart,
  toolsData, quizItems, chargeText, degreeLabel,
}) {
  const [mode,     setMode]     = useState('study');
  const [qIdx,     setQIdx]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score,    setScore]    = useState(0);

  // ── Quiz mode ─────────────────────────────────────────────────
  if (mode === 'quiz') {
    const q = quizItems[qIdx];
    return (
      <div className="lesson-wrap">
        <ProgBar val={qIdx} max={quizItems.length} />
        <div className="lesson-counter-row" style={{ marginTop: 6 }}>
          <span>{qIdx + 1} / {quizItems.length}</span>
          <span className="known-count">✓ {score}</span>
        </div>
        <div className="card" style={{ margin: '16px 0' }}>
          <div className="quiz-label">Working Tools</div>
          <div className="quiz-question">{q.q}</div>
        </div>
        <div className="options-list">
          {q.opts.map((opt, i) => {
            let cls = 'btn-option';
            if (answered) {
              if (opt === q.a)           cls += ' opt-correct';
              else if (opt === selected) cls += ' opt-wrong';
            }
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => {
                setSelected(opt); setAnswered(true);
                if (opt === q.a) { addXP(10); setScore(s => s + 1); } else loseHeart();
              }}>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="fadeUp" style={{ marginTop: 14 }}>
            <button className="btn-gold" onClick={() => {
              setSelected(null); setAnswered(false);
              if (qIdx + 1 >= quizItems.length) onComplete(score + (selected === q.a ? 1 : 0), quizItems.length);
              else setQIdx(i => i + 1);
            }}>
              {qIdx + 1 >= quizItems.length ? 'Finish' : 'Continue →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Study mode ────────────────────────────────────────────────
  return (
    <div className="lesson-wrap" style={{ paddingBottom: 40 }}>
      <p className="lesson-hint">{degreeLabel}</p>
      {toolsData.map((tool, i) => (
        <div key={i} className="card tool-card">
          <div className="tool-header">
            <span className="tool-emoji">{tool.emoji}</span>
            <div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-subtitle">Working Tool</div>
            </div>
          </div>
          <div className="tool-section">
            <div className="tool-section-label">Operative Use</div>
            <div className="tool-section-body muted">{tool.operative}</div>
          </div>
          <div className="tool-section tool-masonic">
            <div className="tool-section-label gold">Masonic Meaning</div>
            <div className="tool-section-body">{tool.masonic}</div>
          </div>
        </div>
      ))}
      {chargeText && (
        <div className="charge-box">
          <div className="charge-title">📌 The Charge</div>
          <div className="charge-body">{chargeText}</div>
        </div>
      )}
      <div className="btn-pair">
        <button onClick={() => setMode('quiz')} className="btn-quiz-lines">
          📝 Test Yourself
        </button>
        <button className="btn-gold" onClick={() => onComplete(toolsData.length, toolsData.length)} style={{ flex: 1 }}>
          Mark Complete ✓
        </button>
      </div>
    </div>
  );
}
