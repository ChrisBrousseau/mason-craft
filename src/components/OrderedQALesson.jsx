export default function OrderedQALesson({ items, onComplete, title }) {
  return (
    <div className="lesson-wrap ritual-read" style={{ paddingBottom: 40 }}>
      <h3 className="ritual-title">{title}</h3>
      <p className="lesson-hint">Read the full Third Degree question and answer sequence in order.</p>

      <div className="ordered-qa-list">
        {items.map((item, index) => (
          <div key={index} className="card ordered-qa-card">
            <div className="section-tag">Question {index + 1}</div>
            <div className="ordered-qa-question">{item.q}</div>
            <div className="ordered-qa-answer-label">Answer</div>
            <div className="ordered-qa-answer">{item.a}</div>
          </div>
        ))}
      </div>

      <button className="btn-gold" onClick={() => onComplete(items.length, items.length)}>
        Mark Complete ✓
      </button>
    </div>
  );
}
