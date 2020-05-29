import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { createSelector } from 'reselect'
// import { useShallowEqualSelector } from 'hooks/useShallowEqualSelector'

// const signInInfo = createSelector(
//   state => state.auth,
//   ({ accessToken }) => accessToken
// )

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
