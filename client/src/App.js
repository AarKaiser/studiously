import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import DailyReview from './pages/DailyReview';
import Timer from './pages/Timer';

import Navbar from './components/Navbar';

import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css'

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
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/goals' component={Goals} />
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dailyreview' component={DailyReview} />
          <Route exact path='/timer' component={Timer} />
          


          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
       
      </>
    </Router>
    </ApolloProvider>
       
  );
}

export default App;


