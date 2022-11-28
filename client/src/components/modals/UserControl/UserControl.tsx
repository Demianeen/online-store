import React, { useEffect } from 'react'
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
import useLockScroll from '../../../hooks/useLockScroll'

const UserControl = ({ setIsOpen, isOpen, className, ...props }: IUserModal) => {
  const { data: userData } = useCheckQuery(undefined)
  const navigate = useNavigate()
  const signOut = useSignOut()

  const [disableScroll, allowScroll] = useLockScroll()

  const handleSignOut = () => {
    setIsOpen(false)
    signOut()
  }

  useEffect(() => {
    if (isOpen) {
      disableScroll()
    } else {
      allowScroll()
    }
  }, [isOpen])

  return (
    <>
      <Overlay
        isVisible={isOpen}
        className={styles.overlayView}
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
          ? <>
            <Overlay
              onClick={() => setIsOpen(false)}
            />
            <SideModal className={styles.sideModal}>
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
          </>
          : <></>
        }

      </div>
    </>
  )
}

export default UserControl
