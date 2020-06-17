import React from 'react'
import { Card, Col, Row } from 'antd'
import styles from './AdminPanelCreatePage.module.scss'

import AddNewUser from '../../containers/AddNewUser'
import AddNewCar from '../../containers/AddNewCar'

const AdminPanelCreatePage = () => {
  return (
    <Row>
      <Col lg={8} md={12} sm={24} span={24}>
        <Card className={styles.card}>
          <AddNewUser />
        </Card>
      </Col>
      <Col lg={10} md={12} sm={24} span={24}>
        <Card className={styles.card}>
          <AddNewCar />
        </Card>
      </Col>
    </Row>
  )
}

export default AdminPanelCreatePage
