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

const Header = ({ className, ...props }: HeaderProps) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { selectGender } = productSlice.actions
  const { user } = useAppSelector(store => store.user)
  const { selectedGender } = useAppSelector(store => store.product)

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

  return (
    <>
      <div
        onClick={() => setIsUserOpen(isUserOpen => !isUserOpen)}
        className={cn(styles.overlay, {
          [styles.showedOverlay]: isUserOpen
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

            <button
              onClick={() => navigate(Routes.CART_ROUTE)}
              className={styles.cartIconButton}
            >
              <CartIcon />
            </button>
            <div className={styles.userIconContainer} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsUserOpen(isUserOpen => !isUserOpen)}
                className={styles.userIconButton}
              >
                <UserIcon />
              </button>
              <UserControl setIsOverlayVisible={setIsUserOpen} isVisible={isUserOpen} />
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
