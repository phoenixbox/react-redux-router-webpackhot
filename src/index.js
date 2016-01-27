import React from 'react';
import App from './App';
import Home from './Home';
import About from './About';

import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import history from './history'

render(
  <Router history={history}>
    <Route path="/" component={App}>
      <Route name="about" component={About} />
      <IndexRoute name="home" component={Home} />
    </Route>
  </Router>,
  document.getElementById('root')
);
