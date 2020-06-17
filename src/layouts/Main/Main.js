import React, { useContext, useState, useCallback } from 'react'
import { Button, Layout, Col, Drawer, Grid } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useApolloClient } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import styles from './Main.module.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import { UserInfoContext } from '../../routes'

const { Header, Footer } = Layout
const { useBreakpoint } = Grid

const MainLayout = ({ children }) => {
  const screens = useBreakpoint()
  const { email } = useContext(UserInfoContext)
  const client = useApolloClient()
  const { push } = useHistory()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const status = localStorage.getItem('sidebar')
    if (status) {
      return JSON.parse(status)
    }
    return false
  })

  const handleLogOut = async () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    await client.cache.reset()
    push('/signIn')
  }

  const handleCollapseSidebar = useCallback(() => {
    setIsCollapsed((s) => {
      localStorage.setItem('sidebar', JSON.stringify(!s))
      return !s
    })
  }, [])

  return (
    <Layout className={styles.layout}>
      {!screens.md && (
        <Drawer
          visible={!isCollapsed}
          onClose={handleCollapseSidebar}
          placement="left"
          className={styles.drawer}
        >
          <Sidebar isMobile />
        </Drawer>
      )}
      {screens.md && <Sidebar collapsed={isCollapsed} />}
      <Layout className={styles.container}>
        <Header className={styles.header}>
          <Col>
            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: handleCollapseSidebar,
            })}
          </Col>
          <Col className={styles.left}>
            {email}
            <Button type="link" onClick={handleLogOut}>
              Logout
            </Button>
          </Col>
        </Header>
        {children}
        <Footer className={styles.footer}>SouthPark ©2020 Created by Yevhenii Osadchyi</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
