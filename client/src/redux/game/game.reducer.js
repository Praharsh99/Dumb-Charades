import GameActionTypes from './game.types';

const INITIAL_STATE = {
  currentGame: null,
  currentWord: null,
  myTurn: false,
  points: ['-', '-'],
  isPlaying: false,
  boardMessage: 'Welcome! to DUMB CHARADES',
  timer: '00 : 00',
  actionsButtonsDisabled: true,
  isBlurred: false,
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

    case GameActionTypes.TOGGLE_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };

    case GameActionTypes.SET_TIMER:
      return {
        ...state,
        timer: action.payload,
      };

    case GameActionTypes.TOGGLE_ACTION_BUTTONS:
      return {
        ...state,
        actionsButtonsDisabled: action.payload,
      };

    case GameActionTypes.TOGGLE_IS_BLURRED:
      return {
        ...state,
        isBlurred: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
