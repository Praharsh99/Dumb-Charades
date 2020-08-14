import React from 'react';

import './input-bar.styles.css';

function InputBar({
  width,
  height,
  maxLength,
  placeholder,
  fontSize,
  paddingTop,
  value,
  handleChange,
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
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          style={styleInput}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default InputBar;
