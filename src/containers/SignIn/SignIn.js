import React, { useEffect } from 'react'
import { Button, Divider, Form, Input, Spin } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER } from './qraphQl/mutation'
import styles from './SignIn.module.scss'

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

const SignIn = () => {
  const [ form ] = Form.useForm()
  const [ loginUser, { data, loading, ...rest }] = useMutation(LOGIN_USER)

  useEffect(() => {
    console.log('data> ', data)
    console.log('rest> ', rest)
  }, [ data, rest ])

  const onFinish = async (values) => {
    console.log(values)
    await loginUser({ variables: values })
  }

  return (
    <Spin tip="Loading" spinning={loading}>
      <Form {...layout} form={form} className={styles.container} onFinish={onFinish} lo>
        <Divider>South Park Taxi Login Page</Divider>
        <Form.Item name="email" label="E-mail"
                   rules={[ { required: true, type: 'email', message: 'Please input E-mail!' } ]}>
          <Input/>
        </Form.Item>
        <Form.Item name="password" label="Password"
                   rules={[ { required: true, message: 'Please input Password!' } ]}>
          <Input.Password/>
        </Form.Item>
        <Form.Item {...tailLayout} >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default SignIn
