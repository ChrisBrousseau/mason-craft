import { useState, useMemo } from 'react';
import ProgBar from './ProgBar.jsx';

export default function FlashcardLesson({ cards, onComplete, addXP }) {
  const shuffled  = useMemo(() => [...cards].sort(() => Math.random() - 0.5), []);
  const [idx,      setIdx]      = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known,    setKnown]    = useState(0);

  const card = shuffled[idx];

  function next(didKnow) {
    if (didKnow) { addXP(5); setKnown(k => k + 1); }
    setRevealed(false);
    if (idx + 1 >= shuffled.length) {
      setTimeout(() => onComplete(didKnow ? known + 1 : known, shuffled.length), 200);
    } else {
      setTimeout(() => setIdx(i => i + 1), 150);
    }
  }

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{idx + 1} / {shuffled.length}</span>
        <span className="known-count">✓ {known} known</span>
      </div>
      <ProgBar val={idx} max={shuffled.length} />

      <p className="lesson-hint">{revealed ? 'How did you do?' : 'Tap the card to reveal the answer'}</p>

      <div
        className={`fc-box ${revealed ? 'revealed' : ''}`}
        onClick={() => setRevealed(true)}
      >
        {!revealed ? (
          <>
            <div className="fc-label">Question</div>
            <div className="fc-text">{card.q}</div>
            <div className="fc-sub">tap to reveal</div>
          </>
        ) : (
          <>
            <div className="fc-label">Answer</div>
            <div className="fc-text">{card.a}</div>
          </>
        )}
      </div>

      {revealed && (
        <div className="fadeUp btn-pair">
          <button
            onClick={() => next(false)}
            className="btn-still-learning"
          >
            ✗ Still learning
          </button>
          <button
            onClick={() => next(true)}
            className="btn-got-it"
          >
            ✓ Got it!
          </button>
        </div>
      )}
    </div>
  );
}
