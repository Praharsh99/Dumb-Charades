import React from 'react';

import ChatSection from './../chat-section/chat-section.component.jsx';

import './app-right.styles.css';

function AppRight({ socket }) {
  return (
    <div className="app__right">
      <ChatSection socket={socket} />
    </div>
  );
}

export default AppRight;
