import React from 'react'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AppolloClient from './AppolloClient'
import moment from 'moment';
import 'moment/locale/ru';
import ruRU from 'antd/es/locale/ru_RU';
import './styles/App.less'
import Routes from './routes'

moment.locale('ru');
const browserHistory = createBrowserHistory()

function App() {
  return (
    <ApolloProvider client={AppolloClient}>
      <ConfigProvider locale={ruRU}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default App
