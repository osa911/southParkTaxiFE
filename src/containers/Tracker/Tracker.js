import React from 'react'
import styles from './Tracker.module.scss'

const Tracker = () => {
  return (
    <iframe
      title="Wialon"
      src="https://hosting.wialon.com/?lang=ru"
      className={styles.iframe}
      frameBorder="0"
    />
  )
}

export default Tracker
