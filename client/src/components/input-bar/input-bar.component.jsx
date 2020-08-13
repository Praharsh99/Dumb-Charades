import React from 'react';

import './input-bar.styles.css';

function InputBar({
  width,
  height,
  maxLength,
  placeholder,
  fontSize,
  paddingTop,
}) {
  const styleDiv = {
    width,
    height,
  };

  const styleInput = {
    fontSize,
    paddingTop,
  };

  return (
    <div className="inputBar" style={styleDiv}>
      <div className="inputBar__section">
        <input
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
          style={styleInput}
        />
      </div>
    </div>
  );
}

export default InputBar;
