import { useState } from 'react';
import ProgBar from './ProgBar.jsx';

export default function RecitationLesson({ items, onComplete, addXP }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const item = items[idx];

  function next(didKnow) {
    const nextScore = didKnow ? score + 1 : score;

    if (didKnow) {
      addXP(15);
      setScore(s => s + 1);
    }

    setRevealed(false);

    if (idx + 1 >= items.length) {
      onComplete(nextScore, items.length);
      return;
    }

    setIdx(i => i + 1);
  }

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{idx + 1} / {items.length}</span>
        <span className="known-count">✓ {score} recalled</span>
      </div>
      <ProgBar val={idx} max={items.length} />

      <p className="lesson-hint">
        Read the question, answer it from memory, then reveal the answer and grade yourself.
      </p>

      <div className="card quiz-card" style={{ marginTop: 20 }}>
        <div className="quiz-label">Question Only</div>
        <div className="quiz-question">{item.q}</div>
      </div>

      {!revealed ? (
        <button className="btn-outline" onClick={() => setRevealed(true)}>
          Reveal Answer
        </button>
      ) : (
        <div className="fadeUp">
          <div className="fc-box revealed recitation-answer-box">
            <div className="fc-label">Answer</div>
            <div className="fc-text">{item.a}</div>
          </div>
          <div className="btn-pair">
            <button className="btn-still-learning" onClick={() => next(false)}>
              ✗ Needs Work
            </button>
            <button className="btn-got-it" onClick={() => next(true)}>
              ✓ I Had It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
