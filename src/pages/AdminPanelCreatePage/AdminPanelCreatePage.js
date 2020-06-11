import React from 'react'
import { Card, Col, Row } from 'antd'
import styles from './AdminPanelCreatePage.module.scss'

import AddNewUser from '../../containers/AddNewUser'
import AddNewCar from '../../containers/AddNewCar'

const AdminPanelCreatePage = () => {
  return (
    <Row>
      <Col span={8}>
        <Card className={styles.card}>
          <AddNewUser />
        </Card>
      </Col>
      <Col span={10}>
        <Card className={styles.card}>
          <AddNewCar />
        </Card>
      </Col>
    </Row>
  )
}

export default AdminPanelCreatePage
