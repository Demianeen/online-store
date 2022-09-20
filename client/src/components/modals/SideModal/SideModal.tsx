import React from 'react'
import { ISideModal } from './SideModal.types'
import styles from './SideModal.module.css'
import cn from 'classnames'

const SideModal = ({ children, className, ...props }: ISideModal) => {
  return (
    <>
      <div
        className={cn(styles.modal, className)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export default SideModal
