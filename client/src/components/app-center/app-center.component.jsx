import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DisplaySection from './../display-section/display-section.component.jsx';
import InputBar from './../input-bar/input-bar.component.jsx';

import {
  setCurrentGame,
  setBoardMessage,
  setMyTurn,
} from '../../redux/game/game.actions';
import { selectMyTurn } from '../../redux/game/game.selectors';

import './app-center.styles.css';

function AppCenter({
  socket,
  setCurrentGame,
  myTurn,
  setMyTurn,
  setBoardMessage,
}) {
  const [guessWord, setGuessWord] = useState('');

  useEffect(() => {
    // Event emmited by the server, occurs when both teams are ready
    socket.on('setup-game', (game, points) => {
      setCurrentGame(game, points);
      setBoardMessage('Game started, wait for your turn!');
    });

    // Server emits this event to tell us that it's our turn
    socket.on('your-turn', () => {
      setMyTurn();
      setBoardMessage("It's your turn");
    });

    // Event occurs when the server validates the guess word and send a response
    socket.on('guess-word-response', (res) => {
      if (res.status) {
        let ans = window.confirm(res.message);
        if (ans) {
          socket.emit('confirm-guess-word');
          setMyTurn();
        }
      } else {
        setBoardMessage(res.message);
      }
    });
  }, []);

  const handleChange = (e) => {
    setGuessWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guessWord.trim().length > 0) {
      socket.emit('guess-word-submit', guessWord.trim());

      setGuessWord('');
      e.target.focus();
    }
  };

  return (
    <div className="app__center">
      <DisplaySection socket={socket} />

      <form onSubmit={handleSubmit}>
        <InputBar
          width="100%"
          height="100%"
          placeholder="Enter word here..."
          maxLength="64"
          value={guessWord}
          handleChange={handleChange}
          isDisabled={!myTurn}
          fontSize="55px"
          paddingTop="50px"
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  myTurn: selectMyTurn(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (game, points) => dispatch(setCurrentGame({ game, points })),
  setBoardMessage: (message) => dispatch(setBoardMessage(message)),
  setMyTurn: () => dispatch(setMyTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCenter);
