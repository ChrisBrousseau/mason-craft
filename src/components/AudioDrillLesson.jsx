import { useEffect, useRef, useState } from 'react';
import ProgBar from './ProgBar.jsx';

export default function AudioDrillLesson({ items, onComplete, addXP }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const utteranceRef = useRef(null);

  const item = items[idx];

  function stopSpeech() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  }

  function speakQuestion() {
    if (!isSupported) return;

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(item.q);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.lang = 'en-AU';
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function next(didKnow) {
    const nextScore = didKnow ? score + 1 : score;

    if (didKnow) {
      addXP(15);
      setScore(s => s + 1);
    }

    stopSpeech();
    setRevealed(false);

    if (idx + 1 >= items.length) {
      onComplete(nextScore, items.length);
      return;
    }

    setIdx(i => i + 1);
  }

  useEffect(() => {
    if (autoPlay) speakQuestion();

    return () => stopSpeech();
  }, [idx, autoPlay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{idx + 1} / {items.length}</span>
        <span className="known-count">✓ {score} answered</span>
      </div>
      <ProgBar val={idx} max={items.length} />

      <p className="lesson-hint">
        Listen to the question, answer it aloud yourself, then reveal the answer only when you want to check.
      </p>

      <div className="audio-control-row">
        <button className="btn-outline audio-btn" onClick={speakQuestion} disabled={!isSupported}>
          🔊 Play Question
        </button>
        <button className="btn-outline audio-btn" onClick={() => setAutoPlay(value => !value)}>
          {autoPlay ? 'Auto Play: On' : 'Auto Play: Off'}
        </button>
      </div>

      {!isSupported && (
        <div className="audio-note">
          Audio playback is not available in this browser, but you can still use the question-only drill below.
        </div>
      )}

      <div className="card quiz-card" style={{ marginTop: 20 }}>
        <div className="quiz-label">Question Audio Drill</div>
        <div className="quiz-question">{item.q}</div>
      </div>

      {!revealed ? (
        <button className="btn-gold" onClick={() => setRevealed(true)}>
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
