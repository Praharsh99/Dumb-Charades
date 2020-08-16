import React from 'react';

import BlurredBox from './../blurred-box/blurred-box.component.jsx';

import './game-history.styles.css';

function GameHistory() {
  return (
    <BlurredBox width="100%" height="40%" backgroundPosition="top">
      <div className="gameHistory">
        <h1>Game History</h1>
      </div>
    </BlurredBox>
  );
}

export default GameHistory;
