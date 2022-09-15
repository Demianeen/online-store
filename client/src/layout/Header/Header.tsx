import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'
import { ReactComponent as CartIcon } from './Cart.svg'
import { ReactComponent as UserIcon } from './User.svg'
import { ReactComponent as ShopIcon } from './Shop.svg'
import styles from './Header.module.css'
import cn from 'classnames'
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect'
import productSlice from '../../store/reducers/ProductSlice/slice'

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const { selectGender } = productSlice.actions
  const { user } = useAppSelector(store => store.user)
  const { selectedGender } = useAppSelector(store => store.product)

  const navigate = useNavigate()

  // const logOut = () => {
  //   dispatch(setUser(undefined))
  //   dispatch(setIsAuth(false))
  // }

  useEffect(() => {
    handleGenderSelect('WOMEN')
  }, [])

  const handleGenderSelect = (value: string) => {
    dispatch(selectGender(value))
  }

  return (
    <header
      className={cn(styles.header, className)}
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
          {/* {user.role === 'ADMIN'
            ? <button onClick={() => navigate(Routes.ADMIN_ROUTE)}>{'Admin Panel'}</button>
            : <></>}
          <button onClick={() => logOut()}>{'Logout'}</button> */}

          <CurrencySelect className={styles.currencySelect} />

          <button
            onClick={() => navigate(Routes.CART_ROUTE)}
            className={styles.cartIconButton}
          >
            <CartIcon />
          </button>
          <button
            onClick={() => navigate(Routes.CART_ROUTE)}
            className={styles.userIconButton}
          >
            <UserIcon />
          </button>
        </div>

        : <div className={styles.container}>
          <button onClick={() => navigate(Routes.LOGIN_ROUTE)}><CartIcon /></button>
        </div>
      }
    </header >
  )
}

export default Header
