import { useState, useMemo } from 'react';
import ProgBar from './ProgBar.jsx';

export default function FillBlankLesson({ items, onComplete, addXP, loseHeart }) {
  const shuffled  = useMemo(() => [...items].sort(() => Math.random() - 0.5), []);
  const [idx,      setIdx]      = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score,    setScore]    = useState(0);

  const item = shuffled[idx];

  function choose(opt) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === item.blank) { addXP(10); setScore(s => s + 1); } else loseHeart();
  }

  function next() {
    const fs = score + (selected === item.blank ? 1 : 0);
    setSelected(null);
    setAnswered(false);
    if (idx + 1 >= shuffled.length) onComplete(fs, shuffled.length);
    else setIdx(i => i + 1);
  }

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{idx + 1} / {shuffled.length}</span>
        <span className="known-count">✓ {score}</span>
      </div>
      <ProgBar val={idx} max={shuffled.length} />

      <p className="lesson-hint">Fill in the missing word</p>

      <div className="card fill-card">
        <div className="quiz-label">Complete the phrase:</div>
        <div className="fill-sentence">
          {item.before}{' '}
          {answered
            ? <span className="blank-pill">{item.blank}</span>
            : <span className="blank-empty">______</span>}
          {' '}{item.after}
        </div>
      </div>

      <div className="options-list">
        {item.options.map((opt, i) => {
          let cls = 'btn-option';
          if (answered) {
            if (opt === item.blank)        cls += ' opt-correct';
            else if (opt === selected)     cls += ' opt-wrong';
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => choose(opt)}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="fadeUp" style={{ marginTop: 16 }}>
          <div className={selected === item.blank ? 'feedback-ok' : 'feedback-err'} style={{ marginBottom: 14 }}>
            <strong>{selected === item.blank ? '✓ Correct!' : '✗ Not quite'}</strong>
            <div className="feedback-explanation">{item.explanation}</div>
          </div>
          <button className="btn-gold" onClick={next}>
            {idx + 1 >= shuffled.length ? 'Finish Lesson' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  );
}
