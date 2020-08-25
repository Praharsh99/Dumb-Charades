import React from 'react';
import { connect } from 'react-redux';

import GameActionButtons from './../game-action-buttons/game-action-buttons.component.jsx';

import { selectCurrentGame } from '../../redux/game/game.selectors';

import './display-section-footer.style.css';

function DisplayFooter({
  socket,
  currentGame,
  handleStartGameClick,
  startButtonDisabled,
}) {
  return (
    <div className="displaySection__footer">
      {currentGame ? (
        <GameActionButtons socket={socket} />
      ) : (
        <button
          className="displaySection_startButton"
          onClick={handleStartGameClick}
          disabled={startButtonDisabled}
        >
          Start Game
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentGame: selectCurrentGame(state),
});

export default connect(mapStateToProps)(DisplayFooter);
