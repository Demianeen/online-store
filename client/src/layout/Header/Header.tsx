import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import userSlice from '../../store/reducers/UserSlice/slice'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'

const Header = ({ ...props }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const { setUser, setIsAuth } = userSlice.actions
  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()
  const { isAuth } = useAppSelector(store => store.user)

  const logOut = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
  }

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
          {user.role === 'ADMIN'
            ? <button onClick={() => navigate(Routes.ADMIN_ROUTE)}>{'Admin Panel'}</button>
            : <></>}
          <button onClick={() => logOut()}>{'Logout'}</button>
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
