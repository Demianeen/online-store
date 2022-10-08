import React from 'react'
import SideModal from '../SideModal/SideModal'
import { IUserModal } from './UserControl.types'
import styles from './UserControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import { useAppDispatch } from '../../../hooks/redux'
import { useCheckQuery, userApiSlice } from '../../../http/userApi/userApi'

const UserControl = ({ setIsVisible, isVisible, ...props }: IUserModal) => {
  const dispatch = useAppDispatch()

  const { data: userData } = useCheckQuery(undefined)
  const navigate = useNavigate()

  const signOut = () => {
    setIsVisible(false)
    localStorage.removeItem('token')
    dispatch(userApiSlice.util.resetApiState())

    navigate(Routes.SHOP_ROUTE)
  }

  if (!isVisible) {
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <ul className={styles.container}>
        {userData?.user?.role === 'ADMIN'
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
