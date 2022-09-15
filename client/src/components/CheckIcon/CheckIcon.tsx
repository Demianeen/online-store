import React from 'react'
import styles from './CheckIcon.module.css'
import cn from 'classnames'

const CheckIcon = () => {
  return (
    <div className={styles.successCheckmark}>
      <div className={styles.checkIcon}>
        <span className={cn(styles.iconLine, styles.lineTip)}></span>
        <span className={cn(styles.iconLine, styles.lineLong)}></span>
        <div className={styles.iconFix}></div>
      </div>
    </div>
  )
}

export default CheckIcon
