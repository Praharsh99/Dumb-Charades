import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

import io from 'socket.io-client';

import AppCenter from './components/app-center/app-center.component.jsx';
import AppRight from './components/app-right/app-right.component.jsx';
import PointsTable from './components/points-table/points-table.component.jsx';
import MemoryBox from './components/memory-box/memory-box.component.jsx';

import './App.css';

// Socket initialization
const socket = io.connect('http://localhost:8000');

function App() {
  useEffect(() => {
    socket.emit('new-connection');
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <PointsTable />
        <MemoryBox />
      </div>

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
