import React, { useEffect } from 'react'
import { Alert, Button, Divider, Form, Input, Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import styles from './SignIn.module.scss'
import { requiredField } from '../../utils/FormHelpers'
import { GET_USER_INFO, LOGIN_USER } from '../../gql'

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

const SignIn = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [loginUser, { data = {}, loading, error, called }] = useMutation(LOGIN_USER)

  const [loadUserInfo, { data: userInfoData = {} }] = useLazyQuery(GET_USER_INFO, {
    context: {
      headers: {
        authorization: data.loginUser,
      },
    },
  })

  useEffect(() => {
    const { loginUser } = data
    if (loginUser && userInfoData.me) {
      localStorage.setItem('userInfo', JSON.stringify(userInfoData.me))
      history.push('/')
    }
  }, [data, history, userInfoData])

  useEffect(() => {
    const { loginUser } = data
    if (loginUser) {
      localStorage.setItem('token', loginUser)
      loadUserInfo()
    }
  }, [data, error, called, history, loadUserInfo])

  const onFinish = async (values) => {
    await loginUser({ variables: values })
  }

  return (
    <Spin tip="Loading" spinning={loading}>
      {called && error && (
        <div className={styles.error}>
          <Alert message="Error" description={error.message} type="error" closable />
        </div>
      )}
      <Form {...layout} form={form} className={styles.container} onFinish={onFinish}>
        <Divider>South Park Taxi Login Page</Divider>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ required: true, type: 'email', message: 'Please input E-mail!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[requiredField('Password')]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default SignIn
