import { useState, useCallback } from 'react';

import { ls_get, ls_set } from './utils.js';
import { EA_MODULES, FC_MODULES, ALL_MODULES } from './data/modules.js';

import MasonicEmblem      from './components/MasonicEmblem.jsx';
import AllSeeingEye       from './components/AllSeeingEye.jsx';
import TopBar             from './components/TopBar.jsx';
import ProgBar            from './components/ProgBar.jsx';
import FlashcardLesson    from './components/FlashcardLesson.jsx';
import QuizLesson         from './components/QuizLesson.jsx';
import RitualLesson       from './components/RitualLesson.jsx';
import OfficersLesson     from './components/OfficersLesson.jsx';
import WorkingToolsLesson from './components/WorkingToolsLesson.jsx';
import FillBlankLesson    from './components/FillBlankLesson.jsx';
import ResultScreen       from './components/ResultScreen.jsx';

/* ── Tessellated floor row — decorative divider ─────────────────── */
function TessRow({ count = 20, accent = '#c9a84c' }) {
  const dark  = 'rgba(0,0,0,0.55)';
  const light = `${accent}22`;
  return (
    <div className="degree-tess-row">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="degree-tess-sq" style={{ background: i % 2 === 0 ? dark : light }} />
      ))}
    </div>
  );
}

/* ── Degree divider ─────────────────────────────────────────────── */
function DegreeDivider({ label, color, progress }) {
  return (
    <div className="degree-divider">
      <TessRow count={24} accent={color} />
      <div className="degree-divider-inner">
        <span className="degree-diamond" style={{ color }}>◆</span>
        <span className="degree-divider-label" style={{ color }}>{label}</span>
        <span className="degree-diamond" style={{ color }}>◆</span>
      </div>
      <TessRow count={24} accent={color} />
      <div className="degree-progress-text">{progress}</div>
    </div>
  );
}

/* ── Module card ────────────────────────────────────────────────── */
function ModuleCard({ mod, done, onClick, accentColor }) {
  return (
    <div
      className={`module-card ${done ? 'done' : ''}`}
      style={{ '--accent': accentColor }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="module-card-top">
        <span className="module-icon">{mod.icon}</span>
        <div className="module-card-badges">
          {done && <span className="badge-done">✓</span>}
          <span className="badge">+{mod.xp} XP</span>
        </div>
      </div>
      <div className="module-title">{mod.title}</div>
      <div className="module-sub">{mod.sub}</div>
    </div>
  );
}

/* ── Home screen ────────────────────────────────────────────────── */
function HomeScreen({ xp, streak, completed, onOpen }) {
  const pct    = Math.round((completed.length / ALL_MODULES.length) * 100);
  const eaDone = EA_MODULES.filter(m => completed.includes(m.id)).length;
  const fcDone = FC_MODULES.filter(m => completed.includes(m.id)).length;

  /* Tessellated row in the hero */
  const heroTess = Array.from({ length: 28 });

  return (
    <div className="page home-page">
      {/* Hero */}
      <div className="home-hero">

        {/* All-Seeing Eye */}
        <div className="home-eye-wrap">
          <AllSeeingEye size={56} color="#c9a84c" />
        </div>

        {/* Square & Compass */}
        <div className="home-emblem-wrap">
          <MasonicEmblem size={80} color="#c9a84c" />
        </div>

        <h1 className="home-title">Mason Craft</h1>
        <p className="home-subtitle">Freemasons Victoria · EA &amp; FC Degrees</p>

        {/* Tessellated strip */}
        <div className="tess-row" style={{ marginTop: 20 }}>
          {heroTess.map((_, i) => (
            <div key={i} className="tess-square"
              style={{ background: i % 2 === 0 ? '#0d0804' : 'rgba(201,168,76,0.18)' }} />
          ))}
        </div>

        <div className="home-stats">
          <div className="hstat">
            <div className="hstat-val">{xp}</div>
            <div className="hstat-lbl">Total XP</div>
          </div>
          <div className="hstat-divider" />
          <div className="hstat">
            <div className="hstat-val" style={{ color: '#d04040' }}>🔥 {streak}</div>
            <div className="hstat-lbl">Streak</div>
          </div>
          <div className="hstat-divider" />
          <div className="hstat">
            <div className="hstat-val" style={{ color: '#6ab060' }}>{completed.length}/{ALL_MODULES.length}</div>
            <div className="hstat-lbl">Completed</div>
          </div>
        </div>

        <div className="home-progress-wrap">
          <div className="home-progress-label">
            <span>Overall Progress</span>
            <span style={{ color: '#c9a84c' }}>{pct}%</span>
          </div>
          <ProgBar val={completed.length} max={ALL_MODULES.length} />
        </div>
      </div>

      {/* Module sections */}
      <div className="home-content">

        {/* EA — copper accent */}
        <DegreeDivider
          label="First Degree · Entered Apprentice"
          color="#c87533"
          progress={`${eaDone} of ${EA_MODULES.length} complete`}
        />
        <div className="module-grid">
          {EA_MODULES.map(mod => (
            <ModuleCard key={mod.id} mod={mod} done={completed.includes(mod.id)}
              onClick={() => onOpen(mod)} accentColor="#c87533" />
          ))}
        </div>

        {/* FC — gold accent */}
        <DegreeDivider
          label="Second Degree · Fellow Craft"
          color="#c9a84c"
          progress={`${fcDone} of ${FC_MODULES.length} complete`}
        />
        <div className="module-grid">
          {FC_MODULES.map(mod => (
            <ModuleCard key={mod.id} mod={mod} done={completed.includes(mod.id)}
              onClick={() => onOpen(mod)} accentColor="#c9a84c" />
          ))}
        </div>

        <div className="note-box">
          <div className="note-box-title">📌 About this app</div>
          <div className="note-box-body">
            All coded words from both degrees are fully revealed — BOAZ (EA), JACHIN (FC),
            SHIBBOLETH (pass word), signs, grips, penal signs, and all preparation details.
            Content drawn from the official FMV document (Information on Lodge Workings, June 2017).
            EA and FC only — no Third Degree content is included.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Lesson header ──────────────────────────────────────────────── */
function LessonHeader({ module, accent }) {
  const degreeLabel = module.degree === 'ea'
    ? 'First Degree · Entered Apprentice'
    : 'Second Degree · Fellow Craft';
  return (
    <div className="lesson-header">
      <div className="lesson-icon">{module.icon}</div>
      <h2 className="lesson-title">{module.title}</h2>
      <p className="lesson-sub">{module.sub}</p>
      <div className="lesson-degree-badge" style={{ color: accent }}>{degreeLabel}</div>
    </div>
  );
}

/* ── Root App ───────────────────────────────────────────────────── */
export default function App() {
  const [screen,    setScreen]    = useState('home');
  const [module,    setModule]    = useState(null);
  const [result,    setResult]    = useState(null);
  const [xpEarned,  setXpEarned]  = useState(0);
  const [xp,        setXp]        = useState(() => ls_get('fm_xp', 0));
  const [streak,    setStreak]    = useState(() => ls_get('fm_streak', 0));
  const [hearts,    setHearts]    = useState(3);
  const [completed, setCompleted] = useState(() => ls_get('fm_done', []));

  const addXP     = useCallback(n => setXp(prev => { const v = prev + n; ls_set('fm_xp', v); return v; }), []);
  const loseHeart = useCallback(() => setHearts(h => Math.max(0, h - 1)), []);

  function markDone(id) {
    setCompleted(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id]; ls_set('fm_done', next); return next;
    });
    setStreak(s => { const v = s + 1; ls_set('fm_streak', v); return v; });
  }

  function handleComplete(score, total) {
    const earned = Math.max(score, 0) * 10 + (module?.xp || 0);
    addXP(earned); setXpEarned(earned); markDone(module.id);
    setResult({ score, total }); setScreen('result');
  }

  function openModule(mod) { setModule(mod); setResult(null); setHearts(3); setScreen('lesson'); }
  function goHome()        { setScreen('home'); setModule(null); }

  if (screen === 'home') {
    return <HomeScreen xp={xp} streak={streak} completed={completed} onOpen={openModule} />;
  }

  const isEA   = module?.degree === 'ea';
  const accent = isEA ? '#c87533' : '#c9a84c';   /* copper for EA, gold for FC */

  if (screen === 'result' && result) {
    return (
      <div className="page" style={{ paddingTop: 72 }}>
        <TopBar xp={xp} streak={streak} hearts={hearts} onBack={goHome} accentColor={accent} />
        <ResultScreen score={result.score} total={result.total} xpEarned={xpEarned}
          onHome={goHome}
          onRetry={() => { setResult(null); setHearts(3); setScreen('lesson'); }} />
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 40 }}>
      <TopBar xp={xp} streak={streak} hearts={hearts} onBack={goHome} accentColor={accent} />
      <LessonHeader module={module} accent={accent} />
      <div className="lesson-body">
        {module?.type === 'flash'     && <FlashcardLesson    cards={module.data}         onComplete={handleComplete} addXP={addXP} />}
        {module?.type === 'quiz'      && <QuizLesson         questions={module.quizData} onComplete={handleComplete} addXP={addXP} loseHeart={loseHeart} label={module.label} />}
        {module?.type === 'officers'  && <OfficersLesson                                 onComplete={handleComplete} addXP={addXP} loseHeart={loseHeart} />}
        {module?.type === 'ritual'    && <RitualLesson       sections={module.sections}  onComplete={handleComplete} title={module.title} />}
        {module?.type === 'fillblank' && <FillBlankLesson    items={module.data}          onComplete={handleComplete} addXP={addXP} loseHeart={loseHeart} />}
        {module?.type === 'tools'     && (
          <WorkingToolsLesson
            toolsData={module.toolsData}   quizItems={module.quizItems}
            degreeLabel={module.degreeLabel} chargeText={module.chargeText}
            onComplete={handleComplete}    addXP={addXP}  loseHeart={loseHeart}
          />
        )}
      </div>
    </div>
  );
}
