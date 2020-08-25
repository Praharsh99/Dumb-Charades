import React from 'react';
import { connect } from 'react-redux';

import {
  selectBoardMessage,
  selectIsBlurred,
} from '../../redux/game/game.selectors';

import './display-section-content.style.css';

function DisplayContent({ isBlurred, boardMessage }) {
  return (
    <div
      className={`displaySection__contentContainer ${
        isBlurred ? 'display-blurred' : ''
      }`}
    >
      <h1 className="displaySection__content">{boardMessage}</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  boardMessage: selectBoardMessage(state),
  isBlurred: selectIsBlurred(state),
});

export default connect(mapStateToProps)(DisplayContent);
