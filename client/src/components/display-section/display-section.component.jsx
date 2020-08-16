import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import GameActionButtons from './../game-action-buttons/game-action-buttons.component.jsx';

import { setBoardMessage } from '../../redux/game/game.actions';

import {
  selectCurrentGame,
  selectBoardMessage,
} from '../../redux/game/game.selectors';

import './display-section.styles.css';

function DisplaySection({
  socket,
  setBoardMessage,
  currentGame,
  boardMessage,
}) {
  const [startButtonDisabled, setStartButton] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Event fired when another team is ready, and server send a alert of that
    socket.on('notification-other-team-acknowledged', () => {
      setBoardMessage('Other team is ready! Click on the button to start');
    });

    // Event fired when another team sends a guess word
    socket.on('received-guess-word', (guessWord) => {
      setBoardMessage(guessWord);
      setIsBlurred(true);
    });
  }, []);

  const handleStartGameClick = () => {
    setStartButton(true);

    socket.emit('team-acknowledged');
    setBoardMessage('Waiting for other team...');
  };

  return (
    <div className="displaySection">
      <div className="displaySection__header">
        {currentGame ? (
          <div className="displaySection__teamName">
            {currentGame.team.replace('m', 'm ')}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={`displaySection__contentContainer ${
          isBlurred ? 'display-blurred' : ''
        }`}
      >
        <h1 className="displaySection__content">{boardMessage}</h1>
      </div>

      {/* Buttons container */}
      <div className="displaySection__footer">
        {currentGame ? (
          <GameActionButtons />
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentGame: selectCurrentGame(state),
  boardMessage: selectBoardMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setBoardMessage: (message) => dispatch(setBoardMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySection);
