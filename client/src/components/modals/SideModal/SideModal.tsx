import React from 'react'
import { ISideModal } from './SideModal.types'
import styles from './SideModal.module.css'
import cn from 'classnames'

const SideModal = ({ isVisible, children, className, ...props }: ISideModal) => {
  if (isVisible) {
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
  return <></>
}

export default SideModal
