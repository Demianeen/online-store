import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import { HeaderProps } from './Header.props'
import { ReactComponent as BrandIcon } from './Brand.svg'
import { ReactComponent as MenuIcon } from './Menu.svg'
import styles from './Header.module.css'
import cn from 'classnames'
import { useCheckQuery } from '../../http/userApi/userApi'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import { useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { selectUserCartId } from '../../http/userApi/userApiSelectors'
import HeaderGenderSelect from '../../components/HeaderGenderSelect/HeaderGenderSelect'
import HeaderModals from '../../components/HeaderModals/HeaderModals'

const Header = ({ className, ...props }: HeaderProps) => {
  useCheckQuery(undefined, {
    selectFromResult: () => ({})
  })

  const cartId = useAppSelector(selectUserCartId)
  useGetCartItemsQuery(cartId ?? skipToken, {
    selectFromResult: () => ({})
  })

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  return (
    <div className={styles.headerContainer}>
      <header
        className={cn(styles.header, className)}
        // onClick={() => setIsUserOpen(false)}
        id={'pageHeader'}
        {...props}
      >
        <HeaderGenderSelect />
        <button
          onClick={() => setIsBurgerOpen(true)}
          className={styles.openMenu}>
          <MenuIcon />
        </button>
        <BurgerMenu isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen} />

        <Link
          to={Routes.SHOP_ROUTE}
          className={styles.shopIconContainer}
          id={'brandIcon'}
        >
          <BrandIcon/>
        </Link>
        <HeaderModals />
      </header >
    </div>
  )
}

export default Header
