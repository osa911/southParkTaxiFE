import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const WeekPicker = ({ value, onChange }) => {
  const disabledDate = (current) => {
    return current && current > moment().startOf('week')
  }

  return <DatePicker value={value} onChange={onChange} picker="week" disabledDate={disabledDate} />
}

export default WeekPicker
