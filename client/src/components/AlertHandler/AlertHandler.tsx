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
import useLockScroll from '../../hooks/useLockScroll'

const AlertHandler = ({
  className,
  ...props
}: IAlertHandler) => {
  const dispatch = useDispatch()
  const alert = useAppSelector(selectAlert)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const [blockScroll, allowScroll] = useLockScroll()

  const isEscClicked = useRef(false)

  useEffect(() => {
    if (cancelButtonRef.current !== null) {
      cancelButtonRef.current.focus()
    }
  }, [alert?.type])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isEscClicked.current) {
        isEscClicked.current = true
        setValue(false)
      }
    }

    const removeListener = () => {
      document.body.removeEventListener('keyup', listener)
      isEscClicked.current = false
    }

    if (alert !== undefined) {
      blockScroll()
      document.body.addEventListener('keyup', listener)
    } else {
      allowScroll()
      removeListener()
    }

    return () => removeListener()
  }, [alert])

  const setValue = <T extends AlertsWithReturn>(value: AlertResult<T>) => {
    dispatch(setAlertResult(value))
  }

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
