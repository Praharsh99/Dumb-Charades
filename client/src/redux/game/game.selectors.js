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

export const selectIsPlaying = createSelector(
  [selectGame],
  (game) => game.isPlaying
);

export const selectPoints = createSelector([selectGame], (game) => game.points);

export const selectTimer = createSelector([selectGame], (game) => game.timer);

export const selectActionBtnDisabled = createSelector(
  [selectGame],
  (game) => game.actionsButtonsDisabled
);

export const selectIsBlurred = createSelector(
  [selectGame],
  (game) => game.isBlurred
);
