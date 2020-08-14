import { createSelector } from 'reselect';

const selectChat = (state) => state.chat;

export const selectChatMessages = createSelector(
  [selectChat],
  (chat) => chat.messages
);
