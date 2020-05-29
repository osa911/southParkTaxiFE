import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AppolloClient from './AppolloClient'
import './styles/App.less'
import Routes from './routes'

const browserHistory = createBrowserHistory()

function App() {
  return (
    <ApolloProvider client={AppolloClient}>
      <Router history={browserHistory}>
        <Routes/>
      </Router>
    </ApolloProvider>
  )
}

export default App
