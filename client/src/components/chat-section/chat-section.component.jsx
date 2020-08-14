import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import UIfx from 'uifx';
import message_alert_sound from './../../assets/message_alert_sound.mp3';

import BlurredBox from '../blurred-box/blurred-box.component.jsx';
import InputBar from '../input-bar/input-bar.component.jsx';

import { setNewChatMessage } from './../../redux/chat/chat.actions';
import { selectChatMessages } from './../../redux/chat/chat.selectors';

import './chat-section.styles.css';

function ChatSection({ socket, setNewChatMessage, messages }) {
  const [chatMessage, setChatMessage] = useState('');
  const messageContainer = useRef(null);

  const beep = new UIfx(message_alert_sound);
  beep.setVolume(1.0);

  useEffect(() => {
    socket.on('new-chat-message', (newMessageObj) => {
      console.log('Received', newMessageObj);
      setNewChatMessage(newMessageObj);

      // Audio alert
      beep.play();
    });
  }, []);

  useEffect(() => {
    messageContainer.current.scrollTo(0, messageContainer.current.scrollHeight);
  });

  const handleChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (chatMessage.trim().length > 0) {
      const messageObj = {
        message: chatMessage,
        time: Date.now(),
        whos: 'mine',
      };

      socket.emit('new-chat-message', messageObj);

      setNewChatMessage(messageObj);
      setChatMessage('');

      e.target.focus();
    }
  };

  return (
    <div className="chatSection">
      <BlurredBox width="100%" height="80%">
        <div className="chatSection__messagesSection">
          <div
            className="chatSection__messagesContainer"
            ref={messageContainer}
          >
            {messages.length ? (
              messages.map((message) => (
                <div
                  className={`chatSection__message chatSection__message-${message.whos}`}
                  key={message.time}
                >
                  <span>{message.message}</span>
                </div>
              ))
            ) : (
              <span className="chatSection__emptyContainer">No messages!</span>
            )}
          </div>
        </div>
      </BlurredBox>

      <form onSubmit={handleSubmit}>
        <InputBar
          type="text"
          width="100%"
          height="100%"
          placeholder="Enter your message here..."
          maxLength="126"
          fontSize="20px"
          paddingTop="40px"
          value={chatMessage}
          handleChange={handleChange}
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: selectChatMessages(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewChatMessage: (messageObj) => dispatch(setNewChatMessage(messageObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSection);
