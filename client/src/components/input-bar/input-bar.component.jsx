import React, { useState } from "react";

import "./input-bar.styles.css";

function InputBar() {
  const [word, setWord] = useState("");

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value.trim().length > 0) {
      console.log("Hello");
    }
  };

  return (
    <div className="inputBar">
      <div className="inputBar__section">
        <input
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="Enter word here..."
          maxLength="64"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default InputBar;
