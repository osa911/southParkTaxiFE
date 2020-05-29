import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, notPrivate = false, ...rest } = props
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
