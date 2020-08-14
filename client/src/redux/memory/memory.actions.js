import MemoryActionTypes from './memory.types';

export const setNewMemoryWord = (word) => ({
  type: MemoryActionTypes.NEW_MEMORY_WORD,
  payload: word,
});
