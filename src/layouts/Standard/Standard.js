import React from 'react'
import { Layout } from 'antd'
import styles from './Standard.module.scss'
import MainLayout from '../Main'

const { Content } = Layout

const StandardLayout = ({ children }) => {
  return (
    <MainLayout>
      <Content className={styles.content}>{children}</Content>
    </MainLayout>
  )
}

export default StandardLayout
