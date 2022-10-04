import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'
import { ReactComponent as CartIcon } from './Cart.svg'
import { ReactComponent as UserIcon } from './User.svg'
import { ReactComponent as ShopIcon } from './Shop.svg'
import styles from './Header.module.css'
import cn from 'classnames'
import CurrencySelect from '../../components/modals/CurrencySelect/CurrencySelect'
import productSlice from '../../store/reducers/ProductSlice/slice'
import UserControl from '../../components/modals/UserControl/UserControl'
import CartControl from '../../components/modals/CartControl/CartControl'
import { useCartTotal } from '../../hooks/cart'

const Header = ({ className, ...props }: HeaderProps) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { selectGender } = productSlice.actions
  const { user } = useAppSelector(store => store.user)
  const { selectedGender } = useAppSelector(store => store.product)
  const { overallQuantity } = useCartTotal()

  const navigate = useNavigate()

  const handleGenderSelect = (value: string) => {
    dispatch(selectGender(value))
  }

  useEffect(() => {
    handleGenderSelect('WOMEN')
  }, [])

  useEffect(() => {
    if (isUserOpen) {
      setIsCurrencyOpen(false)
    }
  }, [isUserOpen])

  // useEffect(() => {
  //   const fetch = async () => {
  //     if (user === undefined) return
  //     dispatch(fetchCart(user.id))
  //   }
  //   if (isCartOpen && (user !== undefined)) {
  //     fetch()
  //   }
  // }, [isCartOpen])

  const closeAll = () => {
    setIsUserOpen(false)
    setIsCartOpen(false)
  }

  return (
    <>
      <div
        onClick={() => closeAll()}
        className={cn(styles.overlay, {
          [styles.showedOverlay]: isUserOpen || isCartOpen
        })}
      >
      </div>
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
        <Link
          to={Routes.SHOP_ROUTE}
          className={styles.shopIconContainer}
        >
          <ShopIcon />
        </Link>
        {user !== undefined
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
                {isCartOpen ? <span className={styles.notificationBadge}>{overallQuantity}</span> : <></>}
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

          : <button
            onClick={() => navigate(Routes.LOGIN_ROUTE)}
            className={styles.cartIconButton}
          >
            {'Login'}
          </button>
        }
      </header >
    </>
  )
}

export default Header
