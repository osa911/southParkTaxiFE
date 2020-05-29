import React from 'react'
import { Button, Divider, Form, Input } from 'antd'
import { requiredField } from '../../utils/FormHelpers'

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

const NewUserForm = ({ onSave }) => {
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Form {...layout} form={form} onFinish={onSave}>
      <Divider>South Park Taxi</Divider>
      <Form.Item name="name" label="Client name" rules={[requiredField('Client name')]}>
        <Input/>
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[requiredField('Password')]}>
        <Input.Password/>
      </Form.Item>
      <Form.Item name="email" label="E-mail" rules={[{ ...requiredField('E-mail'), type: 'email' }]}>
        <Input/>
      </Form.Item>
      <Form.Item {...tailLayout} >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewUserForm
