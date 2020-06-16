import React from 'react'
import { Layout } from 'antd'
import styles from './StandardMini.module.scss'
import MainLayout from '../Main'

const { Content } = Layout

const StandardClean = ({ children }) => {
  return (
    <MainLayout>
      <Content className={styles.content}>{children}</Content>
    </MainLayout>
  )
}

export default StandardClean
