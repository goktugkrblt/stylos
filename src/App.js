import React, { useState, useEffect } from 'react';
import './App.css';
import BorderRadiusGame from './games/border-radius-game';
import FlexGapGame from './games/flex-gap-game';
import FontSizeGame from './games/fontsize-game';
import LetterSpacingGame from './games/letter-spacing-game';
import LineHeightGame from './games/line-height-game';
import OpacityGame from './games/opacity-game';


const App = () => {

  return (
    <div className="App">
      <div className='game-project-header'>
        <h1>Stylos</h1>
        <p>Experience a series of mini-games in Stylos, where you navigate through a progress bar to reach the correct outcome.</p>
      </div>
      <div className='game-grid'>
      <OpacityGame />
      <FontSizeGame />
      <FlexGapGame />
      <LineHeightGame />
      <LetterSpacingGame />
      <BorderRadiusGame />
      </div>

     

    </div>
  );
};

export default App;
