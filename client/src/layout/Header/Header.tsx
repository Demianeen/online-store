import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import userSlice from '../../store/reducers/UserSlice/slice'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'

const Header = ({ ...props }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const { setIsAuth } = userSlice.actions
  const { isAuth } = useAppSelector(store => store.user)
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        background: 'gray'
      }
      }
      {...props}
    >
      <Link to={Routes.SHOP_ROUTE}>ShopName</Link>
      {isAuth
        ? <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '15%'
        }}>
          <button>Admin Panel</button>
          <button>Logout</button>
        </div>

        : <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '15%'
        }}>
          <button>Login</button>
        </div>
      }
    </header >
  )
}

export default Header
