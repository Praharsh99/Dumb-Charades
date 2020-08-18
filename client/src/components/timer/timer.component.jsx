import React, { useState, useEffect } from 'react';

import './timer.styles.css';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [placeholder, setP] = useState(1);

  const handleTimer = () => {};

  useEffect(() => {
    handleTimer();
  }, []);

  return (
    <div className="timer">
      <span>{`${minutes}:${seconds}`}</span>
    </div>
  );
}

export default Timer;
