import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./conponents/Navbar";
import { ExercisesList } from "./conponents/ExercisesList";
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
        <Route path="/" exact component={ExercisesList} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
