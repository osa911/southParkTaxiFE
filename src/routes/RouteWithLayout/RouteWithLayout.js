import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import { UserInfoContext } from "../index";
import { ADMIN_ROLE, INVESTOR_ROLE } from "../../constants";

const RouteWithLayout = (props) => {
  const { role: userRole } = useContext(UserInfoContext)
  const { layout: Layout, component: Component, notPrivate = false, isAdmin, ...rest } = props
  const routeRole = isAdmin ? ADMIN_ROLE : INVESTOR_ROLE

  if (routeRole === ADMIN_ROLE && ADMIN_ROLE !== userRole) {
    return (
      <Route {...rest}>
        <Redirect to="/" />
      </Route>
    )
  }

  const RouteComponent = notPrivate ? Route : PrivateRoute

  return (
    <RouteComponent {...rest}>
      <Layout>
        <Component />
      </Layout>
    </RouteComponent>
  )
}

export default RouteWithLayout
