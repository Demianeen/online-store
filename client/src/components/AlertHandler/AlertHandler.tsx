import React, { useEffect, useRef } from 'react'
import { IAlertHandler } from './AlertHandler.types'
import styles from './AlertHandler.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'
import Overlay from '../Overlay/Overlay'
import { ReactComponent as CloseIcon } from './Close.svg'
import Button from '../Button/Button'
import { selectAlert } from '../../store/reducers/notificationSlice/notificationSliceSelectors'
import { useDispatch } from 'react-redux'
import { setAlertResult } from '../../store/reducers/notificationSlice/notificationSliceActions'
import { AlertsWithReturn, AlertResult } from '../../store/reducers/notificationSlice/notificationSlice.types'
const AlertHandler = ({
  className,
  ...props
}: IAlertHandler) => {
  const dispatch = useDispatch()
  const alert = useAppSelector(selectAlert)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (cancelButtonRef.current !== null) {
      cancelButtonRef.current.focus()
    }
  }, [alert?.type])

  const setValue = <T extends AlertsWithReturn>(value: AlertResult<T>) =>
    dispatch(setAlertResult(value))

  if (alert !== undefined) {
    const {
      title,
      description,
      type,
      confirmLabel = 'Submit'
    } = alert

    return <>
      <Overlay
        onClick={() => setValue(false)}
        className={styles.overlay}
      />
      <div className={cn(styles.alert, styles[type])} {...props}>
        <header className={styles.header}>
          <h3 className={styles.heading}>{title}</h3>
          <button
            onClick={() => setValue(false)}
            className={styles.close}
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </header>
        <div className={styles.content}>
          <p>
            {description}
          </p>
        </div>
        <footer className={styles.footer}>
          <Button
            onClick={() => setValue(false)}
            className={styles.button}
            buttonStyle={'ghost'}
            ref={cancelButtonRef}
          >
            {'Cancel'}
          </Button>
          <Button
            onClick={() => setValue(true)}
            className={styles.button}
          >
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </>
  }

  return (
    <></>
  )
}

export default AlertHandler
