import React, { useState } from "react"
import { Layout as LayoutContent, Breadcrumb, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
// import Sidebar from 'components/Sidebar'
import { Link } from 'react-router-dom'

import styles from './Main.module.scss'
const { Header, Content } = LayoutContent

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed((collapsed) => !collapsed)
  }
  return (
    <>
      <LayoutContent style={{ minHeight: '100vh' }}>
        <Header className={styles.header}>
          <Button className={styles.button} onClick={onCollapse}><MenuOutlined /></Button>
          <Link to="/">
            <span className={styles.reevooLogo}>REEVOO</span>
          </Link>
        </Header>
        <LayoutContent className={styles.container}>
          {/*<Sidebar collapsed={collapsed}/>*/}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Breadcrumb functionality</Breadcrumb.Item>
              <Breadcrumb.Item>Will be added later</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.content}>{children}</div>
          </Content>
        </LayoutContent>
      </LayoutContent>
    </>
  )
}

export default MainLayout
