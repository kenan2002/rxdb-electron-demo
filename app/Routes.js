/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import TodoPage from './containers/TodoPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TODO} component={TodoPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
