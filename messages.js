const messages = [];

exports.addNewMessage = (msgObj, id) => {
  const newObj = {
    ...msgObj,
    id,
  };

  messages.push(newObj);

  newObj.whos = 'other';

  return newObj;
};
