import React, { useState, useEffect } from 'react';

const LetterSpacingGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setProgress(0);
    setLetterSpacing(0);
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (isDragging) {
        updateProgress(event);
      }
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  const handleDown = () => {
    setIsDragging(true);
  };

  const updateProgress = (event) => {
    const progressBar = document.getElementById('progress-bar-letter-spacing');
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const relativeX = clientX - progressBarRect.left;
    const percentage = (relativeX / progressBarRect.width) * 100;

    const stepValue = 10;
    const roundedPercentage = Math.round(percentage / stepValue) * stepValue;

    setProgress(Math.min(100, Math.max(0, roundedPercentage)));
    setLetterSpacing((roundedPercentage / 100) * 10);
    setShowCongrats(roundedPercentage === 40);
    if (roundedPercentage < 0) {
        setIsDragging(false);
      }
    if (roundedPercentage > 100) {
        setIsDragging(false);
      }
  };

  return (
    <div className={`letter-spacing-game ${showCongrats ? 'congrats-background' : ''}`}>
      <p className='game-header'>
        {showCongrats
          ? <b>Congratulations! 🥳</b>
          : <>Set the letter spacing value to <b>4px</b></>
        }
      </p>
      <div className="paragraph-container">
        <p className='justdoit-paragraph' style={{ letterSpacing: `${letterSpacing}px` }}>
         
In code, each line blends creativity and logic. Challenges refine skills, bugs conquered mark victory laps to success. Stay curious, stay inspired, and code boundlessly!
        </p>
      </div>
      <div className="progress-bar" id="progress-bar-letter-spacing" onMouseDown={handleDown} onTouchStart={handleDown}>
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="ball" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};

export default LetterSpacingGame;
