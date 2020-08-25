const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const dotenv = require('dotenv');

const {
  game,
  addNewUser,
  addNewMessage,
  getUserIds,
  getUserByID,
  validateWord,
  setGuessWord,
  disconnectUser,
  setGameStarted,
  acknowledgeUser,
  getSocketIdBasedOnTeam,
  checkAcknowledgementHandshake,
} = require('./game-data');

// Configuring env variables
dotenv.config({ path: './config.env' });

// Global Variables
const PORT = process.env.PORT || 8000;

// Middlewares
// Setting up the static files for REACT
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Socket.io
io.on('connection', (socket) => {
  // On new connection
  socket.on('new-connection', () => {
    const USER_OBJ = addNewUser(socket.id);
    console.log('New Connection: ', USER_OBJ);
  });

  // On new chat messages
  socket.on('new-chat-message', (messageObj) => {
    const newMessageObj = addNewMessage(messageObj, socket.id);

    socket.broadcast.emit('new-chat-message', newMessageObj);
  });

  // This event is fired by client when he hits the "start game" button
  socket.on('team-acknowledged', () => {
    // first acknowledging the team that they are ready
    // Send alert to other team that other team is ready
    // But if both are ready start the game
    acknowledgeUser(socket.id);
    console.log('Ack: ', socket.id);
    // below function returns "some value" when both teams are ready to play
    // or "undefined" when they one of them are not ready
    if (checkAcknowledgementHandshake()) {
      socket.broadcast.emit('notification-other-team-acknowledged');
    } else {
      // this gets executed when both teams are ready
      console.log('Both teams are ready!');
      setGameStarted();
      // This event will call all the users, which will then setup the buttons and timer in the UI for the user
      const allIds = getUserIds();

      allIds.forEach((id) => {
        io.to(id).emit('setup-game', getUserByID(id), [0, 0], null);
      });

      // Then alert the TEAM A to enable the input bar an ask them to send the first word
      io.to(getSocketIdBasedOnTeam('teamA')).emit('your-turn');
    }

    // Event fired when the client first sends the guess word when it is his turn
    socket.on('guess-word-submit', (guessWord) => {
      validateWord(guessWord)
        ? socket.emit('guess-word-response', {
            status: false,
            message: 'Word already used! 😮😮',
          })
        : (socket.emit('guess-word-response', {
            status: true,
            message: 'Are you sure that you want to send this word?',
            word: guessWord,
          }),
          setGuessWord(guessWord));

      // Event fired by the client when he approves the guess word
      socket.on('confirm-guess-word', () => {
        socket.broadcast.emit('received-guess-word', guessWord);
      });
    });

    // Event fired when PLAY/PAUSE buttons are clicked by the user
    socket.on('actions-btn-click', (btnId) => {
      game({ type: btnId }, io, socket.id);
    });
  });

  socket.on('disconnect', () => {
    disconnectUser();
    socket.broadcast.emit('team-disconnect');
  });
});

// Server initialization
http.listen(PORT, () => {
  console.log('Server initialized at port: ' + PORT);
});
