const messages = [];

// const gameHistory = [
//   {
//     word: String(lowercase, trimmed, whitespaceremoved),
//     givenBy: TeamName,
//     wonBy: teamName,
//     points: Number(0 / 1),
//     timeTaken: Date,
//   },
// ];

let userCount = 0,
  teamTurn = 'teamA',
  currentWord;
const gameHistory = [
  {
    word: 'hello',
    givenBy: 'teamA',
    wonBy: 'teamA',
    points: '1',
    timeTaken: '1000',
  },
  {
    word: 'world',
    givenBy: 'teamB',
    wonBy: 'teamA',
    points: '1',
    timeTaken: '1000',
  },
];
const teamData = {};

exports.addNewUser = (id) => {
  if (userCount < 2) {
    !userCount
      ? (teamData[id] = {
          team: 'teamA',
          joinedAt: Date.now(),
          points: 0,
          acknowledged: false,
        })
      : (teamData[id] = {
          team: 'teamB',
          joinedAt: Date.now(),
          points: 0,
          acknowledged: false,
        });

    userCount++;

    return teamData[id];
  } else {
    return null;
  }
};

exports.addNewMessage = (msgObj, id) => {
  const newObj = {
    ...msgObj,
    id,
  };

  messages.push(newObj);

  newObj.whos = 'other';

  return newObj;
};

exports.getUserIds = () => {
  const ids = [];

  Object.keys(teamData).forEach((key) => {
    ids.push(key);
  });

  return ids;
};

exports.getUserByID = (id) => ({
  ...teamData[id],
});

// exports.getPointsArray = () => {
//   return Object.keys(teamData).map((key) => key.points);
// };

exports.acknowledgeUser = (id) => {
  teamData[id].acknowledged = !teamData[id].acknowledged;
};

exports.checkAcknowledgementHandshake = () => {
  return Object.keys(teamData).find(
    (key) => teamData[key].acknowledged === false
  );
};

exports.getSocketIdBasedOnTeam = (teamName) => {
  return Object.keys(teamData).find((key) => teamData[key].team === teamName);
};

exports.validateWord = (word) => {
  currentWord = word;

  word = word.trim().toLowerCase();
  console.log('Trimmed word: ', word);
  return gameHistory.find((game) => game.word.trim().toLowerCase() === word);
};
