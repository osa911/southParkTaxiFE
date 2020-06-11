import React, { useEffect } from "react";
import { Redirect, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Spin } from "antd";

import { GET_USER_INFO } from "../gql";
import Home from "../containers/Home";
import SignIn from "../containers/SignIn/SignIn";
import Page404 from "../containers/Page404";
import Minimal from "../layouts/Minimal";
import Standard from "../layouts/Standard";
import StandardMini from "../layouts/StandardMini";
import RouteWithLayout from "./RouteWithLayout";
import Tracker from "../containers/Tracker";
import UploadFile from "../containers/UploadFile";
import AdminPanelCreatePage from "../pages/AdminPanelCreatePage";
import UsersList from "../containers/UsersList";
import CarsList from "../containers/CarsList";
import ReportsList from "../containers/ReportsList";

export const UserInfoContext = React.createContext()

export default function Routes() {
  const { data: userInfoData = {}, loading } = useQuery(GET_USER_INFO)
  const savedUserInfo = localStorage.getItem('userInfo')
  const { me: userInfo = JSON.parse(savedUserInfo || '{}') } = userInfoData

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, [userInfo])

  return (
    <Spin spinning={loading}>
      <UserInfoContext.Provider value={userInfo}>
        <Switch>
          <RouteWithLayout exact layout={Standard} component={Home} path="/" />
          <RouteWithLayout exact layout={StandardMini} component={Tracker} path="/tracker" />
          <RouteWithLayout
            exact
            layout={Standard}
            component={AdminPanelCreatePage}
            isAdmin
            path="/create"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={UsersList}
            isAdmin
            path="/user-list"
          />
          <RouteWithLayout exact layout={Standard} component={CarsList} isAdmin path="/car-list" />
          <RouteWithLayout
            exact
            layout={Standard}
            component={ReportsList}
            isAdmin
            path="/reports-list"
          />
          <RouteWithLayout exact layout={Standard} component={UploadFile} isAdmin path="/upload" />
          <RouteWithLayout exact layout={Minimal} component={SignIn} path="/signIn" notPrivate />
          <RouteWithLayout
            exact
            layout={Minimal}
            component={Page404}
            path="/page-not-found"
            notPrivate
          />
          <Redirect to="/page-not-found" />
        </Switch>
      </UserInfoContext.Provider>
    </Spin>
  )
}
