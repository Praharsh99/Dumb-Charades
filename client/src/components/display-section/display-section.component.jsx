import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import Timer from './../timer/timer.component.jsx';
import DisplayHeader from './../display-section-header/display-section-header.component.jsx';
import DisplayContent from './../display-section-content/display-section-content.component.jsx';
import DisplayFooter from './../display-section-footer/display-section-footer.component.jsx';

import {
  setBoardMessage,
  toggleActionButtons,
  toggleIsBlurred,
} from '../../redux/game/game.actions';

import {
  selectBoardMessage,
  selectIsBlurred,
} from '../../redux/game/game.selectors';

import './display-section.styles.css';

function DisplaySection({
  socket,
  isBlurred,
  setBoardMessage,
  toggleActionButtonsState,
  toggleIsBlurred,
  boardMessage,
}) {
  const [startButtonDisabled, setStartButton] = useState(false);

  useEffect(() => {
    // Event fired when another team is ready, and server send a alert of that
    socket.on('notification-other-team-acknowledged', () => {
      setBoardMessage('Other team is ready! Click on the button to start');
    });

    // Event fired when another team sends a guess word
    socket.on('received-guess-word', (guessWord) => {
      setBoardMessage(guessWord);
      toggleIsBlurred(true);
      toggleActionButtonsState(false);
    });

    socket.on('reveal-guess-word', () => {
      toggleIsBlurred(false);
    });

    socket.on('response-already-recorded', () => {
      alert('Response not accepted! 👎🏼');
    });

    socket.on('game-complete-response', (response) => {
      const { status, message } = response;

      if (isBlurred) toggleIsBlurred(false);

      if (status) {
        setBoardMessage(message);
      } else {
        alert(message);
      }
    });
  }, []);

  const handleStartGameClick = () => {
    setStartButton(true);

    socket.emit('team-acknowledged');
    setBoardMessage('Waiting for other team... 🙄');
  };

  return (
    <div className="displaySection">
      {/* Display Header */}
      <DisplayHeader />

      {/* Display Content Container */}
      <DisplayContent />

      {/* Display Footer */}
      <DisplayFooter
        socket={socket}
        handleStartGameClick={handleStartGameClick}
        startButtonDisabled={startButtonDisabled}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  boardMessage: selectBoardMessage(state),
  isBlurred: selectIsBlurred(state),
});

const mapDispatchToProps = (dispatch) => ({
  setBoardMessage: (message) => dispatch(setBoardMessage(message)),
  toggleActionButtonsState: (value) => dispatch(toggleActionButtons(value)),
  toggleIsBlurred: (value) => dispatch(toggleIsBlurred(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySection);
