import { createSelector } from 'reselect';

const selectMemory = (state) => state.memory;

export const selectMemoryWords = createSelector(
  [selectMemory],
  (memory) => memory.words
);
