export const addNewMessage = (messages, payload) => {
  const newMessages = [
    ...messages,
    {
      time: payload.time,
      user: 'Praharsh',
      message: payload.message,
      whos: payload.whos,
    },
  ];

  return newMessages;
};
