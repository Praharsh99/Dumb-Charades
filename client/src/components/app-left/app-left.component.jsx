import React from 'react';

import PointsTable from './../points-table/points-table.component.jsx';
import GameHistory from './../game-history/game-history.component.jsx';
import MemoryBox from './../memory-box/memory-box.component.jsx';

import './app-left.styles.css';

function AppLeft() {
  return (
    <div className="app__left">
      <PointsTable />
      <GameHistory />
      <MemoryBox />
    </div>
  );
}

export default AppLeft;
