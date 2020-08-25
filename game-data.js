const messages = [];

let GameData = {
  userCount: 0,
  teamTurn: 'teamA',
  currentGuessWord: undefined,
  hasGameStarted: false,
  isPlaying: false,
};

const gameHistory = [
  {
    word: 'hello',
    givenBy: 'teamA',
    wonBy: 'teamA',
    points: '1',
    timeTaken: '00 : 10',
  },
  {
    word: 'world',
    givenBy: 'teamB',
    wonBy: 'teamA',
    points: '1',
    timeTaken: '00 : 56',
  },
];

let teamData = {};

const actionButtonsHandshake = {
  approve: 0,
  reject: 0,
  cancel: 0,
};

let clearId = undefined,
  time,
  seconds = 0,
  minutes = 0;

exports.addNewUser = (id) => {
  const { userCount } = GameData;

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

    GameData.userCount = userCount + 1;

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

const getUserIds = () => {
  const ids = Object.keys(teamData).map((key) => key);

  return ids;
};

exports.getUserIds = getUserIds;

exports.getUserByID = (id) => ({
  ...teamData[id],
});

const getPointsArray = () => {
  return Object.keys(teamData).map((key) => teamData[key].points);
};

exports.acknowledgeUser = (id) => {
  teamData[id].acknowledged = !teamData[id].acknowledged;
};

exports.checkAcknowledgementHandshake = () => {
  return Object.keys(teamData).find(
    (key) => teamData[key].acknowledged === false
  );
};

const getSocketIdBasedOnTeam = (teamName) => {
  return Object.keys(teamData).find((key) => teamData[key].team === teamName);
};

exports.getSocketIdBasedOnTeam = getSocketIdBasedOnTeam;

exports.validateWord = (word) => {
  word = word.trim().toLowerCase();
  console.log('Trimmed word: ', word);
  return gameHistory.find((game) => game.word.trim().toLowerCase() === word);
};

exports.setGameStarted = () =>
  (GameData.hasGameStarted = !GameData.hasGameStarted);

exports.setGuessWord = (guessWord) => (GameData.currentGuessWord = guessWord);

// Resets all the game variables
const resetGame = () => {
  GameData = {
    teamTurn: GameData.teamTurn === 'teamA' ? 'teamB' : 'teamA',
    currentGuessWord: undefined,
    hasGameStarted: true,
    isPlaying: false,
  };

  timeUp = {
    team: null,
  };

  (minutes = 0), (seconds = 0);

  isRevealed = false;
};

// Complete game function
const completeGame = (type) => {
  let wonBy;

  if (type === 'cancel') wonBy = 'none';
  else if (type === 'reject') wonBy = GameData.teamTurn;
  else {
    wonBy = GameData.teamTurn === 'teamA' ? 'teamB' : 'teamA';
  }

  const timeTaken = !timeUp.team ? `${minutes} : ${seconds}` : '01 : 30';

  const recordGame = {
    word: GameData.currentGuessWord,
    givenBy: GameData.teamTurn,
    status: type,
    wonBy,
    points: type === 'approve' || type === 'reject' ? 1 : 0,
    timeTaken,
  };

  gameHistory.push(recordGame);

  let id = Object.keys(teamData).find((key) => teamData[key].team === wonBy);
  if (id) teamData[id].points += 1;

  resetGame();
  resetButtonResponses();

  return recordGame;
};

// isPlaying -> for pausing/playing the timer
// hasGameStarted -> did the acknowledgment handshake happen
// currentGuessWord -> word submitted by the team

// this object tracks the No. of button click requests by the teams
// this is used for accepting 1 req from each team
let buttonsPressedReq = {
  teamA: 0,
  teamB: 0,
  total: 0,
};

const resetButtonResponses = () => {
  Object.keys(buttonsPressedReq).forEach((key) => {
    if (!(timeUp.team && key === 'total')) {
      buttonsPressedReq[key] = 0;
    } else {
      buttonsPressedReq[timeUp.team] = 1;
      buttonsPressedReq.total = 1;
    }
  });

  Object.keys(actionButtonsHandshake).forEach((key) => {
    if (key === 'reject' && timeUp.team) actionButtonsHandshake[key] = 1;
    else actionButtonsHandshake[key] = 0;
  });
};

const addThisButtonHandshake = (type) => {
  actionButtonsHandshake[type] += 1;

  stopTimer();
  // checking if we got one response for each team
  if (buttonsPressedReq.total >= 2) {
    // checking if both teams gave clicked the same button
    if (actionButtonsHandshake[type] === 2) {
      GameData.hasGameStarted = false;

      return {
        status: true,
        message: `This game was ${type}ed by you and the other team`,
      };
    } else {
      resetButtonResponses();

      return {
        status: false,
        message: `You and the other team has choosen different options. Please try again! 🙈`,
      };
    }
  } else {
    return false;
  }
};

exports.resumeTimer = () => {
  stopTimer();
};

const stopTimer = () => {
  clearInterval(clearId);
};

let isRevealed = false;
let timeUp = {
  team: null,
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

exports.game = async (btnObj, io, id) => {
  const { hasGameStarted, currentGuessWord } = GameData;
  const { type } = btnObj;

  if (hasGameStarted && currentGuessWord) {
    switch (type) {
      case 'play':
      case 'pause':
        // Allowing only when the button is pressed by the acting team
        if (!(teamData[id].team === GameData.teamTurn) && !timeUp.team) {
          GameData.isPlaying = !GameData.isPlaying;

          GameData.hasTimerStarted = GameData.hasGameStarted ? null : true;

          GameData.isPlaying
            ? (clearId = setInterval(() => {
                if (seconds < 59) {
                  seconds++;
                } else {
                  minutes++;
                  seconds = 0;
                }

                if (!(minutes === 1 && seconds === 31)) {
                  seconds = seconds < 10 ? `0${seconds}` : seconds;
                  time = `0${minutes} : ${seconds}`;

                  io.emit('timer-ticking', time);
                } else {
                  stopTimer();

                  timeUp = {
                    team: teamData[id].team,
                  };

                  buttonsPressedReq[teamData[id].team] = 1;
                  buttonsPressedReq.total += 1;

                  actionButtonsHandshake.reject += 1;
                }
              }, 1000))
            : stopTimer();

          isRevealed
            ? null
            : (io.to(id).emit('reveal-guess-word'), (isRevealed = true));
        }
        break;

      case 'approve':
      case 'reject':
      case 'cancel':
        if (
          buttonsPressedReq[teamData[id].team] === 0 &&
          buttonsPressedReq.total < 2
        ) {
          buttonsPressedReq[teamData[id].team] += 1;
          buttonsPressedReq.total += 1;

          let resObj = addThisButtonHandshake(type);

          teamData[id].team === GameData.teamTurn ? stopTimer() : null;

          resObj ? io.emit('game-complete-response', resObj) : null;

          if (resObj.status) {
            completeGame(type);
            await sleep(3000);

            const allIds = getUserIds();
            const points = getPointsArray();

            allIds.forEach((id) => {
              io.to(id).emit(
                'setup-game',
                teamData[id],
                points,
                gameHistory[gameHistory.length - 1]
              );
            });

            io.to(getSocketIdBasedOnTeam(GameData.teamTurn)).emit('your-turn');
          }
        } else {
          io.to(id).emit('response-already-recorded');
        }
        break;

      default:
        break;
    }
  }
};

exports.disconnectUser = () => {
  if (GameData.userCount >= 2) {
    teamData = {};

    resetGame();
    resetButtonResponses();

    GameData.userCount = 0;
    GameData.hasGameStarted = false;
    // console.log('Teams: ', teamData, GameData);
  }
};
