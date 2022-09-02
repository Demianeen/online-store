import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'

const Header = ({ ...props }: HeaderProps) => {
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(store => store.user)
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        background: 'gray'
      }}
      {...props}
    >
      <Link to={Routes.SHOP_ROUTE}>{'ShopName'}</Link>
      {isAuth
        ? <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '15%'
        }}>
          <button onClick={() => navigate(Routes.ADMIN_ROUTE)}>{'Admin Panel'}</button>
          <button onClick={() => navigate(Routes.LOGIN_ROUTE)}>{'Logout'}</button>
        </div>

        : <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '15%'
        }}>
          <button onClick={() => navigate(Routes.LOGIN_ROUTE)}>{'Login'}</button>
        </div>
      }
    </header >
  )
}

export default Header
