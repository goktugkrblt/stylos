import React, { useState, useEffect } from 'react';

const FlexGapGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gapSize, setGapSize] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setProgress(0);
    setGapSize(0);
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
    const progressBar = document.getElementById('progress-bar-gap');
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const relativeX = clientX - progressBarRect.left;
    const percentage = (relativeX / progressBarRect.width) * 100;

    const stepValue = 10;
    const roundedPercentage = Math.round(percentage / stepValue) * stepValue;

    setProgress(Math.min(100, Math.max(0, roundedPercentage)));
    setGapSize((roundedPercentage / 100) * 40);
    setShowCongrats(roundedPercentage === 60);
    if (roundedPercentage < 0) {
        setIsDragging(false);
      }
    if (roundedPercentage > 100) {
        setIsDragging(false);
      }
  };

  return (
    <div className={`flex-gap-game ${showCongrats ? 'congrats-background' : ''}`}>
      <p className='game-header'>
        {showCongrats
          ? <b>Congratulations! ❤️❤️</b>
          : <>Set the gap size to <b>24px</b></>
        }
      </p>

      <div className="flex-container" style={{ columnGap: `${gapSize}px` }}>
        <div className="box1" />
        <div className="box2" />
      </div>
      <div className="progress-bar"
      id="progress-bar-gap"
        onMouseDown={handleDown}
        onTouchStart={handleDown}
      >
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="ball" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};

export default FlexGapGame;
