import React, { useCallback, useEffect } from 'react'
import { Form, Input, InputNumber, notification, Select, Spin } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'

import CustomForm from '../../components/EditableForm'
import { requiredField } from '../../utils/FormHelpers'
import styles from './AddNewCar.module.scss'
import { CREATE_CAR, GET_USERS_LIST_FOR_SELECT } from '../../gql'
import { useErrorNotification } from '../../hooks/useErrorNotification'

const AddNewCar = () => {
  const { data: userListData = {}, loading: isUsersLoading } = useQuery(GET_USERS_LIST_FOR_SELECT)
  const [createCar, { data = {}, loading, called, client, error }] = useMutation(CREATE_CAR)
  useErrorNotification(client, error)
  const { getUsersList: userList = [] } = userListData
  useEffect(() => {
    if (data?.createCar?.id) {
      notification.success({
        message: 'Успешно!',
        description: 'Машина добавлена.',
      })
      client.clearStore()
    }
  }, [client, data, error])

  const handleSubmit = useCallback(
    async (data) => {
      await createCar({ variables: data })
    },
    [createCar]
  )

  return (
    <Spin spinning={loading}>
      <CustomForm
        onFinish={handleSubmit}
        needToResetForm={called && !!data?.createCar?.id}
        title="Добавить новый автомобиль"
      >
        {() => (
          <>
            <Form.Item name="title" label="Надпись" hasFeedback rules={[requiredField('Title')]}>
              <Input placeholder="Введите надпись" />
            </Form.Item>
            <Form.Item
              name="govNumber"
              label="Гос. Номер"
              hasFeedback
              rules={[requiredField('Гос. Номер')]}
            >
              <Input placeholder="Введите Гос. Номер" />
            </Form.Item>
            <Form.Item name="ownerId" label="Собственник" hasFeedback rules={[requiredField('Собственник')]}>
              <Select loading={isUsersLoading} placeholder="Выберите собственника">
                {userList.map(({ id, name, email }) => (
                  <Select.Option key={id} value={id}>
                    {name}: {email}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Цена" hasFeedback rules={[{ type: 'number', min: 0 }]}>
              <InputNumber className={styles.inputNumber} placeholder="Введите цену автомобиля" />
            </Form.Item>
            <Form.Item
              name="mileage"
              label="Пробег"
              hasFeedback
              rules={[{ type: 'number', min: 0 }]}
            >
              <InputNumber className={styles.inputNumber} placeholder="Введите пробег автомобиля" />
            </Form.Item>
          </>
        )}
      </CustomForm>
    </Spin>
  )
}

export default AddNewCar
