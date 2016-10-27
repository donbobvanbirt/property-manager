import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout';
import Properties from './components/Properties';
import Clients from './components/Clients';

render(
  <Router history = {browserHistory}>
    <Route path = '/' component={Layout} >
      <Route path = '/properties' component={Properties} />
      <Route path = '/clients' component={Clients} />
    </Route>
  </Router>,
  document.getElementById('root')
);
