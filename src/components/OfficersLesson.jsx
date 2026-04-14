import { useState, useMemo } from 'react';
import ProgBar from './ProgBar.jsx';
import { OFFICERS } from '../data/constants.js';

export default function OfficersLesson({ onComplete, addXP, loseHeart }) {
  const [mode,     setMode]     = useState('study');
  const [qIdx,     setQIdx]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score,    setScore]    = useState(0);

  const quizItems = useMemo(() => {
    const jewels    = ['The square','The level','The plumb rule','The sword','The crossed swords','The dove, bearing an olive branch'];
    const positions = ['In the East','In the West','In the South','Outside the door','Within, at the entrance','At the right of the SW'];
    return [
      ...OFFICERS.map(o => ({
        q: `What is the jewel of the ${o.title}?`,
        a: o.jewel,
        opts: jewels.filter(x => x !== o.jewel).sort(() => Math.random() - 0.5).slice(0, 3).concat([o.jewel]).sort(() => Math.random() - 0.5),
      })),
      ...OFFICERS.map(o => ({
        q: `Where is the ${o.title} positioned?`,
        a: o.position,
        opts: positions.filter(x => x !== o.position).sort(() => Math.random() - 0.5).slice(0, 3).concat([o.position]).sort(() => Math.random() - 0.5),
      })),
    ].sort(() => Math.random() - 0.5).slice(0, 10);
  }, []);

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
      <p className="lesson-hint">Study each officer, then test yourself</p>
      {OFFICERS.map((o, i) => (
        <div key={i} className="card officer-card">
          <div className="officer-header">
            <span className="officer-icon">{o.icon}</span>
            <div>
              <div className="officer-title">{o.title}</div>
              <div className="officer-subtitle">Lodge Officer</div>
            </div>
          </div>
          <div className="officer-grid">
            <div className="officer-fact">
              <div className="officer-fact-label">Position</div>
              <div className="officer-fact-value">{o.position}</div>
            </div>
            <div className="officer-fact">
              <div className="officer-fact-label">Jewel</div>
              <div className="officer-fact-value">{o.jewel}</div>
            </div>
          </div>
          <div className="officer-duty">
            <strong>Duty: </strong>{o.why}
          </div>
          <div className="officer-jewel-teach">
            <span className="officer-jewel-label">Masonic meaning of jewel: </span>
            {o.jewelTeach}
          </div>
        </div>
      ))}
      <div className="btn-pair" style={{ marginTop: 8 }}>
        <button onClick={() => setMode('quiz')} className="btn-quiz-lines">
          📝 Test Yourself
        </button>
        <button className="btn-gold" onClick={() => onComplete(OFFICERS.length, OFFICERS.length)} style={{ flex: 1 }}>
          Mark Complete ✓
        </button>
      </div>
    </div>
  );
}
