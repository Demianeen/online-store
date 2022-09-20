import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { useAppDispatch } from '../../hooks/redux'
import { login, registration } from '../../http/userApi'
import userSlice from '../../store/reducers/UserSlice/slice'
import { IUserJWT } from '../../store/reducers/UserSlice/types'
import { Routes } from '../../utils/consts'
import styles from './AuthComponent.module.css'
import cn from 'classnames'

export interface IApiError {
  message: string
  status: number
}

const AuthComponent = () => {
  const dispatch = useAppDispatch()
  const { setUser, setIsAuth } = userSlice.actions

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === Routes.LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const isEmailEmpty = useRef(true)
  const isPasswordEmpty = useRef(true)

  const goTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: Routes) => {
    e.preventDefault()

    // if (pathname !== route) {
    setIsLoading((isLoading) => false)
    setTimeout(() => setIsLoading((isLoading) => true), 400)
    // setIsLoading((isLoading) => true)
    // }
    navigate(route)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      let response: IUserJWT
      if (isLogin) {
        response = await login(email, password)
      } else {
        response = await registration(email, password)
      }

      dispatch(setUser(response))
      dispatch(setIsAuth(true))

      navigate(Routes.SHOP_ROUTE)
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response !== undefined)) {
        // TODO: Process axios error without new variable
        const axiosError = error as AxiosError<IApiError>
        alert(axiosError.response?.data.message)

        return
      } else if (error instanceof Error) {
        alert(error.message)
      }
      alert('Internal error. Try again later')
    }
  }

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setEmail(inputValue)
    if (inputValue === '') {
      isEmailEmpty.current = true
      return
    }
    isEmailEmpty.current = false
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setPassword(inputValue)
    if (inputValue === '') {
      isPasswordEmpty.current = true
      return
    }
    isPasswordEmpty.current = false
  }

  useEffect(() => {
    // setTimeout(() => setIsLoading(false), 10000)
    console.log(isLoading)
  }, [isLoading])

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
            [styles.animation]: isLoading
          })}>{isLogin ? 'Welcome back' : 'Sign up'}</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <label className={cn(styles.label, {
                [styles.active]: !isEmailEmpty.current
              })}>
                {'Email Address'}<span className={styles.req}>{'*'}</span>
              </label>
              <input
                className={styles.input}
                type={'email'}
                onChange={changeEmail}
                value={email}
                required
              />
            </div>

            <div className={styles.fieldContainer}>
              <label className={cn(styles.label, {
                [styles.active]: !isPasswordEmpty.current
              })}>
                {'Your password'}<span className={styles.req}>{'*'}</span>
              </label>
              <input
                className={styles.input}
                type={'password'}
                onFocus={(e) => e.target.select()}
                onChange={changePassword}
                value={password}
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
