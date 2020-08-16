import { combineReducers } from 'redux';

import gameReducer from './game/game.reducer';
import chatReducer from './chat/chat.reducer';
import memoryReducer from './memory/memory.reducer';

export default combineReducers({
  game: gameReducer,
  chat: chatReducer,
  memory: memoryReducer,
});
