import { useEffect } from 'react'

export const useDocumentTitle = (title = 'SouthPark') => {
  useEffect(() => {
    document.title = title
  }, [title])
}
