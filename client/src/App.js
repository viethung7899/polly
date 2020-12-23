import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Home from './routes/Home';
import Vote from './routes/Vote';
import NewPoll from './routes/NewPoll';
import Result from './routes/Result';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/new">
            <NewPoll />
          </Route>
          <Route path="/vote">
            <Vote />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
