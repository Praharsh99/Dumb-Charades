import React from "react";

import "./points-table.styles.css";

function PointsTable() {
  return (
    <div className="pointsTable">
      <div className="pointsTable__content">
        <header className="pointsTable__header">
          <div>Team A</div>
          <div>Team B</div>
        </header>

        <div className="pointsTable__body">
          <div className="pointsTable__side">
            <div>Side 1</div>
          </div>
          <div className="pointsTable__side">Side 2</div>
        </div>
      </div>
    </div>
  );
}

export default PointsTable;
