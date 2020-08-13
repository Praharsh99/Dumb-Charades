import React from 'react';

import BlurredBox from '../blurred-box/blurred-box.component.jsx';

import './points-table.styles.css';

function PointsTable() {
  return (
    <BlurredBox width="100%" height="50%">
      <div className="pointsTable__content">
        <header className="pointsTable__header">
          <div>Team A</div>
          <div>Team B</div>
        </header>

        <div className="pointsTable__body">
          <div className="pointsTable__side">
            <div>Side 1</div>
          </div>
          <div className="pointsTable__side">
            <div>Side 1</div>
          </div>
        </div>
      </div>
    </BlurredBox>
  );
}

export default PointsTable;
