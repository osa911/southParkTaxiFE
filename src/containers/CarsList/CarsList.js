import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_CAR, GET_CARS_LIST } from '../../gql'
import { Button, message, Popconfirm, Table } from 'antd'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'
import { ARE_YOU_SURE } from '../../constants'
import { DeleteOutlined } from '@ant-design/icons'

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
  createCol({ title: 'Надпись', key: 'title' }),
  createCol({ title: 'Гос. номер', key: 'govNumber' }),
  createCol({ title: 'Цена', key: 'price' }),
  createCol({ title: 'Пробег', key: 'mileage' }),
  createCol({ title: 'Собственник', key: 'user', dataIndex: ['user', 'name'] }),
  createCol({
    key: 'reports',
    title: 'Отчеты',
    width: 600,
    render: (c = []) => (
      <ul>
        {c.map(({ id, netProfit, netProfitUSD, title }) => (
          <li key={id}>
            {title} <b>Прибыль:</b> {netProfit}грн. или ${netProfitUSD}.
          </li>
        ))}
      </ul>
    ),
  }),
]

const CarsList = () => {
  const { data: getCarsList = {}, loading, error, client } = useQuery(GET_CARS_LIST)
  const [deleteCar, { loading: delLoading, error: delError }] = useMutation(DELETE_CAR)
  useErrorNotification(client, [error, delError])
  const { getCarsList: carList = [] } = getCarsList

  const onDelete = async (e) => {
    const { delId: id } = e.currentTarget.dataset
    await deleteCar({
      variables: { id },
      update(cache, { data }) {
        if (data) {
          message.success('Данные успешно удаленны!')
          const data = cache.readQuery({ query: GET_CARS_LIST })
          const newList = data.getCarsList.filter((el) => el.id !== id)
          cache.writeQuery({
            query: GET_CARS_LIST,
            data: { getCarsList: newList },
          })
        }
      },
    })
  }

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading || delLoading}
      columns={getColumns({ onDelete })}
      pagination={false}
      dataSource={carList}
      scroll={{ x: 1000 }}
    />
  )
}

export default CarsList
