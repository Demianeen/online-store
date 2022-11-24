import React from 'react'
import { IUserComponent } from './CartComponent.types'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemsIds, selectCartOverallQuantity, selectCartSubTotal, selectCartTax, selectCartTaxPercentage } from '../../http/cartApi/cartApiSelectors'
import { useConvert } from '../../hooks/currency'
import CartComponentItem from '../../components/CartComponentItem/CartComponentItem'
import { useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  useGetCategoriesQuery(undefined)
  useGetBrandsQuery(undefined)

  const { data: userData } = useCheckQuery(undefined)

  const { tax, subTotal, overallQuantity, cartItemsIds } = useGetCartItemsQuery(userData?.user.CartId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      tax: (data !== undefined) ? selectCartTax(data) : 0,
      subTotal: (data !== undefined) ? selectCartSubTotal(data) : 0,
      overallQuantity: (data !== undefined) ? selectCartOverallQuantity(data) : 0,
      cartItemsIds: (data !== undefined) ? selectCartItemsIds(data) : []
    })
  })
  const taxPercentage = useAppSelector(selectCartTaxPercentage)

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
