import React from 'react';
import { connect } from 'react-redux';

import {
  selectCurrentGame,
  selectTimer,
} from '../../redux/game/game.selectors';

import './display-section-header.style.css';

function DisplayHeader({ currentGame, timer }) {
  return (
    <div className="displaySection__header">
      {currentGame ? (
        <div className="displaySection__subHeader">
          <div className="displaySection__teamName">
            {currentGame.team.replace('m', 'm ')}
          </div>

          <div className="displaySection__timer">{timer}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentGame: selectCurrentGame(state),
  timer: selectTimer(state),
});

export default connect(mapStateToProps)(DisplayHeader);
