const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const dotenv = require('dotenv');

const {
  addNewUser,
  addNewMessage,
  getUserIds,
  getUserByID,
  validateWord,
  acknowledgeUser,
  getSocketIdBasedOnTeam,
  checkAcknowledgementHandshake,
} = require('./game-data');

// Configuring env variables
dotenv.config({ path: './config.env' });

// Global Variables
const PORT = process.env.PORT || 8000;
let GUESS_WORD;

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

    // below function returns "some value" when both teams are ready to play
    // or "undefined" when they one of them are not ready
    if (checkAcknowledgementHandshake()) {
      socket.broadcast.emit('notification-other-team-acknowledged');
    } else {
      // this gets executed when both teams are ready
      console.log('Both teams are ready!');
      // This event will call all the users, which will then setup the buttons and timer in the UI for the user
      const allIds = getUserIds();

      allIds.forEach((id) => {
        io.to(id).emit('setup-game', getUserByID(id), [0, 0]);
      });

      // Then alert the TEAM A to enable the input bar an ask them to send the first word
      io.to(getSocketIdBasedOnTeam('teamA')).emit('your-turn');
    }

    socket.on('guess-word-submit', (guessWord) => {
      validateWord(guessWord)
        ? socket.emit('guess-word-response', {
            status: false,
            message: 'Word already used! 😮😮',
          })
        : (socket.emit('guess-word-response', {
            status: true,
            message: 'Are you sure that you want to send this word?',
          }),
          (GUESS_WORD = guessWord));
    });

    socket.on('confirm-guess-word', () => {
      socket.broadcast.emit('received-guess-word', GUESS_WORD);
    });
  });
});

// Server initialization
http.listen(PORT, () => {
  console.log('Server initialized at port: ' + PORT);
});
