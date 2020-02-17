import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./conponents/Navbar";
import Game from "./conponents/Game";
import { Provider } from 'react-redux';
import store from './store';

// export const port = process.env.PORT_FRONT || 3000;

function App() {
  return (
    <Provider store={store} >
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Game} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
