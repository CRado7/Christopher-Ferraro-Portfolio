import React, { useEffect, useRef, useState } from 'react';
import '../styles/MarioPortfolio.css';
import MarioSprite from '../components/MarioSprite';
import AboutBlock from '../components/AboutBlock';
import projectsData from '../data/projectsData';

const GRAVITY = 0.6;
const JUMP_STRENGTH = -18;
const MOVE_SPEED = 5;
const JUMP_FRAME = 4;
const STAND_FRAME = 0;

export default function MarioPortfolio() {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [onGround, setOnGround] = useState(false);
  const keys = useRef({});
  const [frame, setFrame] = useState(0);
  const blockRefs = useRef([]);
  const gameRef = useRef();
  const [bumpedBrickIndex, setBumpedBrickIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);
  const viewButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const lastDirectionRef = useRef('right');
  const aboutContactButtonRef = useRef(null);
  const aboutCloseButtonRef = useRef(null);

  const handleContactClick = () => {
    window.location.href = 'mailto:christopher.ferraro34@gmail.com';
    setShowAboutModal(false);
  };
  
  useEffect(() => {
    if (selectedProject) {
      setFocusedIndex(0);
      viewButtonRef.current?.focus();
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject || showAboutModal) {
      setFocusedIndex(0);
      viewButtonRef.current?.focus();
    }
  }, [selectedProject, showAboutModal]);
  
  useEffect(() => {
    if (focusedIndex === 0) {
      selectedProject
        ? viewButtonRef.current?.focus()
        : aboutContactButtonRef.current?.focus();
    } else if (focusedIndex === 1) {
      selectedProject
        ? closeButtonRef.current?.focus()
        : aboutCloseButtonRef.current?.focus();
    }
  }, [focusedIndex, selectedProject, showAboutModal]);    

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isModalOpen = selectedProject || showAboutModal;
      if (isModalOpen) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          setFocusedIndex((prev) => (prev === 0 ? 1 : 0));
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedProject) {
            if (focusedIndex === 0) viewButtonRef.current?.click();
            else closeButtonRef.current?.click();
          } else if (showAboutModal) {
            if (focusedIndex === 0) aboutContactButtonRef.current?.click();
            else aboutCloseButtonRef.current?.click();
          }
        }
        return;
      }
  
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        keys.current[e.code] = true;
      }
    };
  
    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        keys.current[e.code] = false;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedProject, showAboutModal, focusedIndex]);  

  const openModalFromBlock = (index) => {
    const block = blockRefs.current[index];
    if (!block) return;

    const rect = block.getBoundingClientRect();

    setModalOrigin({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });

    const projectIndex = Math.floor(index / 2);
    setSelectedProject(projectsData[projectIndex]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let newVel = { ...velocity };
      let newPos = { ...position };

      if (keys.current['ArrowLeft']) newVel.x = -MOVE_SPEED;
      else if (keys.current['ArrowRight']) newVel.x = MOVE_SPEED;
      else newVel.x = 0;

      if (keys.current['Space'] && onGround) {
        newVel.y = JUMP_STRENGTH;
        setOnGround(false);
      }

      newVel.y += GRAVITY;
      newPos.x += newVel.x;
      newPos.y += newVel.y;

      const gameWidth = gameRef.current?.offsetWidth || 0;
      const marioWidth = 64;
      if (newPos.x < -marioWidth / 2) {
        newPos.x = gameWidth - marioWidth / 2;
      }
      if (newPos.x > gameWidth - marioWidth / 2) {
        newPos.x = -marioWidth / 2;
      }

      if (newPos.y >= 700) {
        newPos.y = 700;
        newVel.y = 0;
        setOnGround(true);
      }

      if (newVel.x !== 0) {
        setFrame((prev) => (prev + 1) % 4);
      }

      if (newVel.x < 0) lastDirectionRef.current = 'left';
      else if (newVel.x > 0) lastDirectionRef.current = 'right';

      const marioBox = {
        x: newPos.x,
        y: newPos.y,
        width: 64,
        height: 80,
      };

      let landed = false;

      blockRefs.current.forEach((block, index) => {
        if (!block || !gameRef.current) return;

        const rect = block.getBoundingClientRect();
        const gameRect = gameRef.current.getBoundingClientRect();

        const blockBox = {
          x: rect.left - gameRect.left,
          y: rect.top - gameRect.top,
          width: rect.width,
          height: rect.height,
        };

        const isLandingOnTop =
          marioBox.y + marioBox.height <= blockBox.y + 5 &&
          marioBox.y + marioBox.height + newVel.y >= blockBox.y &&
          marioBox.x + marioBox.width > blockBox.x &&
          marioBox.x < blockBox.x + blockBox.width &&
          newVel.y > 0;

        if (isLandingOnTop) {
          newPos.y = blockBox.y - marioBox.height;
          newVel.y = 0;
          landed = true;
        }

        const isColliding =
          marioBox.x < blockBox.x + blockBox.width &&
          marioBox.x + marioBox.width > blockBox.x &&
          marioBox.y < blockBox.y + blockBox.height &&
          marioBox.y + marioBox.height > blockBox.y;

        const isHittingFromBelow =
          marioBox.y + marioBox.height <= blockBox.y + 150 &&
          marioBox.y + marioBox.height >= blockBox.y - 20 &&
          newVel.y < 0;

          if (isColliding && isHittingFromBelow) {
            newPos.y = blockBox.y + blockBox.height;
            newVel.y = 0;
          
            console.log(`Mario bumped block #${index}`);
            setBumpedBrickIndex(index);
            setTimeout(() => setBumpedBrickIndex(null), 300);
          
            const aboutBlockIndex = projectsData.length * 2 + 1;
          
            if (index === aboutBlockIndex) {
              setShowAboutModal(true);
            } else if (index % 2 === 1) {
              openModalFromBlock(index);
            }
          }
      });

      setOnGround(newPos.y >= 500 || landed);
      setVelocity(newVel);
      setPosition(newPos);
    }, 1000 / 80);

    return () => clearInterval(interval);
  }, [velocity, position, onGround]);

  return (
    <div className="game-container" ref={gameRef}>
      <MarioSprite
        x={position.x}
        y={position.y}
        frame={!onGround ? JUMP_FRAME : velocity.x === 0 ? STAND_FRAME : frame}
        facing={lastDirectionRef.current}
      />

      <div className="project-row">
        {projectsData.map((project, index) => {
          const brickIndex = index * 2;
          const projectIndex = index * 2 + 1;

          return (
            <React.Fragment key={project.id}>
              <div
                className={`brick-block ${bumpedBrickIndex === brickIndex ? 'bump' : ''}`}
                ref={(el) => (blockRefs.current[brickIndex] = el)}
              />
              <div
                className={`project-block ${bumpedBrickIndex === projectIndex ? 'bump' : ''}`}
                ref={(el) => (blockRefs.current[projectIndex] = el)}
                onClick={() => openModalFromBlock(projectIndex)}
              />
            </React.Fragment>
          );
        })}
        <div
          className={`brick-block ${bumpedBrickIndex === projectsData.length * 2 ? 'bump' : ''}`}
          ref={(el) => (blockRefs.current[projectsData.length * 2] = el)}
        />
      </div>

      <div className="about-row">
        <AboutBlock
          index={projectsData.length * 2 + 1}
          bumpedBrickIndex={bumpedBrickIndex}
          setBumpedBrickIndex={setBumpedBrickIndex}
          showModal={() => setShowAboutModal(true)}
          blockRefs={blockRefs}
        />
        <div className="brick-block-row">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`brick-block ${
                bumpedBrickIndex === projectsData.length * 2 + 2 + i ? 'bump' : ''
              }`}
              ref={(el) =>
                (blockRefs.current[projectsData.length * 2 + 2 + i] = el)
              }
            />
          ))}
        </div>
      </div>

      {selectedProject && modalOrigin && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>{selectedProject.client}</h1>
            <p>{selectedProject.description}</p>
            <h3>{selectedProject.listTitle}</h3>
            <ul>
              {selectedProject.listItems?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>{selectedProject.listTitle2}</h3>
            <ul>
              {selectedProject.listItems2?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="tech-stack">
              {selectedProject.technologies?.map((tech, index) => (
                <div key={index} className="tech-item">
                  <img src={`/technologies/${tech}-logo.svg`} alt={tech} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
            <div className="project-buttons">
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                <button className="project-button" tabIndex={0} ref={viewButtonRef}>
                  View Project
                </button>
              </a>
              <button onClick={() => setSelectedProject(null)} tabIndex={0} ref={closeButtonRef}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>About Me</h1>
            <p>I’m a web developer, designer, and game-style portfolio builder who’s way too into Mario blocks.</p>
            <div className="project-buttons">
              <button
                tabIndex={0}
                ref={aboutContactButtonRef}
                onClick={handleContactClick}>
                Contact Me
              </button>
              <button
                onClick={() => setShowAboutModal(false)}
                tabIndex={0}
                ref={aboutCloseButtonRef}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="disclaimer">Please allow some time for projects hosted on Render to load.</p>
      
      <div className="gba-controls">
        <div className="dpad">
          <button
            onTouchStart={() => (keys.current['ArrowLeft'] = true)}
            onTouchEnd={() => (keys.current['ArrowLeft'] = false)}
            className="dpad-btn left"
          />
          <button
            onTouchStart={() => (keys.current['ArrowRight'] = true)}
            onTouchEnd={() => (keys.current['ArrowRight'] = false)}
            className="dpad-btn right"
          />
        </div>

        <div className="ab-buttons">
          <button
            onTouchStart={() => {
              if (onGround) {
                keys.current['Space'] = true;
                setTimeout(() => {
                  keys.current['Space'] = false;
                }, 100);
              }
            }}
            className="ab-btn a-btn"
          >
            A
          </button>
          <button
            onTouchStart={() => {
              // You can assign any action to B later
              keys.current['KeyB'] = true;
              setTimeout(() => {
                keys.current['KeyB'] = false;
              }, 100);
            }}
            className="ab-btn b-btn"
          >
            B
          </button>
        </div>
      </div>

    </div>
  );
}
