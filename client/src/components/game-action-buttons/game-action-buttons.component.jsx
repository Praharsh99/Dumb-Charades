import React from 'react';

import './game-action-buttons.css';

function GameActionButtons() {
  return (
    <div className="gameActionButtons">
      <button className="gameActionButtons__play" id="Play" title="Play">
        Play
      </button>
      <button className="gameActionButtons__pause" id="Pause" title="Pause">
        Pause
      </button>
      <button
        className="gameActionButtons__approve"
        id="Approve"
        title="Approve"
      >
        Approve
      </button>
      <button className="gameActionButtons__reject" id="Reject" title="Reject">
        Reject
      </button>
      <button className="gameActionButtons__cancel" id="Cancel" title="Cancel">
        Cancel
      </button>
    </div>
  );
}

export default GameActionButtons;
