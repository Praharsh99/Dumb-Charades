import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import Timer from './../timer/timer.component.jsx';
import DisplayHeader from './../display-section-header/display-section-header.component.jsx';
import DisplayContent from './../display-section-content/display-section-content.component.jsx';
import DisplayFooter from './../display-section-footer/display-section-footer.component.jsx';

import { setBoardMessage } from '../../redux/game/game.actions';

import './display-section.styles.css';

function DisplaySection({ socket }) {
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
      {/* Display Header */}
      <DisplayHeader />

      {/* Display Content Container */}
      <DisplayContent isBlurred={isBlurred} />

      {/* Display Footer */}
      <DisplayFooter
        handleStartGameClick={handleStartGameClick}
        startButtonDisabled={startButtonDisabled}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBoardMessage: (message) => dispatch(setBoardMessage(message)),
});

export default connect(null, mapDispatchToProps)(DisplaySection);
