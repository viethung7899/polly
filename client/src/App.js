import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Home from './routes/Home';
import Vote from './routes/Vote';
import NewPoll from './routes/NewPoll';
import Poll from './routes/Poll';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/new" exact component={NewPoll} />
          <Route path="/vote/:id" exact component={Vote} />
          <Route path="/vote" exact component={Vote} />
          <Route path="/poll/:id" exact component={Poll} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
