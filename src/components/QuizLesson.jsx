import { useState, useMemo } from 'react';
import ProgBar from './ProgBar.jsx';

export default function QuizLesson({ questions, onComplete, addXP, loseHeart, label }) {
  const qs = useMemo(() => [...questions].sort(() => Math.random() - 0.5).slice(0, 12), []);
  const [idx,      setIdx]      = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score,    setScore]    = useState(0);
  const [animKey,  setAnimKey]  = useState(0);

  const q = qs[idx];

  function choose(opt) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === q.correct) { addXP(10); setScore(s => s + 1); } else loseHeart();
  }

  function next() {
    const fs = score + (selected === q.correct ? 1 : 0);
    setSelected(null);
    setAnswered(false);
    setAnimKey(k => k + 1);
    if (idx + 1 >= qs.length) onComplete(fs, qs.length);
    else setIdx(i => i + 1);
  }

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{idx + 1} / {qs.length}</span>
        <span className="known-count">✓ {score}</span>
      </div>
      <ProgBar val={idx} max={qs.length} />

      <div key={animKey} className="fadeUp" style={{ marginTop: 20 }}>
        <div className="card quiz-card">
          <div className="quiz-label">{label || 'Knowledge'}</div>
          <div className="quiz-question">{q.question}</div>
        </div>
        <div className="options-list">
          {q.options.map((opt, i) => {
            let cls = 'btn-option';
            if (answered) {
              if (opt === q.correct)       cls += ' opt-correct';
              else if (opt === selected)   cls += ' opt-wrong';
            }
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => choose(opt)}>
                <span className="opt-letter">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="fadeUp" style={{ marginTop: 14 }}>
            <div className={selected === q.correct ? 'feedback-ok' : 'feedback-err'} style={{ marginBottom: 14 }}>
              <strong>{selected === q.correct ? '✓ Correct!' : '✗ Not quite'}</strong>
              {selected !== q.correct && (
                <div style={{ marginTop: 6, fontSize: 14 }}>
                  Correct: <em style={{ color: '#c9a84c' }}>{q.correct}</em>
                </div>
              )}
            </div>
            <button className="btn-gold" onClick={next}>
              {idx + 1 >= qs.length ? 'Finish Lesson' : 'Continue →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
