import React, { useState } from 'react';
import { sound } from '../../services/soundEngine.js';

export default function Chapter2MahishasuraRise({ chapter, onAnswerSelected, selectedAnswer, onContinue }) {
  const [selected, setSelected] = useState(selectedAnswer || null);

  const handleSelect = (id) => {
    setSelected(id);
    if (id === chapter.scenePrediction.bestAnswer) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
    if (onAnswerSelected) onAnswerSelected(id);
  };

  const isBest = selected === chapter.scenePrediction.bestAnswer;

  return (
    <section className="screen screen-challenge" aria-labelledby="chapter2-heading">
      <div className="pybe-single-column">
        <header className="pybe-header-centered">
          <h2 id="chapter2-heading" className="pybe-story-title">
            Think it through
          </h2>
          <span className="pybe-progress-label">
            {selected ? '1 OF 1 ANSWERED' : '0 OF 1 ANSWERED'}
          </span>
        </header>

        {/* Question Card */}
        <div className="pybe-card pybe-question-card">
          <div className="question-title-row">
            <span className="question-num-circle">1</span>
            <h3 className="question-text">{chapter.scenePrediction.prompt}</h3>
          </div>

          <div className="pybe-options-list" role="radiogroup">
            {chapter.scenePrediction.options.map((opt) => {
              const isChosen = selected === opt.id;
              const isOptionBest = opt.id === chapter.scenePrediction.bestAnswer;
              let statusClass = '';
              if (selected) {
                if (isChosen && isOptionBest) statusClass = 'pybe-opt-correct';
                else if (isChosen && !isOptionBest) statusClass = 'pybe-opt-wrong';
                else if (isOptionBest) statusClass = 'pybe-opt-reveal';
              }

              return (
                <button
                  key={opt.id}
                  role="radio"
                  aria-checked={isChosen}
                  className={`pybe-option-row ${statusClass}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  <span className="option-label-text">{opt.text}</span>
                  {selected && isChosen && isOptionBest && <span className="check-icon">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Feedback Box */}
          {selected && (
            <div className={`pybe-feedback-box ${isBest ? 'feedback-correct' : 'feedback-hint'}`}>
              <span className="feedback-status-title">
                {isBest ? '✓ Correct' : '💡 Notice:'}
              </span>
              <p>{chapter.scenePrediction.explanations[selected]}</p>
            </div>
          )}
        </div>

        {/* Discovery Reveal Card (PyBe style) */}
        {selected && (
          <div className="pybe-discovery-reveal fade-in">
            <h3 className="reveal-heading">Here&rsquo;s what you just figured out.</h3>
            <p className="reveal-subtext">
              Programs crash when they assume input will always be valid. We need a safety shield to catch surprises.
            </p>

            <div className="reveal-cards-row">
              <div className="reveal-card">
                <span className="reveal-icon">⚡</span>
                <span className="reveal-tag">UNEXPECTED EVENT</span>
                <strong className="reveal-val">Visitor types invalid data</strong>
              </div>

              <span className="reveal-arrow">&rarr;</span>

              <div className="reveal-card">
                <span className="reveal-icon">🛡️</span>
                <span className="reveal-tag">SAFETY SHIELD</span>
                <strong className="reveal-val">Catch &amp; respond gracefully</strong>
              </div>
            </div>

            <div className="reveal-action-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  sound.playSuccess();
                  if (onContinue) onContinue();
                }}
              >
                See how Python handles this &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
