import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

import io from 'socket.io-client';

import AppLeft from './components/app-left/app-left.component.jsx';
import AppCenter from './components/app-center/app-center.component.jsx';
import AppRight from './components/app-right/app-right.component.jsx';

import './App.css';

// Socket initialization
const socket = io.connect('http://localhost:8000');

function App() {
  useEffect(() => {
    socket.emit('new-connection');

    socket.on('team-disconnect', () => {
      window.location.reload();
    });
  }, []);

  return (
    <div className="app">
      <AppLeft />

      <AppCenter socket={socket} />

      <AppRight socket={socket} />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   console.log('In main App, ', state);
//   return {};
// };

// export default connect(mapStateToProps)(App);
export default App;
