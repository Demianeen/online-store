import React, { useEffect, useState } from 'react'
import styles from './BurgerMenu.module.css'
import cn from 'classnames'
import { IBurgerMenu } from './BurgerMenu.types'
import { useLocation, useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import { useAppDispatch } from '../../hooks/redux'
import { useSignOut } from '../../hooks/useSignOut'
import { useCheckQuery } from '../../http/userApi/userApi'
import { ReactComponent as CloseIcon } from './Close.svg'
import { ReactComponent as CartIcon } from './Cart.svg'
import { ReactComponent as ShopifyIcon } from './Shopify.svg'
import { ReactComponent as SignOutIcon } from './SignOut.svg'
import { ReactComponent as CaretDownIcon } from './CaretDown.svg'
import { ReactComponent as LoginIcon } from './Login.svg'
import { selectGender } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { Gender } from '../../http/categoryApi/categoryApi.types'
import useLockScroll from '../../hooks/useLockScroll'

const BurgerMenu = ({ isOpen, setIsOpen, className, ...props }: IBurgerMenu) => {
  const dispatch = useAppDispatch()
  const [isShopSubmenuOpen, setIsShopSubmenuOpen] = useState(false)

  const [disableScroll, allowScroll] = useLockScroll()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isShop = pathname === Routes.SHOP_ROUTE

  const { isSuccess: isUserLogged } = useCheckQuery(undefined)

  const signOut = useSignOut()

  const handleGenderSelect = (value: Gender) => {
    dispatch(selectGender(value))
    setIsOpen(false)
  }

  const handleNavigation = (route: Routes) => {
    navigate(route)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      disableScroll()
    } else {
      allowScroll()
    }
  }, [isOpen])

  return (
    <div
      className={cn(styles.burgerMenu, className, {
        [styles.visible]: isOpen
      })}
      {...props}
    >
      <div className={styles.menuHeader}>
        <button
          onClick={() => setIsOpen(false)}
          className={styles.closeMenu}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={styles.menuContent}>
        <ul className={styles.category}>
          <li>
            {isShop
              ? <>
                <button
                  onClick={() => setIsShopSubmenuOpen(isOpen => !isOpen)}
                  className={styles.categoryButton}
                >
                  <CaretDownIcon className={styles.categoryIcon} />{'Gender'}
                </button>
                <ul className={cn(styles.subCategory, {
                  [styles.visible]: isShopSubmenuOpen
                })}>
                  <li className={styles.subCategoryItem}>
                    <button
                      onClick={() => handleGenderSelect('WOMEN')}
                      className={styles.categoryButton}
                    >
                      {'Women'}
                    </button>
                  </li>
                  <li className={styles.subCategoryItem}>
                    <button
                      onClick={() => handleGenderSelect('MEN')}
                      className={styles.categoryButton}
                    >
                      {'Men'}
                    </button>
                  </li>
                  <li className={styles.subCategoryItem}>
                    <button
                      onClick={() => handleGenderSelect('KIDS')}
                      className={styles.categoryButton}
                    >
                      {'Kids'}
                    </button>
                  </li>
                </ul>
              </>
              : <button
                onClick={() => handleNavigation(Routes.SHOP_ROUTE)}
                className={styles.categoryButton}
              >
                <ShopifyIcon className={styles.categoryIcon} />{'Shop'}
              </button>
            }
          </li>
          {isUserLogged
            ? <>
              <li>
                <button
                  onClick={() => handleNavigation(Routes.CART_ROUTE)}
                  className={styles.categoryButton}
                >
                  <CartIcon className={styles.categoryIcon} />{'Cart'}
                </button>
              </li>
              <li>
                <button
                  onClick={async () => { await signOut(); setIsOpen(false) }}
                  className={cn(styles.categoryButton, styles.signOut)}
                >
                  <SignOutIcon className={styles.categoryIconNotFilled} />{'Sign out'}
                </button>
              </li>
            </>
            : <li>
              <button
                onClick={() => handleNavigation(Routes.LOGIN_ROUTE)}
                className={styles.categoryButton}
              >
                <LoginIcon className={styles.categoryIconNotFilled} />{'Login'}
              </button>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default BurgerMenu
