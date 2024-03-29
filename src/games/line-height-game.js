import React, { useState, useEffect } from 'react';

const LineHeightGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setProgress(0);
    setLineHeight(1.2);
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
    const progressBar = document.getElementById('progress-bar-line-height');
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const relativeX = clientX - progressBarRect.left;
    const percentage = (relativeX / progressBarRect.width) * 100;

    const stepValue = 10;
    const roundedPercentage = Math.round(percentage / stepValue) * stepValue;

    setProgress(Math.min(100, Math.max(0, roundedPercentage)));
    setLineHeight((roundedPercentage / 100) * 2);
    setShowCongrats(roundedPercentage === 60);
    if (roundedPercentage < 0) {
        setIsDragging(false);
      }
    if (roundedPercentage > 100) {
        setIsDragging(false);
      }
  };

  return (
    <div className={`line-height-game ${showCongrats ? 'congrats-background' : ''}`}>
      <p className='game-header'>
        {showCongrats
          ? <b>Congratulations! 🥳</b>
          : <>Set the line height value to <b>1.2</b></>
        }
      </p>
      <div className="paragraph-container">
        <p className='justdoit-paragraph' style={{ lineHeight: lineHeight }}>
        Software development blends creativity with logic, turning ideas into reality through code. Embrace challenges as chances to learn and improve. Conquering bugs brings you closer to success. Stay curious, stay inspired, and keep coding – in this world of possibilities, your imagination is the only limit.
        </p>
      </div>
      <div className="progress-bar" id="progress-bar-line-height" onMouseDown={handleDown} onTouchStart={handleDown}>
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="ball" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};

export default LineHeightGame;
