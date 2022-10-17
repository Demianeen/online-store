import React from 'react'
import { INotification } from './Notification.types'
import styles from './Notification.module.css'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { clearNotification } from '../../store/reducers/notificationSlice/notificationSliceActions'
import { selectAllPopups } from '../../store/reducers/notificationSlice/notificationSliceSelectors'

const Notification = ({
  className,
  ...props
}: INotification) => {
  const dispatch = useAppDispatch()

  const popups = useAppSelector(selectAllPopups)

  const handleClose = (id: string) => {
    dispatch(clearNotification(id))
  }

  return (
    <div className={styles.notificationContainer}>
      {popups.map(({ id, message, type }) =>
        <div
          className={cn(styles.notification, className, styles[type])}
          key={id}
          {...props}
        >
          {message}
          <button
            onClick={() => handleClose(id)}
            className={styles.close}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  )
}

export default Notification
