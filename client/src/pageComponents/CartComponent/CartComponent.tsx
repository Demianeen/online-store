import React from 'react'
import { IUserComponent } from './CartComponent.types'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemsIds, selectCartTaxPercentage } from '../../http/cartApi/cartApiSelectors'
import CartComponentItem from '../../components/CartComponentItem/CartComponentItem'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import OverallCartQuantity from '../../components/OverallCartQuantity/OverallCartQuantity'
import CartTotal from '../../components/CartTotal/CartTotal'
import CartTax from '../../components/CartTax/CartTax'
import CenteredText from '../../components/Centered/Centered'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  useGetCategoriesQuery(undefined, {
    selectFromResult: () => ({})
  })
  useGetBrandsQuery(undefined, {
    selectFromResult: () => ({})
  })

  const cartItemsIds = useAppSelector(selectCartItemsIds)
  const taxPercentage = useAppSelector(selectCartTaxPercentage)

  if (cartItemsIds.length === 0) {
    return <CenteredText>{'Add items to the cart first'}</CenteredText>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {cartItemsIds.map((id) => <CartComponentItem key={id} cartItemId={id}/>)}
      <div className={styles.summary}>
        <span className={styles.totalCategoryName}>{'Tax '}{taxPercentage}{'%: '}</span>
        <span className={styles.totalValue}><CartTax /></span>

        <span className={styles.totalCategoryName}>{'Quantity: '}</span>
        <span className={styles.totalValue}><OverallCartQuantity /></span>

        <span className={styles.total}>{'Total: '}</span>
        <span className={styles.totalValue}><CartTotal /></span>
      </div>
      <Order className={styles.order}>{'Order'}</Order>
    </>
  )
}

export default CartComponent
