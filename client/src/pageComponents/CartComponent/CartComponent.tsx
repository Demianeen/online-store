import React from 'react'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemsIds, selectIsCartItemsLoading, selectCartTaxPercentage } from '../../http/cartApi/cartApiSelectors'
import CartComponentItem from '../../components/CartComponentItem/CartComponentItem'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import OverallCartQuantity from '../../components/OverallCartQuantity/OverallCartQuantity'
import CartTotal from '../../components/CartTotal/CartTotal'
import CartTax from '../../components/CartTax/CartTax'
import Centered from '../../components/Centered/Centered'

const CartComponent = () => {
  useGetCategoriesQuery(undefined, {
    selectFromResult: () => ({})
  })
  useGetBrandsQuery(undefined, {
    selectFromResult: () => ({})
  })

  const cartItemsIds = useAppSelector(selectCartItemsIds)
  const taxPercentage = useAppSelector(selectCartTaxPercentage)
  const isLoading = useAppSelector(selectIsCartItemsLoading)

  if (isLoading) {
    return <Centered>{'Loading...'}</Centered>
  }

  if (cartItemsIds.length === 0) {
    return <Centered>{'Add items to the cart first'}</Centered>
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
