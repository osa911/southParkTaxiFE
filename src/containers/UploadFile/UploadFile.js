import React, { useState } from "react";
import { Button, Col, Divider, Row, Tabs, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_FILE_STREAM } from "../../gql";

const { TabPane } = Tabs

const UploadFile = () => {
  const [upload, { data = {}, loading, error, called }] = useMutation(UPLOAD_FILE_STREAM)
  const [fileList, setFileList] = useState([])
  const { singleUploadStream: report = [] } = data
  console.log('data> ', data)
  console.log('error> ', error)
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', fileList[0])
    upload({ variables: { file: fileList[0] } })
      .then((res) => {
        console.log('res> ', res)
      })
      .catch((e) => {
        console.log('e> ', e)
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
      <Row>
        <Col span={12}>
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
        <Col offset={1} span={6}>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={loading}
            style={{ marginTop: 16 }}
          >
            {loading ? 'Uploading' : 'Start Upload'}
          </Button>
        </Col>
      </Row>
      {!!report.length && (
        <>
          <Divider>Report Data</Divider>
          <Row>
            <Tabs>
              {report.map(({ name, rows }) => (
                <TabPane tab={name} key={name}>
                  {rows.map((cells, key) => (
                    <>
                      <Row key={key}>
                        {cells.map(({ address, value }) => (
                          <>
                            <Col key={address}>{value}</Col>
                            <Divider type="vertical" />
                          </>
                        ))}
                      </Row>
                      <Divider style={{ margin: '3px 0' }} />
                    </>
                  ))}
                </TabPane>
              ))}
            </Tabs>
          </Row>
        </>
      )}
    </div>
  )
}

export default UploadFile
