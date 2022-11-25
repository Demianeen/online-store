import React from 'react'
import styles from './Centered.module.css'
import { ICenteredText } from './Centered.types'

const CenteredText = ({ children, className, ...props }: ICenteredText) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default CenteredText
