import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_CARS_LIST } from '../../gql'
import { Table } from 'antd'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const columns = [
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
            Title: {title} netProfit: {netProfit}, netProfitUSD: {netProfitUSD}
          </li>
        ))}
      </ul>
    ),
  }),
]

const CarsList = () => {
  const { data: getCarsList = {}, loading, error, client } = useQuery(GET_CARS_LIST)
  useErrorNotification(client, error)
  const { getCarsList: carList = [] } = getCarsList

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={carList}
      scroll={{ x: 1000 }}
    />
  )
}

export default CarsList
