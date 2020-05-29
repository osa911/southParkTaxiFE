import React from 'react'
import { Redirect, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import SignIn from '../containers/SignIn/SignIn'
import Page404 from '../containers/Page404'
// import SignOut from '../modules/Auth/containers/SignOut'
// import Clients from '../modules/Admin/containers/Clients'
import Main from '../layouts/Main'
import Mini from '../layouts/Minimal'
import RouteWithLayout from './RouteWithLayout'

export default function Routes() {
  return (
    <Switch>
      <RouteWithLayout exact layout={Main} component={Home} path="/"/>
      {/*<RouteWithLayout exact layout={Main} component={Clients} path="/clients" />*/}
      <RouteWithLayout exact layout={Mini} component={SignIn} path="/signIn" notPrivate/>
      {/*<RouteWithLayout exact layout={Mini} component={SignOut} path="/signOut" notPrivate />*/}
      <RouteWithLayout exact layout={Mini} component={Page404} path="/page-not-found" notPrivate/>
      <Redirect to="/page-not-found"/>
    </Switch>
  )
}
