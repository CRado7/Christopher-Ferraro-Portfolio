// Nav.js
import React, { useState, useEffect } from 'react';
import '../styles/Nav.css';

export default function Nav() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // Open modal on initial load
  }, []);

  return (
    <>
      <nav>
        <div className="nav-left">
          <h1>Christopher Ferraro</h1>
          <p>Full-Stack Web Developer</p>
        </div>
        <div className="nav-right">
          <button onClick={() => setShowModal(true)}>Controls</button>
          <button onClick={() => window.location.href = 'mailto:christopher.ferraro34@gmail.com'}>
            Contact
          </button>
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1 className="controls-header">Welcome to Christopher's Portfolio</h1>
            <h2 className="controls-subheader">Please read below for gameplay instructions</h2>
            <ul>
                <li>Use the left & right arrow keys to move Mario around and space bar to jump.</li>
                <li>Jump and bump blocks to see whats inside!</li>
                <li>Use the left & right arrow keys to navigate through modal options and spacebar to select an option.</li>
                <li>You can also use your mouse to click on mystery blocks if you dont feel like playing.</li>
                <li>Click "Controls" again if you forget!</li>
            </ul>
            <div className="project-buttons">
                <button onClick={() => setShowModal(false)}>Got it!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
