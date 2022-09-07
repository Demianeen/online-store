import React, { FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput/FormInput'
import { useAppDispatch } from '../hooks/redux'
import { login, registration } from '../http/userApi'
import userSlice from '../store/reducers/UserSlice/slice'
import { IUserJWT } from '../store/reducers/UserSlice/types'
import { Routes } from '../utils/consts'
import axios, { AxiosError } from 'axios'

// TODO: Add error handler
export interface IApiError {
  message: string
  status: number
}

const Auth = () => {
  const dispatch = useAppDispatch()
  const { setUser, setIsAuth } = userSlice.actions
  // const { user, isAuth } = useAppSelector(store => store.user)

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === Routes.LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <div style={{ border: '1px solid black' }}>
        <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Log in' : 'Sign up'}</h2>
        <form onSubmit={handleClick}>
          <FormInput
            name={'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            name={'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
            required
          />
          <div>
            {isLogin

              ? <Link to={Routes.REGISTRATION_ROUTE} style={{
                textDecoration: 'none'
              }}>
                {'Sign up'}
              </Link>

              : <Link to={Routes.LOGIN_ROUTE} style={{
                textDecoration: 'none'
              }}>
                {'Log in'}
              </Link>}
            <input type={'submit'} value={isLogin ? 'Log in' : 'Register'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
