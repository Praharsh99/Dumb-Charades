import { createSelector } from 'reselect';

const selectGameHistory = (state) => state.gameHistory;

export const selectHistory = createSelector(
  [selectGameHistory],
  (gameHistory) => gameHistory.history
);
