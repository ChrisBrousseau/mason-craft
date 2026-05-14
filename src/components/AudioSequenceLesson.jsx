import { useEffect, useRef, useState } from 'react';
import ProgBar from './ProgBar.jsx';

const QUESTION_PAUSE_MS = 1200;
const ANSWER_PAUSE_MS = 1800;

function delay(ms, runRef, runId, timeoutRef) {
  return new Promise(resolve => {
    timeoutRef.current = setTimeout(() => {
      if (runRef.current !== runId) return;
      resolve();
    }, ms);
  });
}

function speak(text, runRef, runId) {
  return new Promise(resolve => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.lang = 'en-AU';
    utterance.onend = () => {
      if (runRef.current !== runId) return;
      resolve();
    };
    utterance.onerror = () => {
      if (runRef.current !== runId) return;
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}

export default function AudioSequenceLesson({ items, onComplete }) {
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatEnabled, setRepeatEnabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [loopCount, setLoopCount] = useState(0);
  const runRef = useRef(0);
  const repeatRef = useRef(true);
  const timeoutRef = useRef(null);

  function stopPlayback() {
    runRef.current += 1;
    setIsPlaying(false);
    setPhase('idle');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  async function startPlayback() {
    if (!isSupported || isPlaying) return;

    const runId = runRef.current + 1;
    runRef.current = runId;
    setIsPlaying(true);
    setLoopCount(0);
    setCurrentIndex(0);

    while (runRef.current === runId) {
      for (let i = 0; i < items.length; i += 1) {
        if (runRef.current !== runId) return;

        setCurrentIndex(i);
        setPhase('question');
        await speak(items[i].q, runRef, runId);
        await delay(QUESTION_PAUSE_MS, runRef, runId, timeoutRef);

        if (runRef.current !== runId) return;

        setPhase('answer');
        await speak(items[i].a, runRef, runId);
        await delay(ANSWER_PAUSE_MS, runRef, runId, timeoutRef);
      }

      setLoopCount(count => count + 1);

      if (!repeatRef.current) break;
    }

    if (runRef.current === runId) {
      setIsPlaying(false);
      setPhase('done');
    }
  }

  useEffect(() => {
    repeatRef.current = repeatEnabled;
  }, [repeatEnabled]);

  useEffect(() => () => stopPlayback(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const item = items[currentIndex];
  const phaseLabel = phase === 'question'
    ? 'Speaking question'
    : phase === 'answer'
      ? 'Speaking answer'
      : phase === 'done'
        ? 'Sequence finished'
        : 'Ready';

  return (
    <div className="lesson-wrap">
      <div className="lesson-counter-row">
        <span>{currentIndex + 1} / {items.length}</span>
        <span className="known-count">Loops: {loopCount}</span>
      </div>
      <ProgBar val={currentIndex} max={items.length} />

      <p className="lesson-hint">
        Play the entire MM question-and-answer sequence in order, with a short pause between the question and the answer.
      </p>

      <div className="audio-control-row">
        <button className="btn-gold audio-btn" onClick={startPlayback} disabled={!isSupported || isPlaying}>
          {isPlaying ? 'Playing…' : '▶ Play Full Sequence'}
        </button>
        <button className="btn-outline audio-btn" onClick={stopPlayback}>
          Stop
        </button>
      </div>

      <div className="audio-control-row">
        <button className="btn-outline audio-btn" onClick={() => setRepeatEnabled(value => !value)}>
          {repeatEnabled ? 'Repeat: On' : 'Repeat: Off'}
        </button>
        <button className="btn-outline audio-btn" onClick={() => onComplete(1, 1)}>
          Mark Complete ✓
        </button>
      </div>

      {!isSupported && (
        <div className="audio-note">
          Full-sequence audio is not available in this browser, but the sequence text still appears below.
        </div>
      )}

      <div className="card quiz-card" style={{ marginTop: 20 }}>
        <div className="quiz-label">Current Sequence Item</div>
        <div className="audio-phase-label">{phaseLabel}</div>
        <div className="ordered-qa-question">{item.q}</div>
        <div className="ordered-qa-answer-label">Answer</div>
        <div className="ordered-qa-answer">{item.a}</div>
      </div>
    </div>
  );
}
