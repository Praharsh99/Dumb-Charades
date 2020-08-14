import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';
import memoryReducer from './memory/memory.reducer';

export default combineReducers({
  user: userReducer,
  chat: chatReducer,
  memory: memoryReducer,
});
