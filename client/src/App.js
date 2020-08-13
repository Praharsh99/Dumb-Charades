import React from "react";

import PointsTable from "./components/points-table/points-table.component.jsx";
import MemoryBox from "./components/memory-box/memory-box.component.jsx";
import DisplaySection from "./components/display-section/display-section.component.jsx";
import InputBar from "./components/input-bar/input-bar.component.jsx";
import ChatSection from "./components/chat-section/chat-section.component.jsx";

import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__left">
        <PointsTable />
        <MemoryBox />
      </div>

      <div className="app__center">
        <DisplaySection />
        <InputBar />
      </div>

      <div className="app__right">
        <ChatSection />
      </div>
    </div>
  );
}

export default App;
