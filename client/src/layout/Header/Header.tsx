import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'
import { ReactComponent as CartIcon } from './Cart.svg'
import { ReactComponent as UserIcon } from './User.svg'
import { ReactComponent as BrandIcon } from './Brand.svg'
import { ReactComponent as MenuIcon } from './Menu.svg'
import styles from './Header.module.css'
import cn from 'classnames'
import CurrencySelect from '../../components/modals/CurrencySelect/CurrencySelect'
import UserControl from '../../components/modals/UserControl/UserControl'
import CartControl from '../../components/modals/CartControl/CartControl'
import { selectCartOverallQuantity } from '../../http/cartApi/cartApiSelectors'
import { useCheckQuery } from '../../http/userApi/userApi'
import Overlay from '../../components/Overlay/Overlay'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import { useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { selectGender } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { Gender } from '../../http/categoryApi/categoryApi.types'
import { selectProductGender } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'

const Header = ({ className, ...props }: HeaderProps) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { data: userData, isSuccess: isUserLogged } = useCheckQuery(undefined)
  const selectedGender = useAppSelector(selectProductGender)
  // TODO: Add useContext if cartIsOpen
  const { overallQuantity } = useGetCartItemsQuery(userData?.user?.id ?? skipToken, {
    selectFromResult: ({ data }) => ({
      overallQuantity: (data !== undefined) ? selectCartOverallQuantity(data) : 0
    })
  })

  const navigate = useNavigate()

  const handleGenderSelect = (value: Gender) => {
    dispatch(selectGender(value))
  }

  useEffect(() => {
    handleGenderSelect('WOMEN')
  }, [])

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

  const closeAll = () => {
    setIsUserOpen(false)
    setIsCartOpen(false)
  }

  return (
    <>
      <Overlay
        onClick={() => closeAll()}
        isVisible={(isCartOpen && overallQuantity > 0) || isUserOpen}
        className={styles.overlay}
      />
      <div className={styles.headerContainer}>
        <header
          className={cn(styles.header, className)}
          onClick={() => setIsUserOpen(false)}
          {...props}
        >
          <div className={styles.genderContainer}>
            <button
              className={cn(styles.genderButton, {
                [styles.selectedGenderButton]: selectedGender === 'WOMEN'
              })}
              onClick={() => handleGenderSelect('WOMEN')}
            >
              {'WOMEN'}
            </button>
            <button
              className={cn(styles.genderButton, {
                [styles.selectedGenderButton]: selectedGender === 'MEN'
              })}
              onClick={() => handleGenderSelect('MEN')}
            >
              {'MEN'}
            </button>
            <button
              className={cn(styles.genderButton, {
                [styles.selectedGenderButton]: selectedGender === 'KIDS'
              })}
              onClick={() => handleGenderSelect('KIDS')}
            >
              {'KIDS'}
            </button>
          </div>
          <button
            onClick={() => setIsBurgerOpen(true)}
            className={styles.openMenu}>
            <MenuIcon />
          </button>
          <BurgerMenu isMenuOpen={isBurgerOpen} setIsMenuOpen={setIsBurgerOpen} />

          <Link
            to={Routes.SHOP_ROUTE}
            className={styles.shopIconContainer}
          >
            <BrandIcon />
          </Link>
          {isUserLogged
            ? <div className={styles.container}>
              <CurrencySelect
                isOpen={isCurrencyOpen}
                setIsOpen={setIsCurrencyOpen}
                className={styles.currencySelect}
              />

              <div className={styles.modalContainer}>
                <button
                  onClick={() => setIsCartOpen(isCartOpen => !isCartOpen)}
                  className={styles.cartIconButton}
                >
                  <CartIcon />
                  {isCartOpen && overallQuantity > 0
                    ? <span className={styles.notificationBadge}>{overallQuantity}</span>
                    : <></>
                  }
                </button>
                <CartControl isVisible={isCartOpen} setIsVisible={setIsCartOpen} />
              </div>
              <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsUserOpen(isUserOpen => !isUserOpen)}
                  className={styles.userIconButton}
                >
                  <UserIcon />
                </button>
                <UserControl isVisible={isUserOpen} setIsVisible={setIsUserOpen} />
              </div>
            </div>

            : <div className={styles.container}>
              <CurrencySelect
                isOpen={isCurrencyOpen}
                setIsOpen={setIsCurrencyOpen}
                className={styles.currencySelect}
              />
              <button
                onClick={() => navigate(Routes.LOGIN_ROUTE)}
                className={styles.cartIconButton}
              >
                {'Login'}
              </button>
            </div>
          }
        </header >
      </div>
    </>
  )
}

export default Header
