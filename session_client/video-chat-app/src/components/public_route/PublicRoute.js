

// PublicRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../data/api';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      getToken() && restricted ?
        <Redirect to="/" />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;
