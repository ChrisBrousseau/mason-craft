export function buildQuiz(qaList) {
  return qaList.map(item => {
    const all   = qaList.map(x => x.a);
    const wrong = [...all.filter(a => a !== item.a)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: item.q,
      correct:  item.a,
      options:  [item.a, ...wrong].sort(() => Math.random() - 0.5),
    };
  });
}

export function ls_get(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}

export function ls_set(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function speakerClass(sp) {
  const s = sp.toLowerCase();
  if (s.includes('wm') || s.includes('pm'))                                    return ['speaker-wm',    'bubble-wm'];
  if (s.includes('jw') || s.includes('sw') || s.includes('jd') ||
      s.includes('sd') || s.includes('ig') || s.includes('tyler'))             return ['speaker-jw',    'bubble-jw'];
  if (s.includes('can.'))                                                       return ['speaker-can',   'bubble-can'];
  return ['speaker-other', 'bubble-other'];
}
