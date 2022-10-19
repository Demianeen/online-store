import React from 'react'
import { IUserComponent } from './CartComponent.types'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemIds, selectCartOverallQuantity, selectCartSubTotal, selectCartTax, selectCartTaxPercentage } from '../../http/cartApi/cartApiSelectors'
import { useConvert } from '../../hooks/currency'
import CartComponentItem from '../../components/CartComponentItem/CartComponentItem'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  const cartItemsIds = useAppSelector(selectCartItemIds)

  const subTotal = useAppSelector(selectCartSubTotal)
  const overallQuantity = useAppSelector(selectCartOverallQuantity)
  const taxPercentage = useAppSelector(selectCartTaxPercentage)
  const tax = useAppSelector(selectCartTax)

  const [convert, { symbol }] = useConvert()
  const convertedTax = convert(tax)
  const convertedSubtotal = convert(subTotal)

  if (cartItemsIds.length === 0) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {cartItemsIds.map((id) => <CartComponentItem key={id} cartItemId={id}/>)}
      <div className={styles.summary}>
        <span className={styles.totalCategoryName}>{'Tax '}{taxPercentage}{'%: '}</span>
        <span className={styles.totalValue}>{symbol}{convertedTax}{'.00'}</span>

        <span className={styles.totalCategoryName}>{'Quantity: '}</span>
        <span className={styles.totalValue}>{overallQuantity}</span>

        <span className={styles.total}>{'Total: '}</span>
        <span className={styles.totalValue}>{symbol}{convertedSubtotal + convertedTax}{'.00'}</span>
      </div>
      <Order className={styles.order}>{'Order'}</Order>
    </>
  )
}

export default CartComponent
