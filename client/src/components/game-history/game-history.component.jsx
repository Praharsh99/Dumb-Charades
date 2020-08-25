import React from 'react';
import { connect } from 'react-redux';

import BlurredBox from './../blurred-box/blurred-box.component.jsx';

import { selectHistory } from './../../redux/game-history/history.selectors';

import './game-history.styles.css';

function GameHistory({ gameHistory }) {
  return (
    <BlurredBox width="100%" height="40%" backgroundPosition="top">
      <div className="gameHistory">
        <div className="gameHistory__gameDataHeading">
          <span>Status</span>
          <span>Word</span>
          <span>Won by</span>
          <span>Points</span>
          <span>Time</span>
        </div>
        {gameHistory?.length ? (
          gameHistory.map(({ points, status, timeTaken, wonBy, word }, idx) => (
            <div className="gameHistory__gameData" key={idx}>
              <span>
                {status.charAt(0).toUpperCase() + status.substring(1)}
              </span>
              <span>{word.length > 4 ? word.slice(0, 4) + '...' : word}</span>
              <span>{wonBy}</span>
              <span>{points}</span>
              <span>{timeTaken}</span>
            </div>
          ))
        ) : (
          <div className="gameHistory__noData">No game history available!</div>
        )}
      </div>
    </BlurredBox>
  );
}

const mapStateToProps = (state) => ({
  gameHistory: selectHistory(state),
});

export default connect(mapStateToProps)(GameHistory);
