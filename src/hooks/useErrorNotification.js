import { useEffect } from 'react'
import { notification } from 'antd'

export const useErrorNotification = (client, errors) => {
  useEffect(() => {
    if (Array.isArray(errors)) {
      errors.forEach((obj) => {
        if (obj) {
          const { graphQLErrors = [] } = obj
          graphQLErrors.forEach(({ message }) =>
            notification.error({ message: 'Ошибка!', description: message })
          )
          client.clearStore()
        }
      })
    } else if (errors?.graphQLErrors) {
      errors.graphQLErrors.forEach(({ message }) =>
        notification.error({ message: 'Ошибка!', description: message })
      )
      client.clearStore()
    }
  }, [client, errors])
}
