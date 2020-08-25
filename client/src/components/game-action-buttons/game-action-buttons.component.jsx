import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { toggleIsPlaying } from './../../redux/game/game.actions';

import {
  selectIsPlaying,
  selectActionBtnDisabled,
} from './../../redux/game/game.selectors';

import './game-action-buttons.css';

function GameActionButtons({
  isPlaying,
  isDisabled,
  togglePlayPauseBtn,
  socket,
}) {
  const handleClick = (e) => {
    if (e.target.id === 'play' || e.target.id === 'pause') {
      togglePlayPauseBtn(e.target.id === 'play' ? true : false);
      socket.emit('actions-btn-click', e.target.id);
    } else {
      // Explicitly PAUSING the game when a button is clicked
      togglePlayPauseBtn(false);
      socket.emit('actions-btn-click', 'pause');

      const res = window.confirm(
        `Are you sure that you want to send your response as "${e.target.id}"`
      );

      if (res) {
        socket.emit('actions-btn-click', e.target.id);
      } else {
        // If no action is sent to the server then we continue the game
        togglePlayPauseBtn(true);
        socket.emit('actions-btn-click', 'play');
      }
    }
  };

  return (
    <div className="gameActionButtons">
      {isPlaying ? (
        <button
          disabled={isDisabled}
          id="pause"
          className="gameActionButtons__pause"
          onClick={handleClick}
        >
          Pause
        </button>
      ) : (
        <button
          disabled={isDisabled}
          id="play"
          className="gameActionButtons__play"
          onClick={handleClick}
        >
          Play
        </button>
      )}

      <button
        disabled={isDisabled}
        onClick={handleClick}
        id="approve"
        className="gameActionButtons__approve"
      >
        Approve
      </button>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        id="reject"
        className="gameActionButtons__reject"
      >
        Reject
      </button>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        id="cancel"
        className="gameActionButtons__cancel"
      >
        Cancel
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isPlaying: selectIsPlaying(state),
  isDisabled: selectActionBtnDisabled(state),
});

const mapDispatchToProps = (dispatch) => ({
  togglePlayPauseBtn: (value) => dispatch(toggleIsPlaying(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameActionButtons);
