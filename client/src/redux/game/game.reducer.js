import GameActionTypes from './game.types';

const INITIAL_STATE = {
  currentGame: null,
  currentWord: null,
  myTurn: false,
  points: ['-', '-'],
  boardMessage: 'Welcome! to DUMB CHARADES',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.SET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload.game,
        points: action.payload.points,
      };

    case GameActionTypes.SET_BOARD_MESSAGE:
      return {
        ...state,
        boardMessage: action.payload,
      };

    case GameActionTypes.SET_MY_TURN:
      return {
        ...state,
        myTurn: !state.myTurn,
      };

    default:
      return state;
  }
};

export default gameReducer;
