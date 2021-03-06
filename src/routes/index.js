import React, { useEffect } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Spin } from 'antd'

import { GET_USER_INFO } from '../gql'
import Home from '../containers/Home'
import SignIn from '../containers/SignIn/SignIn'
import Page404 from '../containers/Page404'
import Minimal from '../layouts/Minimal'
import Standard from '../layouts/Standard'
import StandardMini from '../layouts/StandardMini'
import RouteWithLayout from './RouteWithLayout'
import Tracker from '../containers/Tracker'
import UploadFile from '../containers/UploadFile'
import AdminPanelCreatePage from '../pages/AdminPanelCreatePage'
import UsersList from '../containers/UsersList'
import CarsList from '../containers/CarsList'
import ReportsList from '../containers/ReportsList'
import StandardClean from '../layouts/StandardClean'

export const UserInfoContext = React.createContext()

export default function Routes() {
  const savedUserInfo = localStorage.getItem('userInfo')
  const { data: userInfoData = {}, loading } = useQuery(GET_USER_INFO)
  const { me: userInfo = JSON.parse(savedUserInfo || '{}') } = userInfoData

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, [userInfo])

  return (
    <Spin spinning={loading}>
      <UserInfoContext.Provider value={{ ...userInfo }}>
        <Switch>
          <RouteWithLayout
            exact
            layout={StandardClean}
            component={Home}
            path="/"
            title="Главная страница | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={StandardMini}
            component={Tracker}
            path="/tracker"
            title="Трекер | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={AdminPanelCreatePage}
            isAdmin
            path="/create"
            title="Формы создания | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={UsersList}
            isAdmin
            path="/user-list"
            title="Список клиентов | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={CarsList}
            isAdmin
            path="/car-list"
            title="Список автомобилей | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={ReportsList}
            isAdmin
            path="/reports-list"
            title="Список отчетов | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Standard}
            component={UploadFile}
            isAdmin
            path="/upload"
            title="Загрузка файла отчета excel | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Minimal}
            component={SignIn}
            path="/signIn"
            notPrivate
            title="Вход | SouthPark"
          />
          <RouteWithLayout
            exact
            layout={Minimal}
            component={Page404}
            path="/page-not-found"
            title="Страница не найдена | SouthPark"
            notPrivate
          />
          <Redirect to="/page-not-found" />
        </Switch>
      </UserInfoContext.Provider>
    </Spin>
  )
}
