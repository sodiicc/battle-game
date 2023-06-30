import React from "react";
import { Navbar } from "./components/Navbar";
import GameRegistration from "./components/GameRegistration";
import { Provider } from 'react-redux';
import store from './store';
import GameField from "./components/GameField";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Provider store={store} >
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<GameRegistration />} />
          <Route path="/game" exact element={<GameField />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
