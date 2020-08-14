import MemoryActionTypes from './memory.types';

const INITIAL_STATE = {
  words: [],
};

const memoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MemoryActionTypes.NEW_MEMORY_WORD:
      return {
        ...state,
        words: [...state.words, action.payload],
      };

    default:
      return state;
  }
};

export default memoryReducer;
