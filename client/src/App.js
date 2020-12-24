import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Home from './routes/Home';
import Vote from './routes/Vote';
import NewPoll from './routes/NewPoll';
import Poll from './routes/Poll';
import NotFound from './routes/NotFound';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path="/new" exact component={NewPoll} />
          <Route path="/vote/:id" exact component={Vote} />
          <Route path="/vote" exact component={Vote} />
          <Route path="/poll/:id" exact component={Poll} />
          <Route path="/" exact component={Home} />
          <Route path="/not-found" exact component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
