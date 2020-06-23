import React, { useContext, useState } from 'react'
import { Tabs, Card, Col, Row, Tag, Table, Descriptions } from 'antd'
import { Line } from '@ant-design/charts'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { GET_REPORT_BY_INVESTOR } from '../../gql'
import { useErrorNotification } from '../../hooks/useErrorNotification'
import { createCol } from '../../utils/TableHelpers'
import { UserInfoContext } from '../../routes'
import WeekPicker from '../../components/WeekPicker'

const { TabPane } = Tabs

const columns = [
  createCol({ key: 'govNumber' }),
  createCol({ key: 'totalIncome' }),
  createCol({ key: 'totalFee' }),
  createCol({ key: 'netProfit' }),
  createCol({ key: 'netProfitUSD' }),
]

const Home = () => {
  const { id } = useContext(UserInfoContext)
  const [date, setDate] = useState(() => moment().subtract(7, 'days'))
  const { data: carsDataWithDate = {}, loading, client, error } = useQuery(GET_REPORT_BY_INVESTOR, {
    variables: {
      ownerId: id,
      date,
    },
  })
  const { getReportsByCarsByOwnerId: reports = [] } = carsDataWithDate
  useErrorNotification(client, error)

  const { data: carsData = {} } = useQuery(GET_REPORT_BY_INVESTOR, {
    variables: {
      ownerId: id,
    },
  })
  const { getReportsByCarsByOwnerId: reportsForChart = [] } = carsData

  const currency = ' грн.'
  const expandedRowRender = ({
    govNumber,
    income,
    incomeBranding,
    totalIncome,
    mileage,
    serviceFee,
    managementFee,
    managementFeePercent,
    totalFee,
    netProfit,
    exchangeRate,
    netProfitUSD,
  }) => {
    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        <Descriptions
          layout="vertical"
          bordered
          size="small"
          title={`Больше информации по автомобилю ${govNumber}`}
          // column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Доход от такси">
            <Tag color="green">{`${Number(income)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Доход от брендирования">
            <Tag color="green">{`${Number(incomeBranding)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Сумма доходов">
            <Tag color="#87d068">{`${Number(totalIncome)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="ТО">
            <Tag color="red">{`${Number(serviceFee)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Управление автопарком">
            <Tag color="red">{`${Number(managementFee)}${currency}`}</Tag>
          </Descriptions.Item>
          {/*<Descriptions.Item label="% автопарка">*/}
          {/*  {managementFeePercent && (*/}
          {/*    <Alert message={`${Number(managementFeePercent)}%`} type="error" />*/}
          {/*  )}*/}
          {/*</Descriptions.Item>*/}
          <Descriptions.Item label="Сумма расходов">
            <Tag color="#f50">{`${Number(totalFee)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Пробег">
            <Tag color="blue">{`${Number(mileage)}км`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Курс НБУ">
            <Tag color="blue">{`${Number(exchangeRate)}${currency}`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Итого прибыль">
            <Tag color={netProfit > 0 ? '#2db7f5' : 'red'}>{`${Number(netProfit)}${currency}`}</Tag>
            <Tag color={netProfit > 0 ? '#2db7f5' : 'red'}>{`${Number(netProfitUSD)} USD`}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
  }

  const config = {
    title: {
      visible: true,
      text: 'График доходов по автомобилям за все время',
    },
    padding: 'auto',
    forceFit: true,
    legend: { position: 'top' },
    data: reportsForChart,
    xField: 'week',
    yField: 'netProfit',
    seriesField: 'govNumber',
    xAxis: {
      label: {
        formatter: (v) => `#${v}`,
      },
    },
    yAxis: { label: { formatter: (v) => `${v}, грн.` } },
    responsive: true,
    animation: { appear: { animation: 'clipingWithData' } },
    interactions: [
      {
        type: 'slider',
      },
    ],
    smooth: true,
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24} xl={12}>
        <Card>
          <Tabs tabBarExtraContent={<WeekPicker value={date} onChange={setDate} />}>
            <TabPane tab="Отчет по машинам" key="1">
              <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                pagination={false}
                dataSource={reports}
                scroll={{ x: 'auto' }}
                expandable={{ expandedRowRender }}
              />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
      <Col span={24} xl={12}>
        <Card>
          <Line {...config} />
        </Card>
      </Col>
    </Row>
  )
}

export default Home
