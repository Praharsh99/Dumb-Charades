import React from "react";

import "./chat-section.styles.css";

function ChatSection() {
  return (
    <div className="chatSection">
      <div className="chatSection__messagesContainer">
        <div className="chatSection__messages-fix">
          <div className="chatSection__messages">
            <div className="chatSection__message chatSection__message-mine">
              <span>Hello</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>Hii</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Where are you?</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>I'm at the bottom of the lake</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Hello</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>Hii</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Where are you?</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>I'm at the bottom of the lake</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Hello</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>Hii</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Where are you?</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>I'm at the bottom of the lake</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Hello</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>Hii</span>
            </div>
            <div className="chatSection__message chatSection__message-mine">
              <span>Where are you?</span>
            </div>
            <div className="chatSection__message chatSection__message-other">
              <span>I'm at the bottom of the lake</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chatSection__input">
        <input
          type="text"
          placeholder="Enter your message here..."
          maxLength="126"
        />
      </div>
    </div>
  );
}

export default ChatSection;
