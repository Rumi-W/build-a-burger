import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userId, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        userId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              origPath: props.location.pathname
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
