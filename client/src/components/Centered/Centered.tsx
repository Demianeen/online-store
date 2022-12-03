import React from 'react'
import styles from './Centered.module.css'
import cn from 'classnames'
import { ICentered } from './Centered.types'

const Centered = ({ children, className, ...props }: ICentered) => {
  return (
    <div
      className={cn(styles.container, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Centered
