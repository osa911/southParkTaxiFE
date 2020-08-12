import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Table, Popconfirm, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { DELETE_REPORT, GET_REPORTS_LIST } from '../../gql'
import { createCol } from '../../utils/TableHelpers'
import { useErrorNotification } from '../../hooks/useErrorNotification'
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
  const [deleteReport, { loading: delLoading, error: delError }] = useMutation(DELETE_REPORT)
  const { getReportsList: reportsList = [] } = getReportsList
  useErrorNotification(client, [error, delError])

  const onDelete = async (e) => {
    const { delId: id } = e.currentTarget.dataset
    await deleteReport({
      variables: { id },
      update(store, { data }) {
        if (data) {
          message.success('Данные успешно удаленны!')
          const { getReportsList } = store.readQuery({ query: GET_REPORTS_LIST })
          const newList = getReportsList.filter((el) => el.id !== id)
          store.writeQuery({
            query: GET_REPORTS_LIST,
            data: { getReportsList: newList },
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
      scroll={{ x: 'auto' }}
      dataSource={reportsList}
    />
  )
}

export default ReportsList
