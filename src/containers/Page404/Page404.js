import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Page404.module.scss'

const Page404 = () => {
  return (
    <div className={styles.center}>
      <div>Page404</div>
      <div>
        <Link to="/">Go home page</Link>
      </div>
    </div>
  )
}

export default Page404
