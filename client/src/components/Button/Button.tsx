import React, { forwardRef } from 'react'
import styles from './Button.module.css'
import cn from 'classnames'
import { IButton } from './Button.types'

const Button = forwardRef<HTMLButtonElement, IButton>(({
  buttonStyle = 'primary', children, className, ...props
}, ref) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primaryButton]: buttonStyle === 'primary',
        [styles.ghostButton]: buttonStyle === 'ghost'
      })}
      {...props}
      ref={ref}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  )
})

Button.displayName = 'AddToCart'

export default Button
