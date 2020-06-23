import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Page404.module.scss'

const Page404 = () => {
  return (
    <div className={styles.center}>
      <div>Страница не найдена.</div>
      <div>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </div>
  )
}

export default Page404
