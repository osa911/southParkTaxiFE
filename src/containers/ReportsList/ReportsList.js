import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Table } from 'antd'
import { GET_REPORTS_LIST } from '../../gql'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const columns = [
  createCol({ title: 'Гос. Номер', key: 'govNumber' }),
  createCol({ title: 'Выручка', key: 'income' }),
  createCol({ title: 'Бонус за брендирование', key: 'incomeBranding' }),
  createCol({ title: 'Всего доход', key: 'totalIncome' }),
  createCol({ title: 'Комиссия за управление', key: 'managementFee' }),
  createCol({ title: 'Процент за управление', key: 'managementFeePercent' }),
  createCol({ title: 'Пробег авто', key: 'mileage' }),
  createCol({ title: 'ТО', key: 'serviceFee' }),
  createCol({ title: 'Расходы на трекер', key: 'trackerFee' }),
  createCol({ title: '# недели', key: 'week' }),
  createCol({ title: 'Год', key: 'year' }),
  createCol({ title: 'Прибыль', key: 'netProfit' }),
  createCol({ title: 'Прибыль, USD', key: 'netProfitUSD' }),
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
