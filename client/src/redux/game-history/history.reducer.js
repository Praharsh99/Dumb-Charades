import GameHistoryTypes from './history.types';
import { addNewGameHistory } from './history.utils';

const INITIAL_STATE = {
  history: [],
};

const gameHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameHistoryTypes.NEW_GAME_HISTORY:
      return {
        ...state,
        history: addNewGameHistory(state.history, action.payload),
      };

    default:
      return state;
  }
};

export default gameHistoryReducer;
