import React from 'react'
import styles from './Overlay.module.css'
import cn from 'classnames'
import { IOverlay } from './Overlay.types'

const Overlay = ({ isVisible = true, className, ...props }: IOverlay) => {
  return (
    <div
      className={cn(styles.overlay, className, {
        [styles.visibleOverlay]: isVisible
      })}
      {...props}
    />
  )
}

export default Overlay
