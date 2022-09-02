import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Routes } from '../utils/consts'

const Auth = () => {
  const { pathname } = useLocation()
  const isLogin = pathname === Routes.LOGIN_ROUTE

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
        <form>
          <label htmlFor={'email'}>{'Email'}</label>
          <input id={'email'} type={'text'} placeholder={'example@gmail.com'} />
          <label htmlFor={'password'}>{'Password'}</label>
          <input id={'password'} type={'text'} placeholder={'Your password'} />
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
