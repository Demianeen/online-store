import React from 'react'
import styles from './Button.module.css'
import cn from 'classnames'
import { IButton } from './Button.types'

const AddToCart = ({ buttonStyle = 'primary', children, className, ...props }: IButton) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primaryButton]: buttonStyle === 'primary',
        [styles.ghostButton]: buttonStyle === 'ghost'
      })}
      {...props}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  )
}

export default AddToCart
