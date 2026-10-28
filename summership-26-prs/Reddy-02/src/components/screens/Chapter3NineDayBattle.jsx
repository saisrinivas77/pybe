import React, { useState } from 'react';
import { sound } from '../../services/soundEngine.js';

export default function Chapter3NineDayBattle({ chapter, onAnswerSelected, selectedAnswer, onContinue }) {
  const [selected, setSelected] = useState(selectedAnswer || null);
  const [activeStep, setActiveStep] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    if (id === chapter.codeProblem.correctId) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
    if (onAnswerSelected) onAnswerSelected(id);
  };

  const isCorrect = selected === chapter.codeProblem.correctId;

  return (
    <section className="screen screen-concept" aria-labelledby="chapter3-heading">
      <div className="pybe-single-column">
        <header className="pybe-header-centered">
          <h2 id="chapter3-heading" className="pybe-story-title">
            What is a ValueError?
          </h2>
          <p className="pybe-lead">
            The registration desk asks how many days remain. The visitor types the word <code>"nine"</code>.
          </p>
        </header>

        {/* Code Block Card */}
        <div className="pybe-card pybe-code-card">
          <div className="code-header-bar">
            <span className="code-filename">countdown.py</span>
          </div>
          <pre className="pybe-pre">
            <code>{chapter.codeProblem.code}</code>
          </pre>
        </div>

        {/* Question Card */}
        <div className="pybe-card pybe-question-card">
          <div className="question-title-row">
            <span className="question-num-circle">?</span>
            <h3 className="question-text">{chapter.codeProblem.question}</h3>
          </div>

          <div className="pybe-options-list" role="radiogroup">
            {chapter.codeProblem.options.map((opt) => {
              const isChosen = selected === opt.id;
              const isOptionCorrect = opt.id === chapter.codeProblem.correctId;
              let statusClass = '';
              if (selected) {
                if (isChosen && isOptionCorrect) statusClass = 'pybe-opt-correct';
                else if (isChosen && !isOptionCorrect) statusClass = 'pybe-opt-wrong';
                else if (isOptionCorrect) statusClass = 'pybe-opt-reveal';
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
                  {selected && isChosen && isOptionCorrect && <span className="check-icon">✓</span>}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className={`pybe-feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-hint'}`}>
              <span className="feedback-status-title">
                {isCorrect ? '✓ Correct' : '💡 Explanation:'}
              </span>
              <p>{chapter.codeProblem.explanations[selected]}</p>
            </div>
          )}
        </div>

        {/* Trace Table */}
        {selected && (
          <div className="pybe-card pybe-trace-card fade-in">
            <h3 className="trace-heading">Step-by-step execution</h3>
            <p className="trace-subtext">See why execution stopped and Line 3 was never reached:</p>

            <div className="pybe-trace-list">
              {chapter.codeProblem.exceptionTrace.map((row) => (
                <div
                  key={row.line}
                  className={`pybe-trace-row status-${row.status} ${activeStep === row.line ? 'row-active' : ''}`}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(row.line);
                  }}
                >
                  <span className="trace-step-tag">Line {row.line}</span>
                  <code className="trace-code-text">{row.code}</code>
                  <span className={`trace-pill pill-${row.status}`}>
                    {row.status === 'ok' && '✓ Normal'}
                    {row.status === 'raises' && '💥 ValueError'}
                    {row.status === 'skipped' && '⏭ Skipped'}
                  </span>
                  <span className="trace-note-text">{row.note}</span>
                </div>
              ))}
            </div>

            <div className="reveal-action-center" style={{ marginTop: '16px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  sound.playSuccess();
                  if (onContinue) onContinue();
                }}
              >
                See how to catch this error &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
