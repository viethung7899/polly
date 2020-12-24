import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import pages
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Vote from './routes/Vote';
import NewPoll from './routes/NewPoll';
import Poll from './routes/Poll';
import NotFound from './routes/NotFound';
import Login from './routes/Login';

// Import context
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/new" exact component={NewPoll} />
          <ProtectedRoute path="/vote/:id" exact component={Vote} />
          <ProtectedRoute path="/vote" exact component={Vote} />
          <ProtectedRoute path="/poll/:id" exact component={Poll} />
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/not-found" exact component={NotFound} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
