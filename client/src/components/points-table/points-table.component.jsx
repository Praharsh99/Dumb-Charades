import React from 'react';
import { connect } from 'react-redux';

import BlurredBox from '../blurred-box/blurred-box.component.jsx';

import { selectPoints } from './../../redux/game/game.selectors';

import './points-table.styles.css';

function PointsTable({ points }) {
  return (
    <BlurredBox width="100%" height="20%">
      <div className="pointsTable__content">
        <header className="pointsTable__header">
          <div>Team A</div>
          <div>Team B</div>
        </header>

        <div className="pointsTable__body">
          {points.map((point, idx) => (
            <div className="pointsTable__side" key={idx}>
              <div>{point}</div>
            </div>
          ))}
        </div>
      </div>
    </BlurredBox>
  );
}

const mapStateToProps = (state) => ({
  points: selectPoints(state),
});

export default connect(mapStateToProps)(PointsTable);
