import GameHistoryTypes from './history.types';

export const addNewGameHistoryData = (data) => ({
  type: GameHistoryTypes.NEW_GAME_HISTORY,
  payload: data,
});
