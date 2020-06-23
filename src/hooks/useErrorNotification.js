import { useEffect } from 'react'
import { notification } from 'antd'

export const useErrorNotification = (client, error) => {
  useEffect(() => {
    if (error?.graphQLErrors) {
      error.graphQLErrors.forEach(({ message }) =>
        notification.error({ message: 'Ошибка!', description: message })
      )
      client.clearStore()
    }
  }, [client, error])
}
