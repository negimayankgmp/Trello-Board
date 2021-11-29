import React from "react";
import Board from "./components/Board";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Trello Board</h1>
      <hr />
      <Board />
    </div>
  );
}

export default App;
