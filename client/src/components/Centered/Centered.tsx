import React from 'react'
import styles from './Centered.module.css'
import { ICentered } from './Centered.types'

const Centered = ({ children, className, ...props }: ICentered) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Centered
