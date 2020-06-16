import React, { useContext } from 'react'
import { Button, Layout } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import styles from './Main.module.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import { UserInfoContext } from '../../routes'

const { Header, Footer } = Layout

const StandardLayout = ({ children }) => {
  const { email } = useContext(UserInfoContext)
  const client = useApolloClient()
  const { push } = useHistory()

  const handleLogOut = async () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    await client.cache.reset()
    push('/signIn')
  }

  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout className={styles.container}>
        <Header className={styles.header}>
          {email}
          <Button type="link" onClick={handleLogOut}>
            Logout
          </Button>
        </Header>
        {children}
        <Footer className={styles.footer}>SouthPark ©2020 Created by Yevhenii Osadchyi</Footer>
      </Layout>
    </Layout>
  )
}

export default StandardLayout
