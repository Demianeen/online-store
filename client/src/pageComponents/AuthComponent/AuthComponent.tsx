import React, { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { Routes } from '../../utils/consts'
import styles from './AuthComponent.module.css'
import cn from 'classnames'
import { useLoginMutation, useRegistrationMutation } from '../../http/userApi/userApi'
import { isFetchBaseQueryError, isErrorWithMessage } from '../../http/error'
import { useAppDispatch } from '../../hooks/redux'
import { addNotification, unhandledErrorNotification } from '../../store/reducers/notificationSlice/notificationSliceActions'
import useInput from '../../hooks/useInput'

export interface IApiError {
  message: string
  status: number
}

const AuthComponent = () => {
  const dispatch = useAppDispatch()

  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const [registration, { isLoading: isRegisterLoading }] = useRegistrationMutation()

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === Routes.LOGIN_ROUTE

  const [isAuthMethodChanging, setIsAuthMethodChanging] = useState(true)

  const { isEmpty: isEmailEmpty, ...email } = useInput()
  const { isEmpty: isPasswordEmpty, ...password } = useInput()

  const goTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: Routes) => {
    e.preventDefault()

    setIsAuthMethodChanging((isLoading) => false)
    setTimeout(() => setIsAuthMethodChanging((isLoading) => true), 400)
    navigate(route)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const value = {
        email: email.value,
        password: password.value
      }
      if (isLogin) {
        if (isLoginLoading) return
        await login(value).unwrap()
      } else {
        if (isRegisterLoading) return
        await registration(value).unwrap()
      }

      navigate(Routes.SHOP_ROUTE)
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (isErrorWithMessage(error.data)) {
          return dispatch(addNotification({
            type: 'error',
            message: error.data.message
          }))
        }
        dispatch(unhandledErrorNotification())
      } else if (isErrorWithMessage(error)) {
        dispatch(addNotification({ type: 'error', message: error.message }))
      }
    }
  }

  return (
    <div className={styles.form}>

      <ul className={styles.tabGroup}>
        <li className={cn(styles.tab, {
          [styles.active]: isLogin
        })}>
          <a onClick={(e) => goTo(e, Routes.LOGIN_ROUTE)} className={styles.link}>
            {'Log In'}
          </a>
        </li>
        <li className={cn(styles.tab, {
          [styles.active]: !isLogin
        })}>
          <a onClick={(e) => goTo(e, Routes.REGISTRATION_ROUTE)} className={styles.link}>
            {'Sign Up'}
          </a>
        </li>
      </ul>

      <div className={styles.tabContent}>
        <h2 className={cn(styles.heading, {
          [styles.animation]: isAuthMethodChanging
        })}>{isLogin ? 'Welcome back' : 'Sign up'}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldContainer}>
            <label className={cn(styles.label, {
              [styles.active]: !isEmailEmpty
            })}>
              {'Email Address'}<span className={styles.req}>{'*'}</span>
            </label>
            <input
              className={styles.input}
              type={'email'}
              {...email}
              required
            />
          </div>

          <div className={styles.fieldContainer}>
            <label className={cn(styles.label, {
              [styles.active]: !isPasswordEmpty
            })}>
              {'Your password'}<span className={styles.req}>{'*'}</span>
            </label>
            <input
              className={styles.input}
              type={'password'}
              onFocus={(e) => e.target.select()}
              {...password}
              required
            />
          </div>

          <Button type={'submit'} className={styles.submit}>{isLogin ? 'Log in' : 'Get started'}</Button>
        </form>
      </div>
    </div>
  )
}

export default AuthComponent
