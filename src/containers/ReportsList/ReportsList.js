import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Table } from 'antd'
import { GET_REPORTS_LIST } from '../../gql'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const columns = [
  createCol({ title: 'Government Number', key: 'govNumber' }),
  createCol({ key: 'income' }),
  createCol({ title: 'Income by Branding', key: 'incomeBranding' }),
  createCol({ title: 'Total Income', key: 'totalIncome' }),
  createCol({ title: 'Management Fee', key: 'managementFee' }),
  createCol({ title: 'Management Fee %%', key: 'managementFeePercent' }),
  createCol({ key: 'mileage' }),
  createCol({ title: 'Service Fee', key: 'serviceFee' }),
  createCol({ title: 'Tracker Fee', key: 'trackerFee' }),
  createCol({ key: 'week' }),
  createCol({ key: 'year' }),
  createCol({ title: 'Net Profit', key: 'netProfit' }),
  createCol({ title: 'Net Profit, usd', key: 'netProfitUSD' }),
]

const ReportsList = () => {
  const { data: getReportsList = {}, loading, client, error } = useQuery(GET_REPORTS_LIST)
  const { getReportsList: reportsList = [] } = getReportsList
  useErrorNotification(client, error)

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading}
      columns={columns}
      pagination={false}
      scroll={{ x: 'auto' }}
      dataSource={reportsList}
    />
  )
}

export default ReportsList
