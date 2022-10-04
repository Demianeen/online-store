import React from 'react'
import SideModal from '../SideModal/SideModal'
import { IUserModal } from './UserControl.types'
import styles from './UserControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import userSlice from '../../../store/reducers/UserSlice/slice'

const UserControl = ({ setIsVisible, isVisible, ...props }: IUserModal) => {
  const dispatch = useAppDispatch()
  const { setIsAuth, setUser } = userSlice.actions

  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  const signOut = () => {
    dispatch(setUser(undefined))
    dispatch(setIsAuth(false))
    setIsVisible(false)
    navigate(Routes.SHOP_ROUTE)
    localStorage.removeItem('token')
  }

  if (!isVisible) {
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <ul className={styles.container}>
        {user?.role === 'ADMIN'
          ? <li className={styles.li}>
          <button
            className={styles.button}
              onClick={() => { navigate(Routes.ADMIN_ROUTE); setIsVisible(false) }}
          >
            {'Admin'}
          </button>
        </li>
          : <></>}
        <li className={styles.li}>
          <button
            className={styles.button}
            onClick={() => signOut()}
          >
            {'Sign out'}
          </button>
        </li>
      </ul>
    </SideModal>
  )
}

export default UserControl
