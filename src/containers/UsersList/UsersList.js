import React, { useCallback } from 'react'
import { Button, message, Popconfirm, Table } from 'antd'
import { createCol } from '../../utils/TableHelpers'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_USER, GET_USERS_LIST } from '../../gql'
import styles from './UsersList.module.scss'
import { useErrorNotification } from '../../hooks/useErrorNotification'
import { DeleteOutlined } from '@ant-design/icons'
import { ARE_YOU_SURE } from '../../constants'

const getColumns = ({ onDelete }) => [
  createCol({
    title: 'Action',
    width: 50,
    render: (c, r) => {
      return (
        <Popconfirm
          title={ARE_YOU_SURE}
          data-del-id={r.id}
          onConfirm={onDelete}
          okText="Да"
          okButtonProps={{ 'data-del-id': r.id }}
          cancelText="Нет"
        >
          <Button size="small" danger title="Удалить">
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      )
    },
  }),
  createCol({ key: 'name', title: 'Имя' }),
  createCol({ key: 'email', title: 'E-mail' }),
  createCol({ key: 'phone', title: 'Телефон' }),
  createCol({ key: 'role', title: 'Роль' }),
  createCol({
    key: 'cars',
    width: 300,
    title: 'Список автомобилей',
    render: (cars) => {
      if (!cars.length) return null
      return (
        <ol className={styles.carList}>
          {cars.map(({ id, title, govNumber }) => (
            <li key={id}>{`${title} ${govNumber}`}</li>
          ))}
        </ol>
      )
    },
  }),
]

const UsersList = () => {
  const { data: userListData = {}, loading, client, error } = useQuery(GET_USERS_LIST)
  const [deleteUser, { loading: delLoading, error: delError }] = useMutation(DELETE_USER)
  const { getUsersList: userList = [] } = userListData
  useErrorNotification(client, [error, delError])

  const onDelete = useCallback(
    async (e) => {
      const { delId: id } = e.currentTarget.dataset
      await deleteUser({
        variables: { id },
        update(store, { data }) {
          if (data) {
            message.success('Данные успешно удаленны!')
            const { getUsersList } = store.readQuery({ query: GET_USERS_LIST })
            const newList = getUsersList.filter((el) => el.id !== id)
            store.writeQuery({
              query: GET_USERS_LIST,
              data: { getUsersList: newList },
            })
          }
        },
      })
    },
    [deleteUser]
  )

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading || delLoading}
      columns={getColumns({ onDelete })}
      pagination={false}
      dataSource={userList}
      scroll={{ x: 1000 }}
    />
  )
}

export default UsersList
