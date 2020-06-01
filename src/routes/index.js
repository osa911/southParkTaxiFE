import React from 'react'
import { Redirect, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import SignIn from '../containers/SignIn/SignIn'
import Page404 from '../containers/Page404'
import Minimal from '../layouts/Minimal'
import Standard from '../layouts/Standard'
import StandardMini from '../layouts/StandardMini'
import RouteWithLayout from './RouteWithLayout'
import Tracker from '../containers/Tracker'
import AddNewUser from '../containers/AddNewUser'
import UsersList from '../containers/UsersList'

export default function Routes() {
  return (
    <Switch>
      <RouteWithLayout exact layout={Standard} component={Home} path="/" />
      <RouteWithLayout exact layout={StandardMini} component={Tracker} path="/tracker" />
      <RouteWithLayout exact layout={Standard} component={AddNewUser} path="/add-new-user" />
      <RouteWithLayout exact layout={Standard} component={UsersList} path="/users-list" />
      <RouteWithLayout exact layout={Minimal} component={SignIn} path="/signIn" notPrivate />
      <RouteWithLayout exact layout={Minimal} component={Page404} path="/page-not-found" notPrivate />
      <Redirect to="/page-not-found" />
    </Switch>
  )
}
