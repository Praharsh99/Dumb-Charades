import React from 'react';

import './blurred-box.styles.css';

function BlurredBox({ children, width, height }) {
  const style = {
    width,
    height,
  };

  return (
    <div className="blurredBox" style={style}>
      {children}
    </div>
  );
}

export default BlurredBox;
