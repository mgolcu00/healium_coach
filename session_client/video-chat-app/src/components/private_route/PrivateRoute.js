// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../data/api';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getToken()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default PrivateRoute;
