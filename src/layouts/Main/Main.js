import React from 'react'
import { Button, Layout } from 'antd'
import { useHistory } from 'react-router-dom'
import styles from './Main.module.scss'
import Sidebar from '../../components/Sidebar/Sidebar'

const { Header, Footer } = Layout

const StandardLayout = ({ children }) => {
  const { push } = useHistory()
  const handleLogOut = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    push('/signIn')
  }

  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout className={styles.container}>
        <Header className={styles.header}>
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
