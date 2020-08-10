import React, { useCallback, useEffect } from 'react'
import { Form, Input, notification, Select, Spin } from 'antd'
import { useMutation } from '@apollo/react-hooks'

import CustomForm from '../../components/EditableForm'
import { requiredField } from '../../utils/FormHelpers'
import { CREATE_USER } from '../../gql'
import { ADMIN_ROLE, INVESTOR_ROLE } from '../../constants'

const AddNewUser = () => {
  const [createNewUser, { data = {}, loading, called, client, error }] = useMutation(CREATE_USER)

  useEffect(() => {
    if (error?.graphQLErrors) {
      notification.error({
        message: 'Ошибка!',
        description: error.graphQLErrors[0]?.message,
      })
    }
    if (data?.createUser?.id) {
      notification.success({
        message: 'Успешно!',
        description: 'Пользователь добавлен.',
      })
      client.clearStore()
    }
  }, [client, data, error])

  const handleSubmit = useCallback(
    async (data) => {
      await createNewUser({ variables: data })
    },
    [createNewUser]
  )

  return (
    <Spin spinning={loading}>
      <CustomForm
        onFinish={handleSubmit}
        needToResetForm={called && !!data?.createUser?.id}
        title="Добавить нового пользователя"
      >
        {() => (
          <>
            <Form.Item
              name="name"
              label="Имя"
              hasFeedback
              rules={[requiredField('Имя')]}
            >
              <Input placeholder="Введите Имя" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              hasFeedback
              rules={[requiredField('Пароль')]}
            >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[{ ...requiredField('E-mail'), type: 'email' }]}
            >
              <Input placeholder="Введите e-mail" />
            </Form.Item>
            <Form.Item name="role" label="Роль" hasFeedback rules={[requiredField('Role')]}>
              <Select placeholder="Выберите роль">
                <Select.Option value={INVESTOR_ROLE}>Инвестор</Select.Option>
                <Select.Option value={ADMIN_ROLE}>Администратор</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="phone" label="Телефон" hasFeedback>
              <Input placeholder="Введите телефон" />
            </Form.Item>
          </>
        )}
      </CustomForm>
    </Spin>
  )
}

export default AddNewUser
