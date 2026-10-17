import React, { useState, useEffect } from 'react';
import { sound } from '../../services/soundEngine.js';

export default function Chapter9Completion({ chapter, assessmentScore, onRestart }) {
  const [learnerName, setLearnerName] = useState('Resilient Pythonista');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    sound.playCelebration();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="screen screen-completion" aria-labelledby="chapter9-heading">
      <div className="content-container">
        {/* Confetti & Diya Celebration Orbs */}
        <div className="celebration-particles" aria-hidden="true">
          <span className="confetti c1">✨</span>
          <span className="confetti c2">🪔</span>
          <span className="confetti c3">🌟</span>
          <span className="confetti c4">🌺</span>
          <span className="confetti c5">✨</span>
          <span className="confetti c6">🪔</span>
        </div>

        <header className="screen-header text-center">
          <div className="completion-diya-glow">🪔</div>
          <h2 id="chapter9-heading" className="screen-title">{chapter.title}</h2>
          <p className="screen-lead">{chapter.completionMessage}</p>
        </header>

        {/* Certificate of Mastery Card */}
        <div className="certificate-frame">
          <div className="certificate-inner">
            <div className="certificate-top-banner">
              <span className="cert-seal">🏅</span>
              <span className="cert-org">Vicharanashala &bull; Lab for Education Design, IIT Ropar</span>
            </div>

            <h3 className="cert-title">Certificate of Vijayadashami Mastery</h3>
            <p className="cert-subtext">This certifies that</p>

            <div className="cert-name-row">
              {isEditingName ? (
                <input
                  type="text"
                  className="cert-name-input"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                />
              ) : (
                <span className="cert-learner-name" onClick={() => setIsEditingName(true)} title="Click to personalize name">
                  {learnerName} <span className="edit-pencil-icon">✏️</span>
                </span>
              )}
            </div>

            <p className="cert-body">
              has completed the immersive discovery lab in <strong>Python Exception Handling</strong>, demonstrating resilience in handling <em>ValueError</em>, <em>KeyError</em>, and mastering the full <em>try / except / else / finally</em> lifecycle.
            </p>

            <div className="cert-footer-row">
              <div className="cert-detail">
                <span className="detail-label">Assessment Score:</span>
                <span className="detail-value">{assessmentScore ? `${assessmentScore.score} / 5` : '5 / 5'} (Passed)</span>
              </div>
              <div className="cert-detail">
                <span className="detail-label">Date Issued:</span>
                <span className="detail-value">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="cert-actions no-print">
            <button className="btn btn-primary" onClick={handlePrint}>
              🖨️ Print / Save Certificate
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                sound.playCelebration();
              }}
            >
              🔔 Replay Victory Chimes
            </button>
          </div>
        </div>

        {/* Concept Reference Cheat Sheet */}
        <div className="cheat-sheet-card">
          <h3 className="cheat-sheet-title">📜 Exception Handling Reference Cheat Sheet</h3>
          <div className="cheat-grid">
            {chapter.conceptsSummary.map((item, idx) => (
              <div key={idx} className="cheat-item">
                <div className="cheat-header">
                  <code className="cheat-keyword">{item.keyword}</code>
                </div>
                <p className="cheat-def">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="completion-bottom-actions no-print">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
          >
            🔄 Replay Discovery Lab from Beginning
          </button>
        </div>
      </div>
    </section>
  );
}
