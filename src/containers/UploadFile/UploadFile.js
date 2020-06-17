import React, { useState } from 'react'
import moment from 'moment'
import { Alert, Button, Col, Divider, Form, Grid, message, Row, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { UPLOAD_FILE_STREAM } from '../../gql'
import { useErrorNotification } from '../../hooks/useErrorNotification'
import WeekPicker from '../../components/WeekPicker'

const { useBreakpoint } = Grid

const UploadFile = () => {
  const screens = useBreakpoint()
  const [upload, { data = {}, loading, error, client }] = useMutation(UPLOAD_FILE_STREAM)
  useErrorNotification(client, error)
  const [fileList, setFileList] = useState([])
  const { uploadReportFile: reports = [] } = data

  const [date, setDate] = useState(() => moment().subtract(7, 'days'))

  const handleUpload = () => {
    if (!date) return message.error('Week for report is required')
    const formData = new FormData()
    formData.append('file', fileList[0])
    upload({ variables: { date, file: fileList[0] } }).then(() => {
      setFileList([])
    })
  }

  const props = {
    fileList,
    accept: '.xlsx',
    onRemove: (file) => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file])
      return false
    },
  }

  return (
    <div>
      <Row gutter={[8, 32]}>
        <Col span={screens.md ? 12 : 24}>
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or
              other band files
            </p>
          </Upload.Dragger>
        </Col>
        <Col offset={screens.md && 1} span={screens.md ? 9 : 12} lg={7} xl={6} xxl={4}>
          <Form.Item label="Select the week number of report">
            <WeekPicker value={date} onChange={setDate} />
          </Form.Item>
          <Row>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={loading}
              style={{ marginTop: 16 }}
            >
              {loading ? 'Uploading...' : 'Start Upload'}
            </Button>
          </Row>
        </Col>
      </Row>
      {!!reports.length && (
        <>
          <Divider>Report Data</Divider>
          {reports.map(({ id, title, govNumber }) => (
            <Alert
              key={id}
              style={{ marginTop: 5 }}
              message={`${title} and car with government number "${govNumber}" successfully saved.`}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default UploadFile
