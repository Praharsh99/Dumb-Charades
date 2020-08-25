import MemoryActionTypes from './memory.types';

export const setNewMemoryWord = (word) => ({
  type: MemoryActionTypes.NEW_MEMORY_WORD,
  payload: word,
});

export const setMemoryAsInput = (word) => ({
  type: MemoryActionTypes.SET_MEMORY_AS_INPUT,
  payload: word,
});
