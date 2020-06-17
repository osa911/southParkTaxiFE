import React from 'react'
import { Table } from 'antd'
import { createCol } from '../../utils/TableHelpers'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS_LIST } from '../../gql'
import styles from './UsersList.module.scss'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const columns = [
  createCol({ key: 'name' }),
  createCol({ key: 'email' }),
  createCol({ key: 'phone' }),
  createCol({ key: 'role' }),
  createCol({
    key: 'cars',
    width: 300,
    render: (cars) => {
      if (!cars.length) return null
      return (
        <ul className={styles.carList}>
          {cars.map(({ id, title, govNumber }) => (
            <li key={id}>{`${title} ${govNumber}`}</li>
          ))}
        </ul>
      )
    },
  }),
]

const UsersList = () => {
  const { data: userListData = {}, loading, client, error } = useQuery(GET_USERS_LIST)
  const { getUsersList: userList = [] } = userListData
  useErrorNotification(client, error)

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={userList}
      scroll={{ x: 1000 }}
    />
  )
}

export default UsersList
