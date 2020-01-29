import React from 'react';

import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import DefaultStore from './store';
import './antd-theme.less';
import LoginContainer from './containers/login';
import { LeftMenu } from './containers/menu';
import routes from './config/route';

function PrivateRoute({ children, path }) {
  return (
    <Route
      path={path}
      render={({ location }) => (DefaultStore.getState().auth.token === null ? <Redirect to={{ pathname: '/login', from: location }} /> : children)}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string.isRequired,
};


function App() {
  return (
    <Provider store={DefaultStore}>
      <BrowserRouter>
        <div className="App">
          <Route path="/login">
            <LoginContainer />
          </Route>
          <PrivateRoute path="/admin">
            <div className="aside">
              <LeftMenu />
            </div>
            <div className="main">
              <Switch>
                {routes.map(({ path, render, key }) => <Route key={key} path={path} render={render} />)}
              </Switch>
            </div>
          </PrivateRoute>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
