import React from 'react';

import DisplaySection from './../display-section/display-section.component.jsx';
import InputBar from './../input-bar/input-bar.component.jsx';

import './app-center.styles.css';

function AppCenter({ socket }) {
  return (
    <div className="app__center">
      <DisplaySection />
      <InputBar
        width="100%"
        height="20%"
        placeholder="Enter word here..."
        maxLength="64"
        fontSize="55px"
        paddingTop="50px"
      />
    </div>
  );
}

export default AppCenter;
