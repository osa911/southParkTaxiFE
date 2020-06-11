import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Divider, Form } from "antd";
import cn from "classnames";
import styles from "./CustomForm.module.scss";

const CustomForm = ({
  children: FormItems,
  onFinish,
  initialValues,
  formData,
  title = '',
  needToResetForm = false,
}) => {
  const [form] = Form.useForm()
  const [isFormDisabled /*setFormDisabledState*/] = useState(false)

  useEffect(() => {
    form.setFieldsValue(formData)
  }, [form, formData])

  useEffect(() => {
    if (needToResetForm) {
      form.resetFields()
    }
  }, [form, needToResetForm])

  const handleFormFinish = useCallback(
    (data) => {
      onFinish(data)
      // setFormDisabledState(true)
    },
    [onFinish]
  )

  const handleCancelClick = useCallback(() => {
    form.resetFields()
    // setFormDisabledState(true)
  }, [form])

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>{title}</h2>
      <Divider />
      <Form
        form={form}
        onFinish={handleFormFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
      >
        <FormItems isFormDisabled={isFormDisabled} />
        <div className={cn(styles.buttons, { [styles.invisible]: isFormDisabled })}>
          <Button className={styles.button} danger onClick={handleCancelClick}>
            Reset
          </Button>
          <Button className={styles.button} type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
      <Divider />
    </div>
  )
}

CustomForm.propTypes = {
  initialValues: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
  formData: PropTypes.object,
  title: PropTypes.string,
  needToResetForm: PropTypes.bool,
}

export default CustomForm
