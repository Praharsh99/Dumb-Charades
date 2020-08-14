import ChatActionTypes from './chat.types';
import { addNewMessage } from './chat.utils';

const INITIAL_STATE = {
  messages: [],
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.NEW_CHAT_MESSAGE:
      return {
        ...state,
        messages: addNewMessage(state.messages, action.payload),
      };

    default:
      return state;
  }
};

export default chatReducer;
