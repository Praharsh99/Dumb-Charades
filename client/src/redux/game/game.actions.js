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
