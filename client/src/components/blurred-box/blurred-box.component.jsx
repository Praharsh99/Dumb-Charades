import React from 'react';

import './blurred-box.styles.css';

function BlurredBox({ children, ...otherProps }) {
  const style = {
    ...otherProps,
  };

  return (
    <div className="blurredBox" style={style}>
      {children}
    </div>
  );
}

export default BlurredBox;
