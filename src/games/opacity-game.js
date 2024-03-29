import React, { useState, useEffect } from 'react';

const OpacityGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(100);
  const [opacity, setOpacity] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setOpacity(1);
    setProgress(100);
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
    const progressBar = document.getElementById('progress-bar');
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const relativeX = clientX - progressBarRect.left;
    const percentage = (relativeX / progressBarRect.width) * 100;

    const stepValue = 10;
    const roundedPercentage = Math.round(percentage / stepValue) * stepValue;

    setProgress(Math.min(100, Math.max(0, roundedPercentage)));
    setOpacity(roundedPercentage / 100);
    setShowCongrats(roundedPercentage === 60);
    if (roundedPercentage < 0) {
        setIsDragging(false);
      }
    if (roundedPercentage > 100) {
        setIsDragging(false);
      }
  };

  return (
    <div className={`opacity-game ${showCongrats ? 'congrats-background' : ''}`}>
      <p className='game-header'>
        {showCongrats
          ? <b>Congratulations! 🥳</b>
          : <>Set the opacity value to <b>60%</b></>
        }
      </p>
      <div className="opacity-div" style={{ opacity: opacity }}></div>
      <div
        className="progress-bar"
        id="progress-bar"
        onMouseDown={handleDown}
        onTouchStart={handleDown}
      >
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="ball" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};

export default OpacityGame;
