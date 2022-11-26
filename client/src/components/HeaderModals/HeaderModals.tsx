import React, { useEffect, useState } from 'react'
import styles from './HeaderModals.module.css'
import cn from 'classnames'
import { IFullSizeImage } from './HeaderModals.types'
import { useAppSelector } from '../../hooks/redux'
import { selectIsUserLogged } from '../../http/userApi/userApiSelectors'
import { useNavigate } from 'react-router-dom'
import CartControl from '../modals/CartControl/CartControl'
import CurrencySelect from '../modals/CurrencySelect/CurrencySelect'
import UserControl from '../modals/UserControl/UserControl'
import { Routes } from '../../utils/consts'

const HeaderModals = ({ className, ...props }: IFullSizeImage) => {
  const isUserLogged = useAppSelector(selectIsUserLogged)

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (isUserOpen) {
      setIsCartOpen(false)
      setIsCurrencyOpen(false)
    }
  }, [isUserOpen])

  useEffect(() => {
    if (isCartOpen) {
      setIsUserOpen(false)
      setIsCurrencyOpen(false)
    }
  }, [isCartOpen])

  useEffect(() => {
    if (isCurrencyOpen) {
      setIsUserOpen(false)
      setIsCartOpen(false)
    }
  }, [isCurrencyOpen])

  if (isUserLogged) {
    return (
      <div className={cn(styles.container, className)}>
        <CurrencySelect
          isOpen={isCurrencyOpen}
          setIsOpen={setIsCurrencyOpen}
          className={styles.currencySelect}
        />

        <CartControl
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          className={styles.cart}
        />

        <UserControl
          isOpen={isUserOpen}
          setIsOpen={setIsUserOpen}
          className={styles.user}
        />
      </div>
    )
  }

  return (
    <div className={cn(styles.container, className)}>
      <CurrencySelect
        isOpen={isCurrencyOpen}
        setIsOpen={setIsCurrencyOpen}
        className={cn(styles.currencySelect, {
          [styles.currencySelectMargin]: !isUserLogged
        })}
      />
      <button
        onClick={() => navigate(Routes.LOGIN_ROUTE)}
        className={styles.loginButton}
      >
        {'Login'}
      </button>
    </div>
  )
}

export default HeaderModals
