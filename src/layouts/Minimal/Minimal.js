import React from 'react'
import { Layout } from 'antd'
import styles from './Minimal.module.scss'

const { Content } = Layout

const MinimalLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}

export default MinimalLayout
