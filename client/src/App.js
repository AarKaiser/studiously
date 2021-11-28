import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import DailyReview from './pages/DailyReview';
import Timer from './pages/Timer';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import AuthContext from './store';

import Navbar from './components/Navbar';

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.loggedIn();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <div className="layout">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/goals" component={Goals} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dailyreview" component={DailyReview} />
            <Route exact path="/timer" component={Timer} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
