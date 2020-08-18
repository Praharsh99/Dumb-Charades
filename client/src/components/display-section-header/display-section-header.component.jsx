import React from 'react';
import { connect } from 'react-redux';

import { selectCurrentGame } from '../../redux/game/game.selectors';

import './display-section-header.style.css';

function DisplayHeader({ currentGame }) {
  return (
    <div className="displaySection__header">
      {currentGame ? (
        <div className="displaySection__teamName">
          {currentGame.team.replace('m', 'm ')}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentGame: selectCurrentGame(state),
});

export default connect(mapStateToProps)(DisplayHeader);
