import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_CARS_LIST } from '../../gql'
import { Table } from 'antd'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const columns = [
  createCol({ key: 'title' }),
  createCol({ title: 'Government Number', key: 'govNumber' }),
  createCol({ key: 'price' }),
  createCol({ key: 'mileage' }),
  createCol({ title: 'Owner', key: 'user', dataIndex: ['user', 'name'] }),
  createCol({
    key: 'reports',
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
      dataSource={carList}
      pagination={false}
      rowKey="id"
      size="small"
      bordered
      loading={loading}
      columns={columns}
    />
  )
}

export default CarsList
