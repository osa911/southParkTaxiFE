import React, { useCallback, useEffect } from "react";
import { Form, Input, notification, Select, Spin } from "antd";
import { useMutation } from "@apollo/react-hooks";

import CustomForm from "../../components/EditableForm";
import { requiredField } from "../../utils/FormHelpers";
import { CREATE_USER } from "./gql/mutation";

const AddNewUser = () => {
  const [createNewUser, { data = {}, loading, called, client, error }] = useMutation(CREATE_USER)

  useEffect(() => {
    if (error?.message) {
      notification.error({
        message: 'Error!',
        description: error.message,
      })
    }
    if (data?.createUser?.id) {
      notification.success({
        message: 'Successes!',
        description: 'User Saved',
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
        title="New User"
      >
        {() => (
          <>
            <Form.Item
              name="name"
              label="Client name"
              hasFeedback
              rules={[requiredField('Client name')]}
            >
              <Input placeholder="Type user name" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              hasFeedback
              rules={[requiredField('Password')]}
            >
              <Input.Password placeholder="Type user password" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[{ ...requiredField('E-mail'), type: 'email' }]}
            >
              <Input placeholder="Type user e-mail" />
            </Form.Item>
            <Form.Item name="role" label="Role" hasFeedback rules={[{ ...requiredField('Role') }]}>
              <Select placeholder="Select a role">
                <Select.Option value="INVESTOR">Investor</Select.Option>
                <Select.Option value="ADMIN">Administrator</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
      </CustomForm>
    </Spin>
  )
}

export default AddNewUser
