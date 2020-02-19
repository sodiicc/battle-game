import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import GameRegistration from "./components/GameRegistration";
import { Provider } from 'react-redux';
import store from './store';
import GameField from "./components/GameField";

// export const port = process.env.PORT_FRONT || 3000;

function App() {
  return (
    <Provider store={store} >
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={GameRegistration} />
        <Route path="/game" exact component={GameField} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
