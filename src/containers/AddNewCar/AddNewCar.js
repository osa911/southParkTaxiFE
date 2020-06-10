import React, { useCallback, useEffect } from "react";
import { Form, Input, InputNumber, notification, Select, Spin } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";

import CustomForm from "../../components/EditableForm";
import { requiredField } from "../../utils/FormHelpers";
import styles from "./AddNewCar.module.scss";
import { CREATE_CAR, GET_USERS_LIST_FOR_SELECT } from "../../gql";

const AddNewCar = () => {
  const { data: userListData = {}, loading: isUsersLoading } = useQuery(GET_USERS_LIST_FOR_SELECT)
  const [createCar, { data = {}, loading, called, client, error }] = useMutation(CREATE_CAR)

  const { getUsersList: userList = [] } = userListData
  useEffect(() => {
    if (error?.message) {
      notification.error({
        message: 'Error!',
        description: error.message,
      })
    }
    if (data?.createCar?.id) {
      notification.success({
        message: 'Successes!',
        description: 'Car Saved',
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
        title="New Car"
      >
        {() => (
          <>
            <Form.Item name="title" label="Title" hasFeedback rules={[requiredField('Title')]}>
              <Input placeholder="Type car title" />
            </Form.Item>
            <Form.Item
              name="govNumber"
              label="Government Number"
              hasFeedback
              rules={[requiredField('Government Number')]}
            >
              <Input placeholder="Type car government number" />
            </Form.Item>
            <Form.Item name="ownerId" label="Owner" hasFeedback rules={[requiredField('Owner')]}>
              <Select loading={isUsersLoading} placeholder="Select an owner">
                {userList.map(({ id, name, email }) => (
                  <Select.Option key={id} value={id}>
                    {name}: {email}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price" hasFeedback rules={[{ type: 'number', min: 0 }]}>
              <InputNumber className={styles.inputNumber} placeholder="Type car price" />
            </Form.Item>
            <Form.Item
              name="mileage"
              label="Mileage"
              hasFeedback
              rules={[{ type: 'number', min: 0 }]}
            >
              <InputNumber className={styles.inputNumber} placeholder="Type car mileage" />
            </Form.Item>
          </>
        )}
      </CustomForm>
    </Spin>
  )
}

export default AddNewCar
