import React from 'react'
import SideModal from '../SideModal/SideModal'
import { IUserModal } from './UserControl.types'
import styles from './UserControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import { useCheckQuery } from '../../../http/userApi/userApi'
import { useSignOut } from '../../../hooks/useSignOut'
import { ReactComponent as UserIcon } from './User.svg'
import cn from 'classnames'
import Overlay from '../../Overlay/Overlay'

const UserControl = ({ setIsOpen, isOpen, className, ...props }: IUserModal) => {
  const { data: userData } = useCheckQuery(undefined)
  const navigate = useNavigate()
  const signOut = useSignOut()

  const handleSignOut = () => {
    setIsOpen(false)
    signOut()
  }

  return (
    <>
      <Overlay
        onClick={() => setIsOpen(false)}
        isVisible={isOpen}
        className={styles.overlay}
      />
      <div
        className={cn(styles.modalContainer, className)}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <button
          onClick={() => setIsOpen(isUserOpen => !isUserOpen)}
          className={styles.iconButton}
        >
          <UserIcon />
        </button>
        {isOpen
          ? <SideModal className={styles.sideModal}>
            <ul className={styles.container}>
              {userData?.user?.role === 'ADMIN'
                ? <li className={styles.li}>
                  <button
                    className={styles.button}
                    onClick={() => { navigate(Routes.ADMIN_ROUTE); setIsOpen(false) }}
                  >
                    {'Admin'}
                  </button>
                </li>
                : <></>}
              <li className={styles.li}>
                <button
                  className={styles.listButton}
                  onClick={() => handleSignOut()}
                >
                  {'Sign out'}
                </button>
              </li>
            </ul>
          </SideModal>
          : <></>
        }

      </div>
    </>
  )
}

export default UserControl
