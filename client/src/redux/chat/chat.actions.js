import ChatActionTypes from './chat.types';

export const setNewChatMessage = (messageObj) => {
  return {
    type: ChatActionTypes.NEW_CHAT_MESSAGE,
    payload: messageObj,
  };
};
