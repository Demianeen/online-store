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
import FormInput from '../../components/FormInput/FormInput'

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

  const goTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: Routes) => {
    e.preventDefault()

    setIsAuthMethodChanging((isLoading) => false)
    setTimeout(() => setIsAuthMethodChanging((isLoading) => true), 400)
    navigate(route)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      if (isLogin) {
        if (isLoginLoading) return
        const fieldValues = Object.fromEntries(formData.entries())
        // FIXME: Fix problem with types
        // @ts-expect-error
        await login(fieldValues).unwrap()
      } else {
        if (isRegisterLoading) return
        const fieldValues = Object.fromEntries(formData.entries())
        if (fieldValues.password !== fieldValues.confirmPassword) {
          dispatch(addNotification({
            type: 'error', message: "Passwords don't match"
          }))
          return
        }
        // @ts-expect-error
        await registration(fieldValues).unwrap()
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

        {isLogin
          ? <form onSubmit={handleSubmit}>
            <FormInput
              labelText={'Your email'}
              className={styles.field}
              type={'email'}
              name={'email'}
              id={'loginEmail'}
              required
            />
            <FormInput
              labelText={'Your password'}
              className={styles.field}
              type={'password'}
              name={'password'}
              id={'loginPassword'}
              required
            />

            <Button type={'submit'} className={styles.submit}>{'Log in'}</Button>
          </form>
          : <form onSubmit={handleSubmit}>
            <FormInput
              labelText={'Email Address'}
              className={styles.field}
              type={'email'}
              name={'email'}
              id={'registrationEmail'}
              requiredStar
              required
            />
            <FormInput
              labelText={'Password'}
              className={styles.field}
              type={'password'}
              name={'password'}
              id={'registrationPassword'}
              requiredStar
              required
            />
            <FormInput
              labelText={'Confirm Password'}
              className={styles.field}
              type={'password'}
              name={'confirmPassword'}
              id={'registrationConfirmPassword'}
              requiredStar
              required
            />

            <Button type={'submit'} className={styles.submit}>{isLogin ? 'Log in' : 'Get started'}</Button>
          </form>
        }

      </div>
    </div>
  )
}

export default AuthComponent
