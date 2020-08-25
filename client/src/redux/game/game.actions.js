import GameActionTypes from './game.types';

export const setCurrentGame = (gameData) => ({
  type: GameActionTypes.SET_CURRENT_GAME,
  payload: gameData,
});

export const setBoardMessage = (message) => ({
  type: GameActionTypes.SET_BOARD_MESSAGE,
  payload: message,
});

export const setMyTurn = () => ({
  type: GameActionTypes.SET_MY_TURN,
});

export const toggleIsPlaying = (value) => ({
  type: GameActionTypes.TOGGLE_IS_PLAYING,
  payload: value,
});

export const setTimer = (time) => ({
  type: GameActionTypes.SET_TIMER,
  payload: time,
});

export const toggleActionButtons = (value) => ({
  type: GameActionTypes.TOGGLE_ACTION_BUTTONS,
  payload: value,
});

export const toggleIsBlurred = (value) => ({
  type: GameActionTypes.TOGGLE_IS_BLURRED,
  payload: value,
});
