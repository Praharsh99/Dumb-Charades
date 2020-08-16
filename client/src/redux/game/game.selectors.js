import { createSelector } from 'reselect';

const selectGame = (state) => state.game;

export const selectCurrentGame = createSelector(
  [selectGame],
  (game) => game.currentGame
);

export const selectMyTurn = createSelector([selectGame], (game) => game.myTurn);

export const selectBoardMessage = createSelector(
  [selectGame],
  (game) => game.boardMessage
);

export const selectPoints = createSelector([selectGame], (game) => game.points);
