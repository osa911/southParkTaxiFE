import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const accessToken = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signIn',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
