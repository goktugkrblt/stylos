import React, { useState, useEffect } from 'react';

const BorderRadiusGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setProgress(0);
    setBorderRadius(0);
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
    const progressBar = document.getElementById('progress-bar-radius');
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const relativeX = clientX - progressBarRect.left;
    let percentage = (relativeX / progressBarRect.width) * 100;
  
    const stepValue = 10;
    const roundedPercentage = Math.round(percentage / stepValue) * stepValue;
  
    setProgress(Math.min(100, Math.max(0, roundedPercentage)));
    setBorderRadius((roundedPercentage / 100) * 50);
    setShowCongrats(roundedPercentage === 60);

    if (roundedPercentage < 0) {
        setIsDragging(false);
      }
    if (roundedPercentage > 100) {
        setIsDragging(false);
      }
  };
  

  return (
    <div className={`border-radius-game ${showCongrats ? 'congrats-background' : ''}`}>
      <p className='game-header'>
        {showCongrats
          ? <b>Congratulations! 🥳</b>
          : <>Set the border radius value to <b>30px</b></>
        }
      </p>
      <div className="image-container">
        <img className='justdoitimg' style={{ borderRadius: `${borderRadius}px` }} src="justdoit.jpeg" alt="Your Image" />
      </div>
      <div className="progress-bar" id="progress-bar-radius"
        onMouseDown={handleDown}
        onTouchStart={handleDown}
      >
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="ball" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};

export default BorderRadiusGame;
