import React from 'react';

import BlurredBox from '../blurred-box/blurred-box.component.jsx';
import InputBar from '../input-bar/input-bar.component.jsx';

import './chat-section.styles.css';

function ChatSection() {
  return (
    <div className="chatSection">
      <BlurredBox width="100%" height="80%">
        <div className="chatSection__messagesSection">
          <div className="chatSection__messagesContainer">
            <div className="chatSection__message chatSection__message-mine">
              <span>Praharsh</span>
            </div>
          </div>
        </div>
      </BlurredBox>

      <InputBar
        type="text"
        width="100%"
        height="12%"
        placeholder="Enter your message here..."
        maxLength="126"
        fontSize="20px"
        paddingTop="40px"
      />
    </div>
  );
}

export default ChatSection;
