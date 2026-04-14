import { useState } from 'react';
import ProgBar from './ProgBar.jsx';
import { speakerClass } from '../utils.js';

export default function RitualLesson({ sections, title, onComplete }) {
  const [mode,      setMode]      = useState('read');
  const [quizStep,  setQuizStep]  = useState(0);
  const [revealed,  setRevealed]  = useState(false);

  const canLines = sections.flatMap(s => s.exchanges.filter(e => e.sp === 'Can.'));

  // ── Quiz mode ─────────────────────────────────────────────────
  if (mode === 'quiz') {
    const line    = canLines[quizStep];
    const sec     = sections.find(s => s.exchanges.includes(line));
    const prevIdx = sec?.exchanges.indexOf(line) - 1;
    const prevLine = prevIdx >= 0 ? sec.exchanges[prevIdx] : null;

    return (
      <div className="lesson-wrap">
        <h3 className="ritual-quiz-title">Candidate's Lines Quiz</h3>
        <p className="lesson-hint">{quizStep + 1} / {canLines.length}</p>
        <ProgBar val={quizStep} max={canLines.length} />

        <div style={{ marginTop: 20 }}>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="quiz-label">The officer says…</div>
            <div className="ritual-prev-line">{prevLine?.text || '(Opening exchange)'}</div>
          </div>

          <div className="lesson-hint" style={{ marginBottom: 8 }}>You (the Candidate) respond:</div>

          {!revealed ? (
            <div className="fc-box" onClick={() => setRevealed(true)} style={{ minHeight: 80 }}>
              <div className="fc-label">Tap to reveal your line</div>
            </div>
          ) : (
            <div className="fc-box revealed" style={{ minHeight: 80 }}>
              <div className="fc-text">{line.text}</div>
            </div>
          )}

          {revealed && (
            <div className="fadeUp" style={{ marginTop: 16 }}>
              <button
                className="btn-gold"
                onClick={() => {
                  setRevealed(false);
                  if (quizStep + 1 >= canLines.length) onComplete(canLines.length, canLines.length);
                  else setQuizStep(q => q + 1);
                }}
              >
                {quizStep + 1 >= canLines.length ? 'Finish' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Read mode ─────────────────────────────────────────────────
  return (
    <div className="lesson-wrap ritual-read" style={{ paddingBottom: 40 }}>
      <h3 className="ritual-title">{title}</h3>
      <p className="lesson-hint">Read through, then quiz yourself on the Candidate's lines</p>

      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 28 }}>
          <div className="section-tag">{sec.title}</div>
          {sec.exchanges.map((ex, ei) => {
            const [spCls, bblCls] = speakerClass(ex.sp);
            return (
              <div key={ei} className="exchange-row">
                <div className={`exchange-speaker ${spCls}`}>{ex.sp}</div>
                <div className={`exchange-bubble ${bblCls}`}>{ex.text}</div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="btn-pair" style={{ marginTop: 8 }}>
        {canLines.length > 0 && (
          <button onClick={() => setMode('quiz')} className="btn-quiz-lines">
            📝 Quiz My Lines
          </button>
        )}
        <button className="btn-gold" onClick={() => onComplete(1, 1)} style={{ flex: 1 }}>
          Mark Complete ✓
        </button>
      </div>
    </div>
  );
}
